import React from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from '../../components/Layouts/UserMenu'
import { useAuthContext } from '../../hooks/useAuthContext'

const Dashboard = () => {

  const {user} = useAuthContext()

  return (
    <Layout title={'Dashboard - Ecommerce App'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
                  <h3>{user?.name}</h3>
                  <h3>{user?.email}</h3>
                  <h3>{user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
