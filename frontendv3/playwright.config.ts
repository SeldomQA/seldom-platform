import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:  [['html', { open: 'always', outputFolder: 'test-results' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  // testMatch: 'todo-fixture*.spec.ts',

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3333',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    // 用例失败截图
    screenshot: 'only-on-failure',
    
    // 用户代理
    // userAgent: 'some custom ua',

    // 启动浏览器窗口
    // viewport: { width: 100, height: 100 },
    
    // 关闭无头模式
    headless: false,  

    // 暗黑/高亮模式
    colorScheme: 'dark', 

  },

  // 全局 setup & teardown
  // globalSetup: './global-setup',
  // globalTeardown: './global-teardown',

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'setup db',
    //   testMatch: /global\.setup\.ts/,
    //   teardown: 'cleanup db',
    // },
    // {
    //   name: 'cleanup db',
    //   testMatch: /global\.teardown\.ts/,
    // },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        userAgent: 'some custom ua',
        viewport: { width: 1920, height: 1080 },
      },
      // dependencies: ['setup db'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
