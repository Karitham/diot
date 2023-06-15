import { Routes, Route, useNavigationType, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Notifications from './pages/Notifications'
import { useEffect } from 'react'

function App() {
  const action = useNavigationType()
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0)
    }
  }, [action, pathname])

  useEffect(() => {
    let title = ''
    let metaDescription = ''

    switch (pathname) {
      case '/':
        title = ''
        metaDescription = ''
        break
      case '/dashboard':
        title = ''
        metaDescription = ''
        break
      case '/adminpanel':
        title = ''
        metaDescription = ''
        break
      case '/notifications':
        title = ''
        metaDescription = ''
        break
    }

    if (title) {
      document.title = title
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector('head > meta[name="description"]')
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription
      }
    }
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  )
}
export default App
