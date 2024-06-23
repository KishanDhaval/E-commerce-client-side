import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { useAuthContext } from '../../hooks/useAuthContext'

const AdminDashboard = () => {
  const {user }=useAuthContext() 
  return (
    <Layout title={'Dashboard - Admin'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h1>Admin Name : {user.name}</h1>
            <h1>Admin Email : {user.email}</h1>
            <h1>Admin Contact : {user.phone}</h1>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
