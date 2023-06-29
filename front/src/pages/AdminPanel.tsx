import { FunctionComponent, useState, useCallback, useEffect } from 'react'
import UserAccount from '../components/UserAccount'
import PortalPopup from '../components/PortalPopup'
import { useNavigate } from 'react-router-dom'
import AdminPanelContainer from '../components/AdminPanelContainer'
import AdminPanelDeviceContainer from '../components/AdminPanelDeviceContainer'
import '../styles/AdminPanel.css'
import Navbar from '../components/Navbar'
import AdminPlanningContainer from '../components/AdminPlanningContainer'
import { client } from '../api/client'

const device1 = { src: '/clap.svg', name: 'Living Room Cam 1' }
const device2 = { src: '/spinner.svg', name: 'Living Room Cam 2' }
const device3 = { src: '/checkbi.svg', name: 'Bedroom Fire Captor' }
const device4 = { src: '/skull.svg', name: 'Bedroom Cam' }

const devices = [device1, device2, device3, device4]

interface Account {
  name: string
}

const AdminPanel: FunctionComponent = () => {
  const [isUserAccountOpen, setUserAccountOpen] = useState(false)
  const [accounts, setAccounts] = useState<Account[]>([])
  const navigate = useNavigate()

  const openUserAccount = useCallback(() => {
    setUserAccountOpen(true)
  }, [])

  const closeUserAccount = useCallback(() => {
    setUserAccountOpen(false)
  }, [])

  const onLogoutContainerClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await client.get('/users', {})
        if (response.data) {
          const accountNames = response.data.map((account: any) => account.name)
          setAccounts(accountNames)
          console.log('Accounts:', accountNames)
        } else {
          console.error('Error fetching accounts: Response data is undefined')
        }
      } catch (error) {
        console.error('Error fetching accounts:', error)
      }
    }

    fetchAccounts()
  }, [])

  return (
    <>
      <div className="admin-panel">
        <Navbar settingsText="Settings" />
        <div className="container">
          <div className="titlecontainer">
            <div className="titre">Settings</div>
          </div>
          <AdminPlanningContainer />
          <AdminPanelContainer accounts={accounts} />

          <div className="devices">
            <div className="devices1">Devices</div>
            <div className="accounts1">
              <div className="device-list">
                {devices.map(d => (
                  <AdminPanelDeviceContainer src={d.src} name={d.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="new-user" onClick={openUserAccount}>
          <b className="edit">New user</b>
        </div>
        <div className="logout" onClick={onLogoutContainerClick}>
          <b className="edit">Log out</b>
        </div>
      </div>
      {isUserAccountOpen && (
        <PortalPopup overlayColor="rgba(113, 113, 113, 0.3)" placement="Centered" onOutsideClick={closeUserAccount}>
          <UserAccount onClose={closeUserAccount} />
        </PortalPopup>
      )}
    </>
  )
}

export default AdminPanel
