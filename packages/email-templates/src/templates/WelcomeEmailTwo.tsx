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
};

export const WelcomeEmailTwo = ({ email, name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome aboard. Your workspace is ready.</Preview>
      <Tailwind>
        <Body className="m-0 bg-slate-100 px-4 py-10 font-sans">
          <Container className="mx-auto max-w-xl rounded-2xl bg-white p-10">
            <Section className="mb-8">
              <Text className="m-0 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Getting Started
              </Text>
            </Section>

            <Heading className="m-0 text-2xl font-semibold text-slate-900">
              Welcome, {name}
            </Heading>

            <Text className="mb-0 mt-5 text-base leading-7 text-slate-700">
              We are glad you joined us with <strong>{email}</strong>. Your
              workspace is ready, and you can jump in right away.
            </Text>

            <Section className="my-8">
              <Button
                href="https://selleo.com"
                className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white no-underline"
              >
                Open platform
              </Button>
            </Section>

            <Text className="m-0 text-sm leading-6 text-slate-600">
              Need help? Visit our website for onboarding materials and support.
            </Text>
            <Link href="https://selleo.com" className="text-sm text-blue-600">
              https://selleo.com
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmailTwo.PreviewProps = {
  email: "john.doe@selleo.com",
  name: "John Doe",
};

export default WelcomeEmailTwo;
