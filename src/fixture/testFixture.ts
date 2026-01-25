import { test as base } from '@playwright/test';
export const test = base.extend<{ saveLogs: void; }>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running...');
        await use();
        console.log('Global afterEach is running...');
    },
    { auto: true }],
});
export { expect } from '@playwright/test';