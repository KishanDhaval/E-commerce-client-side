import React , {useState , useEffect} from 'react'
import UserMenu from '../../components/Layouts/UserMenu'
import Layout from '../../components/Layouts/Layout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
// context
  const {user , state , dispatch} = useAuthContext()
  const navigate = useNavigate()



  //state 
  const [name , setName] =useState('')
  const [email , setEmail] =useState('')
  const [password , setPassword] =useState('')
  const [phone , setPhone] =useState('')
  const [address , setAddress] =useState('')
 
  const {updateProfile ,isLoading , error} = useUpdateProfile()


  // get user data
  useEffect(()=>{
    const {name , email , phone, address} = user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[user])


  // form function
  const handleSubmit =async(e)=>{
      e.preventDefault()

      await updateProfile(name , email , password , phone , address)
  }


  return (
    <Layout title={'your profile'}>
    <div className="container-fluid p3 m3">
    <div className="row">
      <div className="col-md-3">
      <UserMenu/>
      </div>
    
      <div className="col-md-9">
      <div className="register">
                <h1>Update Profile</h1>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            placeholder='Name'
                            className="form-control"
                            id="name"
                            aria-describedby="emailHelp"
                            
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email"
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                            placeholder='email'
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            
                            disabled
                        />
                    </div>
                   
                    <div className="mb-3">
                        <input type="password"
                             value={password}
                             onChange={(e)=>setPassword(e.target.value)}
                            placeholder='password'
                            className="form-control"
                            id="password"
                            
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                             value={phone}
                             onChange={(e)=>setPhone(e.target.value)}
                            placeholder='phone'
                            className="form-control"
                            id="phone"
                            aria-describedby="emailHelp"
                            
                        />
                    </div>
                    <div className="mb-3">
                        <textarea type="text"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            placeholder='address'
                            className="form-control"
                            id="address"
                            aria-describedby="emailHelp"
                            
                        />
                    </div>
                   
                    <button disabled={isLoading} type="submit" className="btn btn-primary">Update</button>
                    {error && <div className="error">{error}</div>}

                </form>
            </div>
      </div>
      </div>
    </div>
  </Layout>
  )
}

export default Profile
