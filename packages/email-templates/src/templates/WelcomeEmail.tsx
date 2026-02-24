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
    <Html>
      <Head />
      <Preview>Welcome to Boilerplate. Verify your email to get started.</Preview>
      <Tailwind>
        <Body className="m-0 bg-slate-100 px-4 py-10 font-sans">
          <Container className="mx-auto max-w-xl rounded-2xl bg-white p-10">
            <Section className="mb-8">
              <Text className="m-0 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                Welcome
              </Text>
            </Section>

            <Heading className="m-0 text-2xl font-semibold text-slate-900">
              Hi {name}, your account is almost ready
            </Heading>

            <Text className="mb-0 mt-5 text-base leading-7 text-slate-700">
              Thanks for joining Boilerplate with <strong>{email}</strong>. Please
              confirm your email address to activate your account.
            </Text>

            <Section className="my-8">
              <Button
                href={redirectUrl}
                className="rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white no-underline"
              >
                Verify email
              </Button>
            </Section>

            <Text className="m-0 text-sm leading-6 text-slate-600">
              If the button does not work, copy and paste this link into your
              browser:
            </Text>
            <Link href={redirectUrl} className="text-sm text-orange-600">
              {redirectUrl}
            </Link>

            <Text className="mb-0 mt-8 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-500">
              If you did not create this account, you can safely ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  email: "john.doe@selleo.com",
  name: "John Doe",
  redirectUrl: "https://selleo.com/verify?token=abc123",
};

export default WelcomeEmail;
