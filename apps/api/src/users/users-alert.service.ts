import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { USER_ALERT_QUEUE, UserAlertQueueJobPayloads } from "./users.queue";

@Injectable()
export class UsersAlertService {
  private readonly jobSettings = { age: 3600 };

  constructor(
    @InjectQueue(USER_ALERT_QUEUE.name) private readonly queue: Queue,
  ) {}

  public async sendAlertEmailAsync(
    payload: Omit<UserAlertQueueJobPayloads["SEND_ALERT_EMAIL"], "type">,
  ) {
    const opts = { removeOnComplete: this.jobSettings };
    const payloadWithType = {
      ...payload,
      type: USER_ALERT_QUEUE.actions.SEND_ALERT_EMAIL,
    };
    await this.queue.add(
      USER_ALERT_QUEUE.actions.SEND_ALERT_EMAIL,
      payloadWithType,
      opts,
    );
  }
}
