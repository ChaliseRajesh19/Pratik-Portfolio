import { Navigate, Outlet, useLocation } from 'react-router-dom'

const hasAdminToken = () => Boolean(localStorage.getItem('adminToken'))

function RequireAuth() {
  const location = useLocation()

  if (!hasAdminToken()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth
