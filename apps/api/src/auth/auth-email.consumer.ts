import { Processor, WorkerHost } from "@nestjs/bullmq";
import { AuthService } from "./auth.service";
import { Job } from "bullmq";
import { EMAIL_QUEUE, EmailQueueJobPayloads } from "./auth.queue";

export type QueueEmailJob =
  | Job<
      EmailQueueJobPayloads["SEND_WELCOME_EMAIL"],
      unknown,
      typeof EMAIL_QUEUE.actions.SEND_WELCOME_EMAIL
    >
  | Job<
      EmailQueueJobPayloads["SEND_RESET_PASSWORD_EMAIL"],
      unknown,
      typeof EMAIL_QUEUE.actions.SEND_RESET_PASSWORD_EMAIL
    >;

@Processor(EMAIL_QUEUE.name)
export class AuthEmailConsumer extends WorkerHost {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async process(job: QueueEmailJob): Promise<unknown> {
    switch (job.name) {
      case EMAIL_QUEUE.actions.SEND_WELCOME_EMAIL:
        return this.sendWelcomeEmail(job.data);

      case EMAIL_QUEUE.actions.SEND_RESET_PASSWORD_EMAIL:
        return this.sendResetPasswordEmail(job.data);

      default:
        // @ts-expect-error for exhaustive check
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  async sendResetPasswordEmail(
    payload: EmailQueueJobPayloads["SEND_RESET_PASSWORD_EMAIL"],
  ) {
    const { url, name, email } = payload;
    return this.authService.sendResetPassordEmail(email, { url, name });
  }

  async sendWelcomeEmail(payload: EmailQueueJobPayloads["SEND_WELCOME_EMAIL"]) {
    const { url, name, email } = payload;
    return this.authService.sendWelcomeVerifyEmail(email, {
      url,
      name,
      email,
    });
  }
}
