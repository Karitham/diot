import { useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../styles/compo/Navbar.css'

interface NavbarProps {
  settingsText: string
}

const Navbar: React.FC<NavbarProps> = ({ settingsText }) => {
  const navigate = useNavigate()

  const onTopNavContainerClick = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const onNotificationIconClick = useCallback(() => {
    navigate('/notifications')
  }, [navigate])

  const onDashboardTextClick = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const onUserLogoClick = useCallback(() => {
    navigate('/adminpanel')
  }, [navigate])

  return (
    <nav className="nav">
      <div className="topnav">
        <div className="logoslogan">
          <img className="logotext-icon" alt="" src="/logotext.svg" onClick={onTopNavContainerClick}/>
          <b className="smart-homes-smarter">Smart homes, smarter</b>
        </div>
        <div className="icons">
          <img className="notification-icon" alt="" src="/notification.svg" onClick={onNotificationIconClick}/>
          <img className="user-icon" alt="" src="/user.svg" onClick={onUserLogoClick} />
        </div>
      </div>
      <div className="breadcrumbs">
        <Link to="/dashboard" className="dashboard" onClick={onDashboardTextClick}>
          Dashboard
        </Link>
        <div className="crumb1">
          <img className="caret-icon" alt="" src="/caret.svg"/>
            {settingsText}

        </div>
        <div className="crumb2">
          <img className="caret-icon" alt="" src="/caret1.svg" />
          <div className="edit">Edit</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
