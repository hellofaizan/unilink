import { Body, Head, Html, Link, Preview, Text } from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  firstName: string;
}

export const WelcomeEmail = ({ firstName }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Unilink, {firstName} – Let&apos;s Get Started!</Preview>
    <Body style={main}>
      <Text style={text}>Hi {firstName},</Text>
      <Text style={text}>
        Welcome to Unilink – we&apos;re excited to have you on board!
      </Text>
      <Text style={text}>Unilink is a smart link in bio tool</Text>
      <Text style={text}>
        If you ever have a question or need a hand getting started, just reach
        out to us at{" "}
        <Link href="mailto:faizancurious@gmail.com">
          faizancurious@gmail.com
        </Link>{" "}
        – we&apos;re happy to help.
      </Text>
      <Text style={text}>Looking forward to seeing what you create!</Text>
      <Text style={text}>
        Warm regards,
        <br />
        Faizaan
        <br />
        Founder, Unilink
      </Text>
      <Text style={text}>
        P.S. If you haven&apos;t joined our Discord Community Server yet,{" "}
        <Link href="https://dub.sh/unilinkdc/">JOIN DISCORD</Link>
      </Text>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const text = {
  color: "#000",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
};

const link = {
  color: "#0066cc",
  textDecoration: "underline",
  fontSize: "16px",
  marginBottom: "20px",
  display: "inline-block",
};
