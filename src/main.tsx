import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './GlobalStyle.css'
import ThemeConfig from './common/theme/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './common/context/AuthContext.tsx'
import { SnackbarProvider } from 'notistack'
import SnackbarCloseButton from './common/components/SnackbarCloseButton.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById(`root`)!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeConfig>
        <AuthProvider>
          <SnackbarProvider
            autoHideDuration={7000}
            maxSnack={2}
            dense
            anchorOrigin={{
              vertical: `top`,
              horizontal: `right`,
            }}
            action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
          >
            <App />
          </SnackbarProvider>
        </AuthProvider>
      </ThemeConfig>
    </QueryClientProvider>
  </React.StrictMode>,
)
