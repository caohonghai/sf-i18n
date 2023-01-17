declare const log: {
    info: (msg: string) => void;
    warning: (msg: string) => void;
    success: (msg: string) => void;
    error: (msg1: unknown, msg2?: unknown) => void;
};
export default log;
