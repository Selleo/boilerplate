export const USER_ALERT_QUEUE = {
  name: "user-alert-queue",
  actions: {
    SEND_ALERT_EMAIL: "SEND_ALERT_EMAIL" as const,
  },
};

export type UserAlertQueueJobPayloads = {
  SEND_ALERT_EMAIL: {
    email: string;
  };
};
