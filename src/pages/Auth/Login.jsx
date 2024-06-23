import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useLogin } from '../../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, } = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <Layout title={'login e-commerce app'}>
            <div className={styles.form_container}>
                <div className={styles.form}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            value={email}
                            id="email"
                            className={styles.input}
                            autoComplete="off"
                            placeholder="email here.."
                        />
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            value={password}
                            id="password"
                            autoComplete="off"
                            className={styles.input}
                            placeholder="password here.."
                        />


                        <div className={styles.Btn_container}>
                            <button type="button" onClick={() => { navigate('/forgot-password') }} className={styles.Btn}>Forgot Password</button>
                            <button type="submit" className={styles.Btn}>Login</button>
                        </div>
                    </form>
                    <p>Not registered? <a href="/register">Register</a></p>
                </div>
            </div >

        </Layout >
    )
}

export default Login
