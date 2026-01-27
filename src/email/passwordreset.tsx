import { Body, Head, Html, Link, Preview, Text } from "@react-email/components";

interface PasswordResetProps {
  verificationLink: string;
  firstName: string;
}

export const PasswordResetEmail = ({
  verificationLink,
  firstName,
}: PasswordResetProps) => (
  <Html>
    <Head />
    <Preview>Reset your Unilink password</Preview>
    <Body style={main}>
      <Text style={text}>Hi {firstName},</Text>
      <Text style={text}>
        We received a request to reset the password for your Unilink account. To
        proceed, please click the link below:
      </Text>

      <Link style={link} href={verificationLink}>
        👉 Reset Your Password
      </Link>

      <Text style={text}>
        This link will expire in 30 minutes for your security. If you
        didn&apos;t request a password reset, you are safe you can safely ignore
        this email.
      </Text>

      <Text style={text}>
        If you need any help, feel free to reach out to us.
      </Text>

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

export default PasswordResetEmail;

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
