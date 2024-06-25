import React, { useState, useEffect } from 'react'
import UserMenu from '../../components/Layouts/UserMenu'
import Layout from '../../components/Layouts/Layout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import { useNavigate } from 'react-router-dom'
import styles from '../Auth/Register.module.css'
const Profile = () => {
    // context
    const { user, state, dispatch } = useAuthContext()
    const navigate = useNavigate()



    //state 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const { updateProfile, isLoading, error } = useUpdateProfile()


    // get user data
    useEffect(() => {
        const { name, email, phone, address } = user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [user])


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()

        await updateProfile(name, email, password, phone, address)
    }


    return (
        <Layout title={'your profile'}>
            <div className="container-fluid p-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 ">
                        <div className={styles.form_container}>
                            <div className={styles.form}>
                                <h1>Update Profile</h1>
                                <form onSubmit={handleSubmit}>


                                    <input
                                        type="name"
                                        onChange={(e) => setName(e.target.value)}
                                        id="name"
                                        value={name}
                                        className={styles.input}
                                        autoComplete="off"
                                        placeholder="Name here.."
                                    />
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        value={email}
                                        className={styles.input}
                                        autoComplete="off"
                                        placeholder="Email here..."
                                    />


                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}

                                        value={password}
                                        id="password"
                                        autoComplete="off"
                                        className={styles.input}
                                        placeholder="password here.."
                                    />
                                    <div className={styles.double}>
                                        <input
                                            type="number"
                                            onChange={(e) => setPhone(e.target.value)}

                                            value={phone}
                                            id="phone"
                                            autoComplete="off"
                                            className={styles.input}
                                            placeholder="Phone..."
                                        />
                                        <input
                                            type="text"
                                            onChange={(e) => setAddress(e.target.value)}

                                            value={address}
                                            id="address"
                                            autoComplete="off"
                                            className={styles.input}
                                            placeholder="address here.."

                                        />
                                    </div>

                                    <button disabled={isLoading} type="submit" className={styles.Btn}>Submit</button>

                                    {error && <div className="error">{error}</div>}

                                </form>
                                <p>go back? <a href="/">home</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
