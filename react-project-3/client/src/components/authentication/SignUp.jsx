import React, { useContext, useState } from 'react'

import { Form } from 'react-bootstrap'

import { Button, TextField } from '@mui/material';

import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';

import { AuthContext } from '../../context/AuthContext'

const Signup = () => {

    // AUTH CONTEXT
    const { loading, register } = useContext(AuthContext)

    // REGISTER STATES
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // REGISTER HANDLER
    const handleSubmit = () => {
        const newUser = {
            phone,
            email,
            password,
            passwordConfirm,
            firstName,
            lastName,
        }
        register(newUser)
    }
    return (
        <div className="app">
            <h1 className="text-center mb-4 mt-5 ">Sign up</h1>
            <Form style={{ width: '90%', margin: '0px auto' }}>
                <TextField
                    onChange={(e) => setPhone(e.target.value)}
                    className="input mt-2 mb-2"
                    type="number"
                    variant="outlined"
                    color="secondary"
                    label="Phone"
                    fullWidth
                    required
                />
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    className="input mt-2 mb-2"
                    type="email"
                    variant="outlined"
                    color="secondary"
                    label="Email"
                    fullWidth
                    required
                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className="input mt-2 mb-2"
                    type="password"
                    variant="outlined"
                    color="secondary"
                    label="Password"
                    fullWidth
                    required
                />
                <TextField
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="input mt-2 mb-2"
                    type="password"
                    variant="outlined"
                    color="secondary"
                    label="Password"
                    fullWidth
                    required
                />
                <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input mt-2 mb-2"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="First Name"
                    fullWidth
                    required
                />
                <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    className="input mt-2 mb-2"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Last Name"
                    fullWidth
                    required
                />
                <Button
                    className="w-100 mt-4 mb-5 btn-custom"
                    disabled={loading}
                    onClick={handleSubmit}
                    variant="contained"
                    endIcon={<HowToRegSharpIcon />}
                    color="secondary"
                >
                    SignUp
                </Button>
            </Form>
        </div >
    )
}
export default Signup
