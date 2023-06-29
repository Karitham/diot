import { FunctionComponent, useState, useCallback, useEffect, SVGProps } from 'react'
import UserAccount, { Account } from '../components/UserAccount'
import PortalPopup from '../components/PortalPopup'
import { useNavigate } from 'react-router-dom'
import AdminPanelContainer from '../components/AdminPanelContainer'
import AdminPanelDeviceContainer from '../components/AdminPanelDeviceContainer'
import '../styles/AdminPanel.css'
import Navbar from '../components/Navbar'
import AdminPlanningContainer from '../components/AdminPlanningContainer'
import { client } from '../api/client'
import SubmitButton from '../components/SubmitButton'
import useAuth from '../api/useAuth'
import { components } from '../api/api'

const AdminPanel: FunctionComponent = () => {
  const [isUserAccountOpen, setUserAccountOpen] = useState(false)
  const [users, setUsers] = useState<Account[]>()
  const [devices, setDevices] = useState<components['schemas']['SensorInfo'][]>([])
  const navigate = useNavigate()

  const openUserAccount = useCallback(() => {
    setUserAccountOpen(true)
  }, [])

  const closeUserAccount = useCallback(() => {
    setUserAccountOpen(false)
  }, [])

  const onLogoutContainerClick = useCallback(() => {
    const destroySession = useAuth()[2]
    destroySession()
    navigate('/')
  }, [navigate])

  useEffect(() => {
    refreshAccounts(setUsers)
    refreshDevices(setDevices)
  }, [setUsers])

  const Device = (props: components['schemas']['SensorInfo']) => {
    const [icon, setIcon] = useState(<SvgSpinners180Ring></SvgSpinners180Ring>)
    setTimeout(() => {
      setIcon(<img src="/checkbi.svg"></img>)
    }, 10000)

    return <AdminPanelDeviceContainer name={props.label} icon={icon} />
  }

  return (
    <>
      <div className="admin-panel">
        <Navbar settingsText="Settings" showBreadcrumbs={true} />
        <div className="container contentwrapper1">
          <div className="titlecontainer">
            <div className="titre">Settings</div>
          </div>
          <AdminPlanningContainer />
          {users && <AdminPanelContainer accounts={users} refresh={() => refreshAccounts(setUsers)} />}
          <div className="devices">
            <div className="devices1">Devices</div>
            <div className="accounts1">
              <div className="device-list">
                {devices.map(d => (
                  <Device {...d} />
                ))}
              </div>
            </div>
          </div>
          <SubmitButton className="new-user" onClick={openUserAccount} text="New user"></SubmitButton>
          <SubmitButton className="logout" onClick={onLogoutContainerClick} text="Log out"></SubmitButton>
        </div>
      </div>
      {isUserAccountOpen && (
        <PortalPopup overlayColor="rgba(113, 113, 113, 0.3)" placement="Centered" onOutsideClick={closeUserAccount}>
          <UserAccount
            onClose={closeUserAccount}
            onAccountSave={t => {
              createUserAccount(t).then(() => refreshAccounts(setUsers))
              closeUserAccount()
            }}
          />
        </PortalPopup>
      )}
    </>
  )
}

export default AdminPanel

const createUserAccount = async (user: Account) => {
  const response = await client.post('/users', {
    body: {
      name: user.name,
      password: user.password!,
      email: user.email,
      permissions: user.permissions
    }
  })

  if (response.data) {
    console.log('User account created:', response.data)
  }

  return response.data
}

const refreshAccounts = async (setUsers: (a: Account[]) => void) => {
  try {
    const response = await client.get('/users', {})
    if (response.data) {
      setUsers(response.data)
      console.log('Accounts:', response.data)
    } else {
      console.error('Error fetching accounts: Response data is undefined')
    }
  } catch (error) {
    console.error('Error fetching accounts:', error)
  }
}

const refreshDevices = async (setDevices: (a: components['schemas']['SensorInfo'][]) => void) => {
  try {
    const response = await client.get('/sensors', {})
    if (response.data) {
      // filter out duplicate devices based on id
      const uniqueDevices = response.data.filter(
        (device, index, self) => self.findIndex(d => d.id === device.id) === index
      )
      setDevices(uniqueDevices)
      console.log('Devices:', response.data)
    } else {
      console.error('Error fetching devices: Response data is undefined')
    }
  } catch (error) {
    console.error('Error fetching devices:', error)
  }
}

export function SvgSpinners180Ring(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"></animateTransform>
      </path>
    </svg>
  )
}
