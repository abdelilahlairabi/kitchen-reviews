import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { dehydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import { AppContent } from './App.jsx';
import { fetchProducts, PRODUCT_PAGE_SIZE } from './services/products.js';
import { productKeys } from './hooks/useProducts.js';

function renderRoute(location, productQueries) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return Promise.allSettled(
    productQueries.map(async (filters) => {
      try {
        await queryClient.fetchQuery({
          queryKey: productKeys.list(filters),
          queryFn: () => fetchProducts({
            ...filters,
            signal: AbortSignal.timeout(5000),
          }),
        });
      } catch (error) {
        console.warn(`Could not prefetch products for ${location}:`, error.message);
      }
    }),
  ).then(() => new Promise((resolve, reject) => {
    let html = '';
    let didError = false;
    const output = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });

    output.on('finish', () => {
      if (didError) {
        reject(new Error(`React reported an error while rendering ${location}`));
        return;
      }
      resolve({ html, dehydratedState: dehydrate(queryClient) });
    });
    output.on('error', reject);

    const stream = renderToPipeableStream(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location={location}>
            <AppContent />
          </StaticRouter>
        </QueryClientProvider>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onShellError: reject,
        onError() {
          didError = true;
        },
      },
    );
  }));
}

export function renderHome() {
  const homepageProductQueries = [
    { badge: 'Best Seller', page: 1, pageSize: 4, sort: 'popularity' },
    { page: 1, pageSize: 24, sort: 'popularity' },
    { hasDiscount: true, page: 1, pageSize: 3, sort: 'discount' },
  ];

  return renderRoute('/', homepageProductQueries);
}

export function renderProducts() {
  return renderRoute('/products', [
    { page: 1, pageSize: PRODUCT_PAGE_SIZE, sort: 'popularity' },
  ]);
}
