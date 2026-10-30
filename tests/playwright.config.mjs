// REAL FISHING WORLD – Phase 1 QA (AI-5, independent auditor)
// Run:  npx playwright test -c tests/playwright.config.mjs            (all 3 projects)
//       QA_BASE_URL=http://127.0.0.1:4173 npx playwright test -c tests/playwright.config.mjs --project=webkit-iphone-se
// Uses the `playwright/test` runner bundled in the `playwright` package already in devDependencies (no new deps).
import { defineConfig, devices } from 'playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const MOCK = !!process.env.QA_MOCK; // harness self-test against tests/fixtures/mock-game (NEVER counts as a game result)
const BASE0 = process.env.QA_BASE_URL || (MOCK ? 'http://127.0.0.1:4199' : 'http://127.0.0.1:4173');
const BASE = BASE0.endsWith('/') ? BASE0 : BASE0 + '/'; // trailing slash so ./ resolves under a sub-path (GitHub Pages)
const TAG = process.env.QA_TAG ? '.' + process.env.QA_TAG : ''; // separate result/artifact files per target (local / live)
const SE = process.env.QA_SE_GEN3 ? 'iPhone SE (3rd gen)' : 'iPhone SE'; // default 320x568 = strictest small iPhone

const chromiumArgs = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];

export default defineConfig({
  testDir: path.join(here, 'e2e'),
  testMatch: /.*\.spec\.js/,
  outputDir: path.join(here, 'out/artifacts' + TAG),
  timeout: 150_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['json', { outputFile: path.join(here, MOCK ? 'out/results.mock.json' : `out/results${TAG}.json`) }],
    ['html', { outputFolder: path.join(here, 'out/html' + TAG), open: 'never' }],
  ],
  use: { baseURL: BASE, trace: 'retain-on-failure', screenshot: 'only-on-failure', video: 'off', actionTimeout: 10_000 },
  projects: [
    { name: 'webkit-iphone-se', use: { ...devices[SE] } },
    { name: 'webkit-iphone-13', use: { ...devices['iPhone 13'] } },
    {
      // hasTouch:true so the touch UI (joystick) is shown; Chromium also gets REAL touch via CDP.
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 }, hasTouch: true, launchOptions: { args: chromiumArgs } },
    },
  ],
  webServer: process.env.QA_BASE_URL
    ? undefined
    : MOCK
      ? { command: 'node tests/fixtures/serve.mjs', cwd: root, url: BASE, reuseExistingServer: true, timeout: 20_000 }
      : { command: 'npm run build && npm run preview', cwd: root, url: BASE, reuseExistingServer: true, timeout: 240_000 },
});
