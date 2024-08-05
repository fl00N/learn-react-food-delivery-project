import React, { useContext, useState } from 'react'
import './NavbarProfile.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const NavbarProfile = () => {

    const [openProfile, setOpenProfile] = useState(false)

    const {setToken} = useContext(StoreContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        navigate('/')
    }

  return (

    <div className='navbar-profile'>
        <img onClick={() => setOpenProfile((prev) => !prev)} src={assets.profile_icon} alt="" />
        {
            openProfile
              ? <ul className="nav-profile-dropdown">
                  <li onClick={() => navigate('/my-orders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
              : <></>
        }

    </div>

  )
}

export default NavbarProfile