import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h3 className='text-center'>   
                   All Right Reserved &copy; kpArt19
                   </h3>
        <p className='text text-center mt-3'>
          <Link to='/about'>About</Link>
          |  
          <Link to='/contact'>Contanct</Link>
          |
          <Link to='/policy'>Privacy Policy</Link>
        </p>
    </div>
  )
}

export default Footer
