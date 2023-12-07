import { Express } from 'express';
// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
};

export { Express };
