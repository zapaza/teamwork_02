import { useEffect } from 'react'
import Header from './components/header/header'
import { Outlet } from 'react-router-dom'
import { checkAuth } from './store/auth/authSlice'
import { useAppDispatch } from './store'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
