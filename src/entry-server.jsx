import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import { AppContent } from './App.jsx';

export function renderHome() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return new Promise((resolve, reject) => {
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
        reject(new Error('React reported an error while rendering the homepage'));
        return;
      }
      resolve(html);
    });
    output.on('error', reject);

    const stream = renderToPipeableStream(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location="/">
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
  });
}
