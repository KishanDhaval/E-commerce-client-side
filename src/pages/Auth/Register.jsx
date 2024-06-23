import React, { useState } from 'react'
import Layout from './../../components/Layouts/Layout'
import { useRegister } from '../../hooks/useRegister'
import styles from './Register.module.css'
const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')

    const { register, isLoading, error } = useRegister()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(name, email, password, phone, address, answer)
    }

    return (
        <Layout title={'register e-commerce app'}>
             <div className={styles.form_container}>
                <div className={styles.form}>
                    <h1>Signup</h1>
                    <form onSubmit={handleSubmit}>
              

                    <input
                        type="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        id="name"
                        value={name}
                        className={styles.input}
                        autoComplete="off"
                        placeholder="Name here.."
                    />
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="email"
                        value={email}
                        className={styles.input}
                        autoComplete="off"
                        placeholder="Email here..."
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
                        <div className={styles.double}>
                            <input
                                type="number"
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                value={phone}
                                id="phone"
                                autoComplete="off"
                                className={styles.input}
                                placeholder="Phone..."
                            />
                            <input
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                value={address}
                                id="address"
                                autoComplete="off"
                                className={styles.input}
                                placeholder="address here.."

                            />
                        </div>
                         <input
                            type="text"
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            value={answer}
                            id="answer"
                            autoComplete="off"
                            className={styles.input}
                            placeholder="What is you favourait sports?"
                        />


                        <button disabled={isLoading} type="submit" className={styles.Btn}>Submit</button>
  
                    {error && <div className="error">{error}</div>}

                </form>
                <p>Already registered? <a href="/login">Login</a></p>
            </div>
            </div>
        </Layout>
    )
}

export default Register
