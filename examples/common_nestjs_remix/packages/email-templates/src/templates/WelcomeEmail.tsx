import React from "react";
import { Button, Html, Tailwind } from "@react-email/components";

export type WelcomeEmailProps = {
  email: string;
  name: string;
};

export const WelcomeEmail = ({ email, name }: WelcomeEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Button
          href="https://selleo.com"
          className="bg-orange-500 text-white px-5 py-3"
        >
          Hello there! {name}({email})
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
