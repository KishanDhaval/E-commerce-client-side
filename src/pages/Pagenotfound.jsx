import React from 'react'
import Layout from '../components/Layouts/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout title={'go back-Page not found!'}>
      <div className="pnf-container">
        <h1>404</h1>
        <p>Oops !  Page not found</p>
        <Link className='pnf-button' to="/">GO BACK</Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound
