import { INestApplication } from "@nestjs/common";
import { getQueueToken } from "@nestjs/bullmq";
import { Queue, QueueEvents } from "bullmq";

type CompletedEventPayload = {
  jobId: string;
  returnvalue?: unknown;
  prev?: string | null;
};

type FailedEventPayload = {
  jobId: string;
  failedReason?: string;
};

export type QueueTestHarness = {
  queue: Queue;
  queueEvents: QueueEvents;
  waitForJobCompletion: () => Promise<CompletedEventPayload>;
  cleanQueue: () => Promise<void>;
  dispose: () => Promise<void>;
};

export async function createQueueTestHarness(
  app: INestApplication,
  queueName: string,
): Promise<QueueTestHarness> {
  const queue = app.get<Queue>(getQueueToken(queueName));
  const queueEvents = new QueueEvents(queueName, {
    connection: queue.opts.connection,
  });

  await queueEvents.waitUntilReady();

  const waitForJobCompletion = () =>
    new Promise<CompletedEventPayload>((resolve, reject) => {
      const cleanup = () => {
        queueEvents.off("completed", onCompleted);
        queueEvents.off("failed", onFailed);
      };

      const onCompleted = (payload: CompletedEventPayload) => {
        cleanup();
        resolve(payload);
      };

      const onFailed = (payload: FailedEventPayload) => {
        cleanup();
        const reason = payload.failedReason ? `: ${payload.failedReason}` : "";
        reject(new Error(`Job ${payload.jobId} failed${reason}`));
      };

      queueEvents.on("completed", onCompleted);
      queueEvents.on("failed", onFailed);
    });

  const cleanQueue = async () => {
    await queue.drain(true);
    await queue.clean(0, 100, "completed");
    await queue.clean(0, 100, "failed");
  };

  const dispose = async () => {
    await queueEvents.close();
  };

  return {
    queue,
    queueEvents,
    waitForJobCompletion,
    cleanQueue,
    dispose,
  };
}
