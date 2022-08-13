import React, { useContext, useEffect, useState } from 'react'

import { MdSubject } from 'react-icons/md';

import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { Card, CardContent, Typography, Button, CardMedia, TextField } from '@mui/material';

import { PetContext } from '../../../context/PetContext';

import { Form, Alert } from 'react-bootstrap'

import { MdSaveAlt } from 'react-icons/md'


const PetsDashboard = () => {

    // AUTH CONTEXT
    const { loading, allPetsData, getAllPets, getPetById, setSinglePetData, singlePetData, update } = useContext(PetContext)

    // EDIT PET STATES
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [pictureName, setPictureName] = useState('')
    const [picture, setPicture] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [color, setColor] = useState('')
    const [bio, setBio] = useState('')
    const [hypoallergenic, setHypoallergenic] = useState('')
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

    // EDIT PET HANDLER
    const handleEdit = () => {
        const newPet = {
            petId: singlePetData.petId,
            type: type ? type : singlePetData.type,
            name: name ? name : singlePetData.name,
            status: status ? status : singlePetData.status,
            height: height ? height : singlePetData.height,
            weight: weight ? weight : singlePetData.weight,
            color: color ? color : singlePetData.color,
            bio: bio ? bio : singlePetData.bio,
            hypoallergenic: hypoallergenic ? hypoallergenic : singlePetData.hypoallergenic,
            dietery_restrictions: dietary ? dietary : singlePetData.dietery_restrictions,
            breed: breed ? breed : singlePetData.breed,
            picture: picture ? picture : singlePetData.picture
        }
        update(newPet)
    }

    // GET PETS HANDLER
    useEffect(() => {
        getAllPets()
        return () => getAllPets()
    }, [])

    if (singlePetData.petId) {
        return (
            <div className='app' >
                <h1 className="text-center mb-4 mt-5 titles">Edit pet</h1>
                <Form >
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        className="input mt-2 mb-2"
                        variant="filled"
                        color="secondary"
                        label='Name'
                        fullWidth
                        defaultValue={singlePetData.name}

                    />
                    <TextField
                        onChange={(e) => setType(e.target.value)}
                        className="input mt-2 mb-2"
                        variant="filled"
                        color="secondary"
                        label='Type'
                        fullWidth
                        defaultValue={singlePetData.type}

                    />
                    <TextField
                        onChange={(e) => setStatus(e.target.value)}
                        className="input mt-2 mb-2"
                        variant="filled"
                        color="secondary"
                        label='Status'
                        fullWidth
                        defaultValue={singlePetData.status}

                    />
                    <TextField
                        onChange={(e) => setHeight(e.target.value)}
                        className="input mt-2 mb-2"
                        variant="filled"
                        color="secondary"
                        label='Height'
                        fullWidth
                        defaultValue={singlePetData.height}
                    />
                    <TextField
                        onChange={(e) => setWeight(e.target.value)}
                        className="input mt-2 mb-2"
                        type="text"
                        variant="filled"
                        color="secondary"
                        label='Weight'
                        fullWidth
                        defaultValue={singlePetData.weight}

                    />
                    <TextField
                        onChange={(e) => setColor(e.target.value)}
                        className="input mt-2 mb-2"
                        variant="filled"
                        color="secondary"
                        label='Color'
                        fullWidth
                        defaultValue={singlePetData.color}

                    />
                    <TextField
                        onChange={(e) => setBio(e.target.value)}
                        className="input mt-2 mb-2"
                        type="textarea"
                        variant="filled"
                        color="secondary"
                        label='Bio'
                        fullWidth
                        defaultValue={singlePetData.bio}

                    />
                    <TextField
                        onChange={(e) => setHypoallergenic(e.target.value)}
                        className="input mt-2 mb-2"
                        type="textarea"
                        variant="filled"
                        color="secondary"
                        label='Hypoallergenic'
                        fullWidth
                        defaultValue={singlePetData.hypoallergenic}

                    />
                    <TextField
                        onChange={(e) => setDietary(e.target.value)}
                        className="input mt-2 mb-2"
                        type="textarea"
                        variant="filled"
                        color="secondary"
                        label='Dietery Restrictions'
                        fullWidth
                        defaultValue={singlePetData.dietery_restrictions}

                    />
                    <TextField
                        onChange={(e) => setBreed(e.target.value)}
                        className="input mt-2 mb-2"
                        type="textarea"
                        variant="filled"
                        color="secondary"
                        label='Breed'
                        fullWidth
                        defaultValue={singlePetData.breed}

                    />
                    <Button
                        className="w-100 mt-4 mb-4  btn-custom"
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
                    <Button
                        disabled={loading}
                        onClick={handleEdit}
                        variant="contained"
                        endIcon={<MdSaveAlt />}
                        color="secondary"
                    >
                        Save
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => setSinglePetData(false)}
                        variant="contained"
                        endIcon={<MdSaveAlt />}
                        color="secondary"
                    >
                        Close
                    </Button>
                </Form>
            </div>
        )
    }
    return (
        <form
            className='app' >
            <h1 className="text-center mb-4 mt-5 titles">Pets</h1>
            {allPetsData.map((pet) => (
                <Card
                    style={{ margin: '0px auto' }}
                    className="mt-3 mb-5"
                    sx={{ width: 650 }}
                    key={pet.petId}
                >
                    <CardContent>
                        <CardMedia
                            component="img"
                            image={pet.picture}
                            sx={{
                                display: 'block',
                                width: '40%',
                                margin: '20px auto'
                            }} />
                        <Typography gutterBottom variant="h5" component="div">Name: {pet.name}</Typography>
                        <Typography variant="body2" color="text.secondary">Status: {pet.status}</Typography>
                    </CardContent>
                    <Button
                        onClick={() => getPetById(pet.petId)}
                        className='mb-3 mt-3'
                        disabled={loading}
                        variant="outlined"
                        endIcon={<MdSubject />}
                        color="secondary"
                    >Edit</Button>
                </Card>
            ))
            }
        </form >
    )

}
export default PetsDashboard

