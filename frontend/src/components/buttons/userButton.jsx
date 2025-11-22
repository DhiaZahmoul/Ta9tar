"use client"

import React from 'react'
import {useRouter} from 'next/navigation'
import admin from '../../../public/admin.png'
import Card from "react-bootstrap/Card";
import './userButton.css'
const UserButton = () => {

  const router = useRouter()

  const handleClick = () => {
    router.push('/dashboard')
  }


  return (
    <div className='userButton'>
        <Card onClick={handleClick}
        style={{ cursor: "pointer" }}>
            <Card.Img variant="top" src="/user.png" />
          <Card.Body>
            <Card.Title>User Dashboard</Card.Title>
            <p>click here to continue as a user</p>
          </Card.Body>
        </Card>

    </div>
  )
}

export default UserButton