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

  const { email, firstname, company } = await request.json();

  const { data: contact, error: contactErr } = await resend.contacts.create({
    audienceId: process.env.RESEND_AUDIENCE_ID!,
    email: email,
    firstName: firstname,
    lastName: company,
  });

  if (contactErr || !contact) {
    return NextResponse.json(contactErr || { message: "Failed to send email" });
  }

  let { data, error } = await resend.emails.send({
    from: `${process.env.RESEND_EMAIL_NAME} <${process.env.RESEND_EMAIL}>`,
    to: [email],
    subject: "Thank you for joining the R&D backroom",
    reply_to: "people@spinedao.com",
    html: await render(WelcomeTemplate({ userFirstname: firstname })),
  });
  if (error || !data) {
    return NextResponse.json(error || { message: "Failed to send email" });
  }

  return NextResponse.json({ message: "Email sent successfully" });
}
