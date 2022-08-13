
import React, { useContext, useState } from 'react'

import { Alert, Form } from 'react-bootstrap'

import { MdSaveAlt } from 'react-icons/md'

import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { FormControlLabel, RadioGroup, Radio, Button, Stack, TextField } from '@mui/material';

import { PetContext } from '../../../context/PetContext'

const AddPet = () => {

    // PET CONTEXT
    const { addPet, loading } = useContext(PetContext)

    // ADD PET STATES
    const [type, setType] = useState('') // dog / cat
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [pictureName, setPictureName] = useState('')
    const [picture, setPicture] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [color, setColor] = useState('')
    const [bio, setBio] = useState('')
    const [hypoallergenic, setHypoallergenic] = useState('') // yes / no
    const [dietary, setDietary] = useState('')
    const [breed, setBreed] = useState('')

    // IMAGE DATA URL
    const setImageUrl = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPictureName(file.name);
            setPicture(reader.result);
        };
    }

    // ADD PET HANDLER
    const handleSubmit = async () => {
        const newPet = {
            type,
            name,
            status,
            picture,
            height,
            weight,
            color,
            bio,
            hypoallergenic,
            dietary,
            breed
        }
        const res = await addPet(newPet)
        if (res) {
            alert('pet added to database')
            window.location.reload(false);
        }
    }
    return (
        <div className="app mt-5">
            <h1 className="text-center mt-5 titles">Add pet</h1>
            <Form className='mt-3'>
                <Stack component="form" spacing={2}>
                    <Alert variant="" className='mt-2'>
                        <Alert.Heading>{<RadioGroup
                            row
                        >
                            <FormControlLabel
                                value="dog" control={<Radio color="secondary" />} label="Dog" onChange={e => setType(e.target.value)} />
                            <FormControlLabel value="cat" control={<Radio color="secondary" />} label="Cat" onChange={e => setType(e.target.value)} />
                        </RadioGroup>}</Alert.Heading>
                    </Alert>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Name"
                        fullWidth
                        required
                    />

                    <TextField
                        onChange={(e) => setStatus(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Status"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={(e) => setHeight(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Height"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={(e) => setWeight(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Weight"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={(e) => setColor(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Color"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={(e) => setBio(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Bio"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={(e) => setDietary(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Dietary restricions"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={(e) => setBreed(e.target.value)}
                        type="text"
                        variant="filled"
                        color="secondary"
                        label="Breed"
                        fullWidth
                        required
                    />
                    <Alert variant="" className='mt-2'>

                        <Alert.Heading>{
                            < RadioGroup
                                row
                            >
                                <FormControlLabel
                                    value="yes" control={<Radio color="secondary" />} label="Hypoallergenic" onChange={e => setHypoallergenic(e.target.value)} />
                                <FormControlLabel value="no" control={<Radio color="secondary" />} label="Not Hypoallergenic" onChange={e => setHypoallergenic(e.target.value)} />
                            </RadioGroup>}</Alert.Heading>
                    </Alert>
                    <Button
                        className="w-100 mt-4  btn-custom"
                        disabled={loading}
                        variant="outlined"
                        component="label"
                        color="secondary"
                        size="large"
                        endIcon={<PhotoCamera />}
                    >
                        Upload photo
                        <input
                            fontSize="inherit"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            onChange={(e) => setImageUrl(e.target.files[0])}
                        />
                    </Button>
                    {picture &&
                        <Alert variant="">
                            <Alert.Heading className='mt-3'>{pictureName}</Alert.Heading>
                        </Alert>
                    }
                </Stack>

                <Button
                    className="w-100 mt-4 mb-5 btn-custom"
                    disabled={loading}
                    onClick={handleSubmit}
                    variant="contained"
                    endIcon={<MdSaveAlt />}
                    color="secondary"
                >
                    Add
                </Button>
            </Form>
        </div >
    )
}
export default AddPet

