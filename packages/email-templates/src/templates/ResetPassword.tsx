import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export type ResetPasswordEmailProps = {
  name: string;
  url: string;
};

export const ResetPasswordEmail = ({ name, url }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Password reset requested for your account.</Preview>
      <Tailwind>
        <Body className="m-0 bg-slate-100 px-4 py-10 font-sans">
          <Container className="mx-auto max-w-xl rounded-2xl bg-white p-10">
            <Section className="mb-8">
              <Text className="m-0 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
                Security
              </Text>
            </Section>

            <Heading className="m-0 text-2xl font-semibold text-slate-900">
              Reset your password
            </Heading>

            <Text className="mb-0 mt-5 text-base leading-7 text-slate-700">
              Hi {name}, we received a request to reset your password. Use the
              button below to set a new one.
            </Text>

            <Section className="my-8">
              <Button
                href={url}
                className="rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white no-underline"
              >
                Create new password
              </Button>
            </Section>

            <Text className="m-0 text-sm leading-6 text-slate-600">
              If the button does not work, use this link:
            </Text>
            <Link href={url} className="text-sm text-slate-900">
              {url}
            </Link>

            <Text className="mb-0 mt-8 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-500">
              If you did not request a password reset, you can safely ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  name: "John Doe",
  url: "https://selleo.com/reset-password?token=abc123",
};

export default ResetPasswordEmail;
