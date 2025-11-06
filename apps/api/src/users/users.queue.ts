export const QUEUE_USER_ALERT = {
  name: "user-alert-queue",
  actions: {
    SEND_ALERT_EMAIL: "send-alert-email" as const,
  },
};

export type QueueUserAlertJobPayloads = {
  SEND_ALERT_EMAIL: {
    email: string;
  };
};

export type QueueUserAlertJobData =
  QueueUserAlertJobPayloads["SEND_ALERT_EMAIL"];
