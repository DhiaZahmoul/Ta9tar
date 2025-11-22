"use client"

import React from 'react'
import AdminButton from '@/components/buttons/adminButton'
import UserButton from '@/components/buttons/userButton'
import './choice.css'

const ChoicePage = () => {
  return (
    <div className='choicePage'>
      <header className="header">
        <h1>Welcome!</h1>
        <h3>You have entered Admin credentials, please select an option below:</h3>
      </header>

      <div className='choiceButtons'>
        <AdminButton />
        <UserButton />
      </div>

      <footer className='footer'>
        <p>@copyright Ta9tar 2025</p>
        <p className='adminNotice'>
          Logging in as an admin grants you permission to perform administrative actions, 
          to the extent permitted by applicable law. Use responsibly and legally.
        </p>
      </footer>
    </div>
  )
}

export default ChoicePage
