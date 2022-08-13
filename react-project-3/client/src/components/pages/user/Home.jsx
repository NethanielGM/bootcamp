
import React, { useContext } from 'react'

import { Modal } from 'react-bootstrap'

import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { BottomNavigationAction, Box, Container, Button, Fab } from '@mui/material';

import { AuthContext } from '../../../context/AuthContext'
import Login from '../../../components/authentication/Login'
import SignUp from '../../../components/authentication/SignUp'


const Home = () => {

    // PET CONTEXT
    const { showLogin, showSignUp, loginClose, handleLogin, signUpClose, handleSignUp, } = useContext(AuthContext)

    // AUTH CONTEXT
    const { user } = useContext(AuthContext)

    return (
        <div className='app mt-5'>
            <Container maxWidth="sm">
                {user ? (
                    <>
                        <h1 className="mt-5 titles">{user.role == "admin" ? `${user.role} logged in,` : `Hi`} {user.firstName} {user.lastName}</h1>
                    </>
                ) : (
                    <>
                        <h1 className="mt-5 titles">Welcome to petFinder</h1>
                        <h2 className='mt-5'>Our services provide you with an easy solution to adopt or find pets that need a loving and caring home.</h2>
                        <Modal show={showLogin} onHide={loginClose}>
                            <Login />
                        </Modal>
                        <Modal show={showSignUp} onHide={signUpClose}>
                            <SignUp />
                        </Modal>
                        <div className='footer'>
                            <h2 className="mb-3">Join us.</h2>
                            <Box>
                                <Fab variant="extended" size="large" color="secondary" aria-label="add" >
                                    <Button onClick={handleLogin} className='color-btn' variant="text" endIcon={< VpnKeyIcon />}>
                                        Login
                                    </Button>
                                </Fab>
                                <Fab variant="extended" size="large" color="secondary" aria-label="add" >
                                    <Button onClick={handleSignUp} className='color-btn' variant="text" endIcon={<LockOpenIcon />}>
                                        Sign Up
                                    </Button>
                                </Fab>
                            </Box>
                        </div>
                    </>
                )}


            </Container>

        </div >

    )
}

export default Home