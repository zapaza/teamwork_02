import { useRouteError } from 'react-router-dom'
import './error-page.css';
import '../../styles/helpers.css';

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page" className="error-page__container">
      <h1 className='text-9-xl-font-bold'>{error.status == '404' ? '404' : '500'}</h1>
      <p className='text-xl-font-regular error-page__description'>
        {error.status == '404' ? 'То, что вы ищете, не создано или куда-то пропало' : 'Ой, что-то не так :('}
      </p>
      <button>На главную</button>
    </div>
  )
}
