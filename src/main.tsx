import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import mainRoutes from "./routes/mainRoute.js"
import { Provider } from 'react-redux'
import { store } from './store/index.js'

const router = createBrowserRouter(mainRoutes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
