import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Notifications from './pages/Notifications'
import { useEffect } from 'react'

import { ToastContainer, cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const location = useLocation()

  useEffect(() => {
    const disableBrowserBackButton = (event: PopStateEvent) => {
      window.history.forward()
      event.preventDefault()
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', disableBrowserBackButton)

    return () => {
      window.removeEventListener('popstate', disableBrowserBackButton)
    }
  }, [])

  useEffect(() => {
    const { pathname } = location

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
  }, [location])

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        theme="colored"
        transition={cssTransition({
          enter: 'toastify__slide-enter',
          exit: 'toastify__slide-exit'
        })}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
  )
}

export default App
