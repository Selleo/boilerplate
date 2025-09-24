import React from "react";
import { Button, Html, Tailwind } from "@react-email/components";

export type ResetPasswordEmailProps = {
  name: string;
  url: string;
};

export const ResetPasswordEmail = ({ name, url }: ResetPasswordEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Button href={url} className="bg-blue-500 text-white px-5 py-3">
          Click here to reset your password, {name}
        </Button>
      </Html>
    </Tailwind>
  );
};

ResetPasswordEmail.PreviewProps = {
  name: "John Doe",
  url: "https://selleo.com/reset-password?token=abc123",
};

export default ResetPasswordEmail;
