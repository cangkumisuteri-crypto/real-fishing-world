// Tiny static server for the HARNESS SELF-TEST mock (QA_MOCK=1). Not the game.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'mock-game');
http.createServer((req, res) => {
  const p = req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0];
  const f = path.join(dir, p);
  if (!f.startsWith(dir) || !fs.existsSync(f)) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'content-type': f.endsWith('.html') ? 'text/html' : 'text/plain' }); res.end(fs.readFileSync(f));
}).listen(4199, '127.0.0.1', () => console.log('mock on 4199'));
