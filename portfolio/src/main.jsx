import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Portfolio from './pages/Portfolio.jsx';
import Service from "./pages/Service.jsx"
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import RequireAuth from "./components/admin/RequireAuth.jsx";
import WorkPages from "./pages/WorkPages.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index element={<Home />}/>
        <Route path='about' element={<About />}/>
        <Route path='service' element={<Service />}/>
        <Route path='contact' element={<Contact/>} />
        <Route path='portfolio' element={<Portfolio/>} />
        <Route path='portfolio/:category' element={<WorkPages/>} />
        <Route path='blogs' element={<Blog/>} />
        <Route path='blog/:id' element={<BlogPost/>} />
      </Route>

      <Route path="/admin">
        <Route index element={<AdminLogin />} />
        <Route path="login" element={<AdminLogin />} />
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
