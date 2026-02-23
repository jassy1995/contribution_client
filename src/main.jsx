import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './lib/hooks/ToastProvider.jsx';
import { AuthProvider } from './lib/hooks/use-auth.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: async (_data, _variables, _context, mutation) => {
      if (mutation.options.mutationKey) {
        await qc.invalidateQueries({
          queryKey: mutation.options.mutationKey,
        });
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={qc}>
      <ReactQueryDevtools />
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
