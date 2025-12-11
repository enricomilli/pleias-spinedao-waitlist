import {
  Body,
  Container,
  Head,
  Hr,
  Row,
  Column,
  Html,
  Link,
  Preview,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  userFirstname: string;
}

export default function BackroomWaitlistEmail({ userFirstname }: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Thanks for joining SpineDAO’s Backroom waitlist, {userFirstname}!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://spinedao.pleias.dev/spinedao-hori.png`}
            width="220"
            height="auto"
            alt="SpineDAO Logo"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingRight: 30,
              marginTop: 20,
              marginBottom: 30,
            }}
          />

          <Text style={greeting}>Hi {userFirstname},</Text>

          <Text style={paragraph}>
            Thanks for joining the SpineDAO R&D Backroom waitlist. We’re a
            global network of medical practitioners, researchers, patients, and
            innovators accelerating spine health from diagnosis to recovery with
            decentralized and AI-powered solutions.
          </Text>

          <Text style={paragraph}>
            As a Backroom waitlist member, you’ll get early updates on our
            trusted and advanced AI suite for spine wellness and care — from
            wellness awareness and patient triage to predictive tools for
            imaging and surgery. You’ll also get previews of products in
            development like:
          </Text>

          <Text style={paragraph}>
            • Vertebra-1T (AI analysis of X-rays, MRIs, and CT scans via
            Radiomics)
            <br />
            • Vertebra-4W (Lamina — an AI-powered spine-care wellness companion)
            <br />• AI patient triage (data-informed case prioritization and
            treatment pathways)
          </Text>

          <Text style={paragraph}>
            We believe in open data sharing and open-source publishing to
            accelerate research while maintaining patient privacy and security.
            If you’re curious, you can explore more about our vision, projects,
            and the SPINE token below.
          </Text>

          <Row
            style={{
              maxWidth: 300,
            }}>
            <Column style={{ padding: "8px" }}>
              <Link href="https://spinedao.com" style={button}>
                Visit SpineDAO
              </Link>
            </Column>
            <Column style={{ padding: "8px" }}>
              <Link
                href="https://spinedao.com/projects"
                style={secondaryButton}>
                See all Projects
              </Link>
            </Column>
          </Row>
          <Row style={{ maxWidth: 300 }}>
            <Column style={{ padding: "8px" }}>
              <Link href="https://spinedao.com/spine-token" style={button}>
                Spine Tokenomics
              </Link>
            </Column>
            <Column style={{ padding: "8px" }}>
              <Link
                href="https://spinedao.com/spine-archive"
                style={secondaryButton}>
                Spine Archive
              </Link>
            </Column>
          </Row>
          <Text style={paragraph}>
            Have questions or feedback? Reply directly to{" "}
            <Link href="mailto:people@spinedao.com" style={linkStyle}>
              people@spinedao.com
            </Link>{" "}
            — we’re here to listen.
          </Text>

          <Text style={signOff}>
            Best regards, <br /> SpineDAO Team
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            You received this email because you signed up for the SpineDAO R&D
            Backroom waitlist. If this wasn’t you, please ignore this message or
            contact{" "}
            <Link href="mailto:people@spinedao.com" style={linkStyle}>
              people@spinedao.com
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  color: "#0a0a0a",
  margin: "0",
  marginTop: 20,
  marginBottom: 20,
  padding: "0",
};

const container = {
  margin: "0 auto",
  padding: "24px 24px",
  maxWidth: "560px",
  border: "1px solid #eaeaea",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
};

const greeting = {
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0px 0 8px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "12px 0",
  color: "#333333",
};

const linkStyle = {
  color: "#1363DF",
  textDecoration: "underline",
};

const button = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "8px",
  backgroundColor: "#A70D53",
  color: "#ffffff",
  fontSize: "14px",
  textDecoration: "none",
};

const secondaryButton = {
  ...button,
  backgroundColor: "#2F5E6E",
};

const hr = {
  borderColor: "#eaeaea",
  margin: "24px 0",
};

const signOff = {
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "16px 0",
  color: "#333333",
};

const footer = {
  fontSize: "12px",
  lineHeight: "1.6",
  color: "#666666",
  margin: "0",
};
