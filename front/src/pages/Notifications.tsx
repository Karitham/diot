import { FunctionComponent, SVGProps, useEffect, useState } from 'react'
import AlertContainer, { AlertContainerProps } from '../components/AlertContainer'
import '../styles/Notifications.css'
import Navbar from '../components/Navbar'
import { client } from '../api/client'

const Notifications: FunctionComponent = () => {
  const [alerts, setAlerts] = useState<AlertContainerProps[]>([])
  useEffect(() => {
    getNotifications().then(setAlerts)
  }, [])

  return (
    <div className="notifications1">
      <Navbar settingsText="Notifications" />
      <div className="contentwrapper">
        <div className="notifications3">
          <div className="titre1">Notification History</div>
          <div className="alerts-parent">
            <div className="alerts">
              {alerts.map(a => (
                <div className="grow-container" key={a.id}>
                  <AlertContainer {...a} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications

const getNotifications = async (): Promise<AlertContainerProps[]> => {
  const a = await client.get('/alerts', {})
  if (a.error) {
    console.error(a.error)
    return []
  }

  return a.data.map(a => {
    return {
      id: a.id,
      icon: <Icon kind={a.kind}></Icon>,
      time: new Date(a.created_at),
      sensor: a.sensor_id,
      label: a.kind
    }
  })
}

const Icon = (props: { kind: string; alert?: boolean }) => {
  const svgProps = {
    width: 32,
    height: 32,
    color: props.alert ? 'var(--colors-red)' : 'var(--text-textneg)'
  }
  switch (props.kind) {
    case 'bad air quality':
      return <PhCloudFogLight {...svgProps} />
    case 'fire':
      return <PhFire {...svgProps} />
    case 'flood':
      return <PhDrop {...svgProps} />
    default:
      return <PhDrop {...svgProps} />
  }
}

function PhDrop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M174 47.75a254.19 254.19 0 0 0-41.45-38.3a8 8 0 0 0-9.18 0A254.19 254.19 0 0 0 82 47.75C54.51 79.32 40 112.6 40 144a88 88 0 0 0 176 0c0-31.4-14.51-64.68-42-96.25ZM128 216a72.08 72.08 0 0 1-72-72c0-57.23 55.47-105 72-118c16.53 13 72 60.75 72 118a72.08 72.08 0 0 1-72 72Zm55.89-62.66a57.6 57.6 0 0 1-46.56 46.55a8.75 8.75 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z"></path>
    </svg>
  )
}

function PhFire(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M183.89 153.34a57.6 57.6 0 0 1-46.56 46.55a8.75 8.75 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68ZM216 144a88 88 0 0 1-176 0c0-27.92 11-56.47 32.66-84.85a8 8 0 0 1 11.93-.89l24.12 23.41l22-60.41a8 8 0 0 1 12.63-3.41C165.21 36 216 84.55 216 144Zm-16 0c0-46.09-35.79-85.92-58.21-106.33l-22.27 61.07a8 8 0 0 1-13.09 3L80.06 76.16C64.09 99.21 56 122 56 144a72 72 0 0 0 144 0Z"></path>
    </svg>
  )
}

function PhCloudFogLight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M120 198H72a6 6 0 0 1 0-12h48a6 6 0 0 1 0 12Zm64-12h-24a6 6 0 0 0 0 12h24a6 6 0 0 0 0-12Zm-24 32h-56a6 6 0 0 0 0 12h56a6 6 0 0 0 0-12Zm70-126a74.09 74.09 0 0 1-74 74H76a50 50 0 1 1 10.2-99A74.08 74.08 0 0 1 230 92Zm-12 0a62.06 62.06 0 0 0-124-3.65a6 6 0 0 1-12-.7a75.84 75.84 0 0 1 1.07-9A38 38 0 1 0 76 154h80a62.07 62.07 0 0 0 62-62Z"></path>
    </svg>
  )
}
