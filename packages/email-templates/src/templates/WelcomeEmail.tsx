import React from "react";
import { Button, Html, Tailwind } from "@react-email/components";

export type WelcomeEmailProps = {
  email: string;
  name: string;
  redirectUrl: string;
};

export const WelcomeEmail = ({
  email,
  name,
  redirectUrl,
}: WelcomeEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <p>
          Welcome to our app {name} ({email})!
        </p>
        <p>If you did not create an account, please ignore this email.</p>
        <Button
          href={redirectUrl}
          className="bg-orange-500 text-white px-5 py-3"
        >
          Verify your email
        </Button>
      </Html>
    </Tailwind>
  );
};

WelcomeEmail.PreviewProps = {
  email: "john.doe@selleo.com",
  name: "John Doe",
};

export default WelcomeEmail;
