import { useState, useEffect } from 'react'
import Header from './components/header/header'
import { Outlet } from 'react-router-dom'
import { checkAuth } from './store/auth/authSlice'
import { useAppDispatch } from './store'

function App() {
  const [isDataLoaded, setDataLoaded] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await dispatch(checkAuth()).unwrap()
        setDataLoaded(true)
      } catch (error) {
        console.error(error)
        setDataLoaded(true)
      }
    }
    fetchAuth()
  }, [dispatch])

  if (!isDataLoaded) {
    return null
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
