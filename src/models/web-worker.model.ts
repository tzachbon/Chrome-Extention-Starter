export namespace WebWorker {
    export type Action = 'SOME_ACTION';

    export interface Message<T = any> {
        action: Action;
        payload: T
    }
}