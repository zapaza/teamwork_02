import { useEffect } from 'react'
import ApiClient from './core/api/ApiClient'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `https://ya-praktikum.tech/api/v2`
      const client = new ApiClient(url)
      try {
        const response = await client.post(`/auth/signin`, {
          login: 'Qwerty123',
          password: 'Qwerty123',
        })
        console.log(response)
      } catch (e) {
        console.log(e)
      }
    }

    fetchServerData()
  }, [])
  return <div className="App">Вот тут будет жить ваше приложение :)</div>
}

export default App
