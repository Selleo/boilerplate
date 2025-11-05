import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { AuthService } from "./auth.service";
import { Job } from "bullmq";
import {
  QUEUE_EMAIL,
  QueueEmailJobData,
  QueueEmailJobPayloads,
} from "./auth.queue";

@Processor(QUEUE_EMAIL.name)
export class AuthEmailConsumer extends WorkerHost {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async process(job: Job<QueueEmailJobData, any, string>): Promise<any> {
    switch (job.name) {
      case QUEUE_EMAIL.actions.SEND_WELCOME_EMAIL:
        return this.sendWelcomeEmail(
          job as Job<QueueEmailJobPayloads["SEND_WELCOME_EMAIL"]>,
        );
      case QUEUE_EMAIL.actions.SEND_RESET_PASSWORD_EMAIL:
        return this.sendResetPasswordEmail(
          job as Job<QueueEmailJobPayloads["SEND_RESET_PASSWORD_EMAIL"]>,
        );
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  async sendResetPasswordEmail(
    job: Job<QueueEmailJobPayloads["SEND_RESET_PASSWORD_EMAIL"]>,
  ) {
    const { url, name, email } = job.data;
    return this.authService.sendResetPassordEmail(email, { url, name });
  }

  async sendWelcomeEmail(
    job: Job<QueueEmailJobPayloads["SEND_WELCOME_EMAIL"]>,
  ) {
    const { url, name, email } = job.data;
    return this.authService.sendWelcomeVerifyEmail(email, {
      url,
      name,
      email,
    });
  }
}
