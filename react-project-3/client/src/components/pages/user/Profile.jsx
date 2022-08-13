import React, { useContext, useState } from 'react'

import { Form } from 'react-bootstrap'

import { MdSaveAlt } from 'react-icons/md'

import { Button, TextField } from '@mui/material';

import { AuthContext } from '../../../context/AuthContext'

const Profile = () => {

    // PET CONTEXT
    const { loading, user, update } = useContext(AuthContext)

    //EDIT PROFILE STATE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setPasswordConfirm] = useState('')
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')

    //EDIT PROFILE HANDLER
    const handleSubmit = () => {
        const newUser = {
            userId: user.id,
            phone: phone ? phone : user.phone,
            email: email ? email : user.email,
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            bio: bio ? bio : "",
        }
        if (password) {
            newUser.password = password
            newUser.re_password = re_password
        }
        update(newUser)

    }
    return (
        <div className='app mt-5'>
            <h1 className="text-center mb-4 mt-5 titles">Edit profile</h1>
            <Form >
                <TextField
                    onChange={(e) => setPhone(e.target.value)}
                    className="input mt-2 mb-2"
                    variant="filled"
                    color="secondary"
                    label="Phone"
                    fullWidth
                    defaultValue={user.phone}
                />
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    className="input mt-2 mb-2"
                    type="email"
                    variant="filled"
                    color="secondary"
                    label="Email"
                    fullWidth
                    defaultValue={user.email}

                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className="input mt-2 mb-2"
                    type="password"
                    variant="filled"
                    color="secondary"
                    label="Password"
                    fullWidth

                />
                <TextField
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="input mt-2 mb-2"
                    type="password"
                    variant="filled"
                    color="secondary"
                    label="Confirm Password"
                    fullWidth
                />
                <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input mt-2 mb-2"
                    type="text"
                    variant="filled"
                    color="secondary"
                    label="First Name"
                    fullWidth
                    defaultValue={user.firstName}

                />
                <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    className="input mt-2 mb-2"
                    type="text"
                    variant="filled"
                    color="secondary"
                    label="Last Name"
                    fullWidth
                    defaultValue={user.lastName}

                />
                <TextField
                    onChange={(e) => setBio(e.target.value)}
                    className="input mt-2 mb-2"
                    type="textarea"
                    variant="filled"
                    color="secondary"
                    label="Bio"
                    fullWidth
                    defaultValue={user.bio}

                />
                <Button
                    className="w-100 mt-4 mb-5"
                    disabled={loading}
                    onClick={handleSubmit}
                    variant="contained"
                    endIcon={<MdSaveAlt />}
                    color="secondary"
                >
                    Save
                </Button>
            </Form>

        </div>
    )
}
export default Profile
