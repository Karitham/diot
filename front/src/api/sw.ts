import { client } from './client'

export async function subscribePush(): Promise<void> {
  const sw = await registerSW()
  if (!sw) {
    console.error('Failed to register service worker')
    return
  }

  await requestNotif()
  await subscribeNotif(sw)

  return
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
      if (registration.installing) {
        console.log('Service worker installing')
      } else if (registration.waiting) {
        console.log('Service worker installed')
      } else if (registration.active) {
        console.log('Service worker active')
      }
      return registration
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
  }
}

async function requestNotif() {
  const result = await Notification.requestPermission()
  if (result === 'denied') {
    console.error('The user explicitly denied the permission request.')
    return
  }
  if (result === 'granted') {
    console.info('The user accepted the permission request.')
  }
}

async function subscribeNotif(sw: ServiceWorkerRegistration) {
  const subscribed = await sw.pushManager.getSubscription()
  if (subscribed) {
    console.info('User is already subscribed.')
    return
  }

  const pkey = await client.get('/notifications/webpush', {})
  if (pkey.error) {
    console.error('Failed to get public key')
    console.error(pkey.error)
    return
  }

  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pkey.data.key
  })

  const subJson = subscription.toJSON()

  const res = await client.post('/notifications/webpush', { body: subJson as any })
  if (res.error) {
    console.error('Failed to subscribe to push notifications')
    console.error(res.error)
    return
  }

  console.info('Successfully subscribed to push notifications')
}
