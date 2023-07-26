import { useEffect } from 'react'
import Header from './components/header/header'
import { Outlet } from 'react-router-dom'
import { checkAuth } from './store/auth/authSlice'
import { useAppDispatch } from './store'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // не знаю что он от меня хочет с этими типами
    dispatch(checkAuth() as any)
  }, [dispatch])
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
