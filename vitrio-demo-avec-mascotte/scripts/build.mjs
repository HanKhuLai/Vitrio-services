import { mkdir, cp, rm } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
await rm(new URL('dist/', root), { recursive: true, force: true });
await mkdir(new URL('dist/', root), { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'booking.mjs', 'config.js', 'mentions-legales.html', 'confidentialite.html', '.nojekyll', 'assets']) {
  await cp(new URL(file, root), new URL(`dist/${file}`, root), { recursive: true });
}
console.log('Site généré dans dist/ (aucune publication).');
