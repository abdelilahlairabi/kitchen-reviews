import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { queryClient } from './lib/queryClient.js'

const rootElement = document.getElementById('root')
const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)

if (rootElement.dataset.ssr === 'true') {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
