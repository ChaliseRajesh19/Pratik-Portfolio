import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.jsx'
import './index.css'
import { routes } from './routes.jsx'
export const createRoot = ViteReactSSG(
  {
    routes,
    RootComponent: App
  }
)
