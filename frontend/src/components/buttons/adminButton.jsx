"use client"

import React from 'react'
import {useRouter} from 'next/navigation'
import admin from '../../../public/admin.png'
import Card from "react-bootstrap/Card";
import './adminButton.css'
const AdminButton = () => {

  const router = useRouter()

  const handleClick = () => {
    router.push('/admin')
  }


  return (
    <div className='adminButton'>
        <Card onClick={handleClick}
        style={{ cursor: "pointer" }}>
            <Card.Img variant="top" src="/admin.png" />
          <Card.Body>
            <Card.Title>Admin Panel</Card.Title>
            <p>click here to continue as an admin</p>
          </Card.Body>
        </Card> 

    </div>
  )
}

export default AdminButton