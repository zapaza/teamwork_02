import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Navigate } from 'react-router-dom'

function ProtectedRoute<T extends React.ReactNode>({
  children,
}: {
  children: T
}) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  )

  return isAuthenticated ? children || null : <Navigate to="/login" />
}

export default ProtectedRoute
