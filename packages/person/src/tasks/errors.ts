export type TaskErrorType = 'error' | 'abort';

export class TaskError extends Error {
  static Name = 'TaskError';
  public readonly event: Event;
  constructor(
    public type: TaskErrorType,
    args: { message?: string; cause?: Error | unknown; event: Event },
  ) {
    super(args.message, { cause: args.cause });
    this.name = TaskError.Name;
    this.event = args.event;
  }
}
