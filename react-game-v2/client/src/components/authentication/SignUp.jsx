import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

axios.defaults.withCredentials = true

const Signup = () => {
    const { loading, user, register } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [nickname, setNickname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            nickname,
            email,
            password,
            passwordConfirm,
            firstName,
            lastName,
        }
        register(newUser)
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate('/')
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="app">
            {!user && (
                <>
                    <h1 className="text-center mb-4 mt-5 ">Sign up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="n_name">
                            <Form.Label>Nick Name</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                        </Form.Group>
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
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                className="input"
                                type="password"
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group id="f_name">
                            <Form.Label>First Name (optional)</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group id="l_name">
                            <Form.Label>Last Name (optional)</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            className="w-100 mt-4 mb-5 btn-custom"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2 mb-5">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </>
            )}
        </div>
    )
}
export default Signup
