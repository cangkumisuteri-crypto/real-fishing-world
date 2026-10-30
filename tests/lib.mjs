import http from 'http'; import fs from 'fs'; import path from 'path';
import { webkit, chromium, devices } from 'playwright';
export { webkit, chromium, devices };
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json' };
export function serve(dir) {
  return new Promise((res) => {
    const s = http.createServer((q, r) => {
      let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
      const f = path.join(dir, p);
      if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('nf'); }
      r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); fs.createReadStream(f).pipe(r);
    }).listen(0, '127.0.0.1', () => res({ s, port: s.address().port }));
  });
}
export const WK_ENV = { ...process.env, LD_LIBRARY_PATH: (process.env.HOME || '') + '/wklibs/usr/lib/x86_64-linux-gnu:' + (process.env.LD_LIBRARY_PATH || '') };
export const CHROMIUM_ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'];
export function collect(page) {
  const log = { console: [], pageerror: [], requestfailed: [], http: [], warnings: [] };
  page.on('console', (m) => { const t = m.type(); if (t === 'error') log.console.push(m.text() + ' @' + (m.location().url || '')); else if (t === 'warning') log.warnings.push(m.text()); });
  page.on('pageerror', (e) => log.pageerror.push(e.message));
  page.on('requestfailed', (r) => log.requestfailed.push(r.url() + ' :: ' + (r.failure() && r.failure().errorText)));
  page.on('response', (r) => { if (r.status() >= 400) log.http.push(r.status() + ' ' + r.url()); });
  return log;
}
