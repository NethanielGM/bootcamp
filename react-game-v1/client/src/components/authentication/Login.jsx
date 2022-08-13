import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

axios.defaults.withCredentials = true
const Login = () => {
    const { user, loading, login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        login({ email, password })
    }

    useEffect(() => {
      if (user) navigate('/')
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <div className="app">
            {!user && (
                <>
                    <h1 className="text-center mb-4 mt-5 "> Log In</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="input"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className="input"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            className="w-100 mt-4 mb-5 btn-custom"
                            type="submit"
                        >
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2 mb-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </>
            )}
        </div>
    )
}
export default Login
