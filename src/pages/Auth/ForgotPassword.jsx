import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useForgotPassword } from '../../hooks/useForgotPassword'
import styles from './Register.module.css'

const ForgotPassword = () => {
  
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')
    const { resetPass} = useForgotPassword()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await resetPass(email, newPassword , answer)
    }
  return (
    <Layout title={'forgot password- Eccomerce app'}>
          <div className={styles.form_container}>
          <div className={styles.form}>
                <h1>Reset password</h1>
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
                         type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='what is your favaroit sports'
                            className={styles.input}
                            id="answer"
                            aria-describedby="emailHelp"
                            required
                        />
                  
                        <input
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            value={newPassword}
                            id="newPassword"
                            autoComplete="off"
                            className={styles.input}
                            placeholder="new password here.."
                        />
                            <button type="submit" className={styles.Btn}>Update</button>
                    </form>
                    <p>already Remember? <a href="/login">login</a></p>
                    </div>
            </div>
    </Layout>
  )
}

export default ForgotPassword
