export type TaskErrorType = 'error' | 'abort';

export type TaskError = typeof Error & { type?: 'error' | 'abort' };
