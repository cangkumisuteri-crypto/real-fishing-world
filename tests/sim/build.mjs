// node 用にソースを1ファイルへバンドルする（シミュレーション/バランス検証用）
import { rolldown } from 'rolldown';
import path from 'node:path';
import url from 'node:url';
const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../..');
export async function bundle(entry, out) {
  const b = await rolldown({ input: path.join(root, entry), platform: 'node', logLevel: 'silent' });
  await b.write({ file: out, format: 'esm' });
  await b.close();
  return out;
}
if (process.argv[2]) { await bundle(process.argv[2], process.argv[3]); console.log('built', process.argv[3]); }
