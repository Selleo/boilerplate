import React from "react";
import { Button, Html, Tailwind } from "@react-email/components";

export type WelcomeEmailProps = {
  email: string;
  name: string;
};

export const WelcomeEmailTwo = ({ email, name }: WelcomeEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Button
          href="https://selleo.com"
          className="bg-blue-500 text-white px-5 py-3"
        >
          Howdy! {name}({email})
        </Button>
      </Html>
    </Tailwind>
  );
};

WelcomeEmailTwo.PreviewProps = {
  email: "john.doe@selleo.com",
  name: "John Doe",
};

export default WelcomeEmailTwo;
