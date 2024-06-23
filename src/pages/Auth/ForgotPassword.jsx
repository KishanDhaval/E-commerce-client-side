import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useForgotPassword } from '../../hooks/useForgotPassword'

const ForgotPassword = () => {
  
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')
    const { login} = useForgotPassword()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, newPassword , answer)
    }
  return (
    <Layout title={'forgot password- Eccomerce app'}>
           <div className="register">
                <h1>Reset password</h1>
                <form onSubmit={handleSubmit}>


                    <div className="mb-3">
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='email'
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='what is your favaroit sports'
                            className="form-control"
                            id="answer"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='New password'
                            className="form-control"
                            id="newPassword"
                            required
                        />
                    </div>

                    
                    <button type="submit" className="btn btn-primary">reset</button>


                </form>
            </div>
    </Layout>
  )
}

export default ForgotPassword
