'use client';

import React, {useEffect} from 'react'
import AdminSearch from '@/components/admin/search'
import ActionsList from '@/components/admin/actionsList'
import './adminPage.css'

const AdminPage = () => {
    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin || isAdmin !== "true") {
          window.location.href = '/login'; // or '/dashboard'
        }
      }, []);
  return (
    <div className="adminPage">
      <h1>Admin Panel Dashboard</h1>
      <div className="adminContainer">
        <div className="adminSection">
          <AdminSearch />
        </div>
        <div className="adminSection">
          <ActionsList />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
