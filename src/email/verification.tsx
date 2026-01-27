import { Body, Head, Html, Link, Preview, Text } from "@react-email/components";

interface VerificationLinkProps {
  verificationLink: string;
  firstName: string;
}

export const VerificationEmail = ({
  verificationLink,
  firstName,
}: VerificationLinkProps) => (
  <Html>
    <Head />
    <Preview>Verify your Unilink email address</Preview>
    <Body style={main}>
      <Text style={text}>Hi {firstName},</Text>
      <Text style={text}>
        Thank you for signing up with Unilink! To complete your registration,
        please verify your email address by clicking the link below:
      </Text>

      <Link style={link} href={verificationLink}>
        👉 Verify Email Address
      </Link>

      <Text style={text}>
        This link will expire in 30 minutes. If you didn&apos;t create an
        account with us, please ignore this email.
      </Text>

      <Text style={text}>Welcome to the Unilink community!</Text>

      <Text style={text}>
        Best regards,
        <br />
        Faizaan
        <br />
        Founder, Unilink
      </Text>
    </Body>
  </Html>
);

export default VerificationEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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
