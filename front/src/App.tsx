import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Notifications from './pages/Notifications'
import { useEffect } from 'react'

import { ToastContainer, cssTransition, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthGuard from './components/AuthGuard'

function App() {
  const location = useLocation()
  const action = useNavigationType()

  // Close the toasts when change the page
  useEffect(() => {
    if (action === 'PUSH') {
      toast.dismiss() // Supprime tous les toasts actuellement affichés
    }
  }, [action])
  //------------------------

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
        autoClose={500}
        hideProgressBar={false}
        closeOnClick={true}
        rtl={false}
        limit={3}
        theme="colored"
        transition={cssTransition({
          enter: 'toastify__slide-enter',
          exit: 'toastify__slide-exit'
        })}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/adminpanel"
          element={
            <AuthGuard>
              <AdminPanel />
            </AuthGuard>
          }
        />
        <Route
          path="/notifications"
          element={
            <AuthGuard>
              <Notifications />
            </AuthGuard>
          }
        />
      </Routes>
    </div>
  )
}

export default App
