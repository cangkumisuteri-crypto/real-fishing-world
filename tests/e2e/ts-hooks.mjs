// Node resolve hook: lets Node's built-in TypeScript stripping import src/*.ts files that use extensionless specifiers ('./grid').
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
export async function resolve(specifier, context, next) {
  if (/^\.\.?\//.test(specifier) && !/\.[cm]?[jt]s$/.test(specifier) && context.parentURL) {
    const base = new URL(specifier, context.parentURL);
    for (const ext of ['.ts', '/index.ts']) {
      const u = new URL(base.href + ext);
      if (fs.existsSync(fileURLToPath(u))) return next(u.href, context);
    }
  }
  return next(specifier, context);
}
