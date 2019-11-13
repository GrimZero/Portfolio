export interface Callback {
    [x: string]: any;
    type: string;
    event(callback: Callback): void;
}
