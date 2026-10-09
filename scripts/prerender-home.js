import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const vite = await createServer({
  mode: 'production',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { renderHome, renderProducts } = await vite.ssrLoadModule('/src/entry-server.jsx');
  const indexPath = resolve('dist/index.html');
  const template = await readFile(indexPath, 'utf8');
  const rootPlaceholder = '<div id="root"></div>';

  if (!template.includes(rootPlaceholder)) {
    throw new Error('Could not find the root placeholder in dist/index.html');
  }

  const stylesheetLink = template.match(/<link\b(?=[^>]*\brel="stylesheet")(?=[^>]*\bhref="([^"]+)")[^>]*>/);
  let productsTemplate = template;
  if (stylesheetLink) {
    const stylesheetPath = resolve('dist', stylesheetLink[1].replace(/^\/+/, ''));
    const stylesheet = await readFile(stylesheetPath, 'utf8');
    productsTemplate = template.replace(stylesheetLink[0], `<style>${stylesheet}</style>`);
  }

  const { html: appHtml, dehydratedState } = await renderHome();
  const { html: productHtml, dehydratedState: productState } = await renderProducts();
  const spaHtml = template;
  const serializeState = (state) => JSON.stringify(state)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
  const renderDocument = (html, state, documentTemplate = template) => documentTemplate.replace(
    rootPlaceholder,
    `<div id="root" data-ssr="true">${html}</div><script id="react-query-state" type="application/json">${serializeState(state)}</script>`,
  );
  const homeHtml = renderDocument(appHtml, dehydratedState);
  let productsHtml = renderDocument(productHtml, productState, productsTemplate)
    .replace('<title>KitchenTrusted</title>', '<title>Kitchen Products &amp; Reviews | KitchenTrusted</title>')
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      '<meta name="description" content="Browse kitchen product reviews and recommendations. Filter by category, price, and rating to find options for your home." />',
    );

  const firstProductPicture = productHtml.match(/<picture\b[^>]*>[\s\S]*?<\/picture>/i)?.[0];
  const firstProductAvifSource = firstProductPicture?.match(/<source\b(?=[^>]*\btype="image\/avif")[^>]*>/i)?.[0];
  const readHtmlAttribute = (element, attribute) => element?.match(new RegExp(`\\b${attribute}="([^"]*)"`, 'i'))?.[1];
  const lcpImageSrcSet = readHtmlAttribute(firstProductAvifSource, 'srcSet');
  const lcpImageSizes = readHtmlAttribute(firstProductAvifSource, 'sizes');
  const lcpImageUrl = lcpImageSrcSet?.match(/(?:^|,\s*)(\S+)/)?.[1];

  if (lcpImageUrl && lcpImageSrcSet && lcpImageSizes) {
    const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const lcpImagePreload = `<link rel="preload" as="image" href="${escapeAttribute(lcpImageUrl)}" imagesrcset="${escapeAttribute(lcpImageSrcSet)}" imagesizes="${escapeAttribute(lcpImageSizes)}" type="image/avif" fetchpriority="high" />`;
    productsHtml = productsHtml.replace('</head>', `${lcpImagePreload}</head>`);
  }

  await mkdir(resolve('dist/products'), { recursive: true });
  await Promise.all([
    writeFile(indexPath, homeHtml, 'utf8'),
    writeFile(resolve('dist/spa.html'), spaHtml, 'utf8'),
    writeFile(resolve('dist/products/index.html'), productsHtml, 'utf8'),
  ]);

  console.log('Pre-rendered homepage and products HTML and generated the client-side route shell.');
} finally {
  await vite.close();
}
