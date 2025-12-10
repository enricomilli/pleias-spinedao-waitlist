import { render } from "@react-email/render";

import WelcomeTemplate from "../../../emails";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { RateLimiter } from "../../../lib/rate-limiter";

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new RateLimiter(2, 60 * 1000); // 2 requests per minute

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";

  const result = await ratelimit.limit(ip);

  if (!result.success) {
    return Response.json(
      {
        error: "Too many requests!!",
      },
      {
        status: 429,
      },
    );
  }

  const { email, firstname } = await request.json();

  await resend.contacts.create({
    audienceId: process.env.RESEND_AUDIENCE_ID!,
    email: email,
    firstName: firstname,
  });

  const { data, error } = await resend.emails.send({
    from: "SpineDAO <hello@waitlist.spinedao.com>",
    to: [email],
    subject: "Thank you for joining the R&D backroom",
    reply_to: "people@spinedao.com",
    html: await render(WelcomeTemplate({ userFirstname: firstname })),
  });

  if (error) {
    return NextResponse.json(error);
  }

  if (!data) {
    return NextResponse.json({ message: "Failed to send email" });
  }

  return NextResponse.json({ message: "Email sent successfully" });
}
