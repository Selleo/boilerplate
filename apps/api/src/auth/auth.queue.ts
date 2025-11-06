export const EMAIL_QUEUE = {
  name: "email-queue",
  actions: {
    SEND_WELCOME_EMAIL: "SEND_WELCOME_EMAIL" as const,
    SEND_RESET_PASSWORD_EMAIL: "SEND_RESET_PASSWORD_EMAIL" as const,
  },
};

export type EmailQueueJobPayloads = {
  SEND_WELCOME_EMAIL: {
    type: "SEND_WELCOME_EMAIL";
    url: string;
    name: string;
    email: string;
  };
  SEND_RESET_PASSWORD_EMAIL: {
    type: "SEND_RESET_PASSWORD_EMAIL";
    url: string;
    name: string;
    email: string;
  };
};

export type EmailQueueJobData =
  | EmailQueueJobPayloads["SEND_WELCOME_EMAIL"]
  | EmailQueueJobPayloads["SEND_RESET_PASSWORD_EMAIL"];
