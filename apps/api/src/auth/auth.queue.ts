export const QUEUE_EMAIL = {
  name: "email-queue",
  actions: {
    SEND_WELCOME_EMAIL: "send-welcome-email" as const,
    SEND_RESET_PASSWORD_EMAIL: "send-reset-password-email" as const,
  },
};

export type QueueEmailJobPayloads = {
  SEND_WELCOME_EMAIL: {
    url: string;
    name: string;
    email: string;
  };
  SEND_RESET_PASSWORD_EMAIL: {
    url: string;
    name: string;
    email: string;
  };
};

export type QueueEmailJobData =
  | QueueEmailJobPayloads["SEND_WELCOME_EMAIL"]
  | QueueEmailJobPayloads["SEND_RESET_PASSWORD_EMAIL"];
