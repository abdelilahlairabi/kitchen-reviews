import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const vite = await createServer({
  mode: 'production',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { renderHome } = await vite.ssrLoadModule('/src/entry-server.jsx');
  const indexPath = resolve('dist/index.html');
  const template = await readFile(indexPath, 'utf8');
  const rootPlaceholder = '<div id="root"></div>';

  if (!template.includes(rootPlaceholder)) {
    throw new Error('Could not find the root placeholder in dist/index.html');
  }

  const appHtml = await renderHome();
  const spaHtml = template;
  const homeHtml = template.replace(
    rootPlaceholder,
    `<div id="root" data-ssr="true">${appHtml}</div>`,
  );

  await Promise.all([
    writeFile(indexPath, homeHtml, 'utf8'),
    writeFile(resolve('dist/spa.html'), spaHtml, 'utf8'),
  ]);

  console.log('Pre-rendered homepage HTML and generated the client-side route shell.');
} finally {
  await vite.close();
}
