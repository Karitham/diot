self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)

  const title = 'New event from iDIoT'
  const options = {
    body: event.data.text(),
    icon: '/favicon.svg',
    badge: '/favicon.svg'
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
