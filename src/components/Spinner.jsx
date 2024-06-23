import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState , useEffect } from 'react'



const Spinner = () => {


  const [count , setCount] = useState(5)
  const navigate = useNavigate()


  // useEffect(()=>{
  //   location.state = location.pathname
  //   const interval = setInterval(()=>{
  //     setCount((preValue) => --preValue)
  //   },1000)
  //   count === 0 && navigate('/login', {
  //     state : location.pathname
  //   })
  //   return ()=> clearInterval(interval)
  // },[count , navigate , location])

  return (
    <>
      <div style={{height:'100vh'}} className="d-flex flex-column align-items-center  justify-content-center">
          <h1 className='Text-center'>redirecting to you in {count} second</h1>
          <div className="spinner-border" role="status">
          <span  className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  )
}

export default Spinner
