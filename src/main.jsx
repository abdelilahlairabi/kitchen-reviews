import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { hydrate, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { queryClient } from './lib/queryClient.js'

const rootElement = document.getElementById('root')
const queryStateElement = document.getElementById('react-query-state')
const isFilteredProductsRoute = /^\/products\/?$/.test(window.location.pathname) && window.location.search.length > 0

if (queryStateElement) {
  if (!isFilteredProductsRoute) {
    try {
      hydrate(queryClient, JSON.parse(queryStateElement.textContent))
    } catch (error) {
      console.error('Could not restore pre-rendered product data:', error)
    }
  }
  queryStateElement.remove()
}

const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)

if (rootElement.dataset.ssr === 'true') {
  if (isFilteredProductsRoute) {
    createRoot(rootElement).render(app)
  } else {
    hydrateRoot(rootElement, app)
  }
} else {
  createRoot(rootElement).render(app)
}
