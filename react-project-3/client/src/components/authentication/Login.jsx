import React, { useContext, useState } from 'react'

import { Form } from 'react-bootstrap'

import { Button, TextField } from '@mui/material';

import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';

import { AuthContext } from '../../context/AuthContext'

const Login = () => {

    // AUTH CONTEXT
    const { loading, login } = useContext(AuthContext)

    // LOGIN STATES
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // LOGIN HANDLER
    const handleSubmit = () => {
        login({ email, password })
    }
    return (
        <div className="app">
            <h1 className="text-center mb-4 mt-5 "> Log In</h1>
            <Form style={{ width: '90%', margin: '0px auto' }}>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    className="input mt-2 mb-2"
                    type="email"
                    variant="outlined"
                    color="primary"
                    label="Email"
                    fullWidth
                    required
                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className="input mt-2 mb-2"
                    type="password"
                    variant="outlined"
                    color="primary"
                    label="Password"
                    fullWidth
                    required
                />
                <Button
                    className="w-100 mt-4 mb-5 btn-custom"
                    disabled={loading}
                    onClick={handleSubmit}
                    variant="contained"
                    endIcon={<LockOpenSharpIcon />}
                    color="primary"
                >
                    Log In
                </Button>
            </Form>
        </div>
    )
}
export default Login
