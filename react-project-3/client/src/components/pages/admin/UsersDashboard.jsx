import React, { useContext, useEffect, useState } from 'react'

import { MdSubject } from 'react-icons/md';

import { Card, CardContent, Typography, Button } from '@mui/material';

import { AuthContext } from '../../../context/AuthContext';

const Dashboard = () => {
    // AUTH CONTEXT
    const { loading, assignRole, usersData, getAllUsers, getUserById, userById, getFullUserById, userPets } = useContext(AuthContext)

    // STATES
    const [userId, setUserId] = useState('')

    // GET USERS HANDLER
    useEffect(() => {
        getAllUsers()
        return () => getAllUsers()
    }, [])

    // GET USER BY ID HANDLER
    useEffect(() => {
        if (userId) {
            getFullUserById(userId)
        }
    }, [userId])

    // ASSIGN ROLE
    const toggleAdmin = () => {
        const newRole = {
            userId: userId,
        }
        if (!userById.role) {
            newRole.role = 'admin'
        }
        if (userById.role == 'admin') {
            newRole.role = null
        }
        assignRole(newRole)
    }
    if (userId) {
        userPets.map((pet) => {
            console.log('USERS PETS', pet);
        })
        return (

            < div
                className='app mt-5' >
                <h1 className="text-center mb-4 titles">Users</h1>

                < Card
                    style={{ margin: '0px auto' }}
                    className="mt-5 mb-5"
                    sx={{ width: 650 }}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{userById.firstName} {userById.lastName}</Typography>
                        <Typography variant="body2" color="text.secondary">Email: {userById.email}</Typography>
                        <Typography variant="body2" color="text.secondary">Phone: {userById.phone}</Typography>
                        <Typography variant="body2" color="text.secondary">Bio: {userById.bio ? userById.bio : ' No bio'}</Typography>
                        <Typography variant="body2" color="text.secondary">Role: {userById.role ? userById.role : ' User'}</Typography>
                        <Typography variant="body2" color="text.secondary">Created Date: {userById.createdAt}</Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary">Pets:</Typography>

                    </CardContent>
                    <Button
                        onClick={() => toggleAdmin()}
                        className='mb-3 mt-3'
                        disabled={loading}
                        variant="outlined"
                        endIcon={<MdSubject />}
                        color="secondary"
                    >{userById.role === 'admin' ? 'Make user' : 'Make admin'}</Button>
                    <Button
                        onClick={() => setUserId('')}
                        className='mb-3 mt-3'
                        disabled={loading}
                        variant="outlined"
                        endIcon={<MdSubject />}
                        color="secondary"
                    >Close</Button>
                </Card>
            </div >
        )
    }
    return (

        < form
            className='app' >
            <h1 className="text-center mb-4 mt-5 titles">Users</h1>
            {
                usersData.map((user) => (
                    < Card
                        style={{ margin: '0px auto' }}
                        className="mt-3 mb-5"
                        sx={{ width: 650 }}
                        key={user.id}
                    >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">{user.firstName} {user.lastName}</Typography>
                            <Typography variant="body2" color="text.secondary">Email: {user.email}</Typography>
                            <Typography variant="body2" color="text.secondary">Phone: {user.phone}</Typography>
                        </CardContent>
                        <Button
                            onClick={() => setUserId(user.id)}
                            className='mb-3 mt-3'
                            disabled={loading}
                            variant="outlined"
                            endIcon={<MdSubject />}
                            color="secondary"
                        >Info</Button>
                    </Card>
                ))
            }
        </form >
    )
}
export default Dashboard
