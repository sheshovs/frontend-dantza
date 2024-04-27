import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './GlobalStyle.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ThemeConfig from './common/theme/index.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeConfig>
      <RouterProvider router={router} />
    </ThemeConfig>
  </React.StrictMode>,
)
