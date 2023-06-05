import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/AppRouter'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
