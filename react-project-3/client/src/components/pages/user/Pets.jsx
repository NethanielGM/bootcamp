import React, { useContext, useEffect, useState } from 'react'


import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';

import { PetContext } from '../../../context/PetContext'

import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

import { MdSubject } from 'react-icons/md';

const Pets = () => {

    // PET CONTEXT
    const { getUserSavedPets, getAdoptedPet, savedPetData, loading, deletePetById, adoptedPetData, returnPet } = useContext(PetContext)

    // STATES
    const [toggleButton, setToggleButton] = useState(false);

    // REMOVE
    const handleRemove = (petId) => {
        deletePetById(petId)
    }

    // RETURN
    const handleReturn = (petId) => {
        returnPet(petId)
    }

    // GET SAVED
    useEffect(() => {
        getUserSavedPets()
        return () => getUserSavedPets()
    }, [])

    // GET ADOPTED
    useEffect(() => {
        getAdoptedPet()
        return () => getAdoptedPet()
    }, [])

    return (
        <div className='app'>
            {savedPetData.length > 0 || adoptedPetData.length > 0 ?
                <>
                    <h1 className="text-center mb-4 mt-5 titles">{toggleButton ? 'My pets' : 'Saved pets'}</h1>
                    <div className='mt-5 mb-5'>
                        {toggleButton ? <Button
                            className="mb-2 mt-4"
                            color='secondary'
                            variant="contained"
                            endIcon={<AddBoxSharpIcon />}
                            onClick={() => setToggleButton(!toggleButton)}
                        >
                            Show Saved Pets
                        </Button>
                            :
                            <Button
                                className="mb-2 mt-4"
                                color='primary'
                                variant="contained"
                                endIcon={<AddBoxSharpIcon />}
                                onClick={() => setToggleButton(!toggleButton)}
                            >
                                Show My Pets
                            </Button>}
                    </div>
                    {toggleButton ?
                        <>
                            {adoptedPetData.map((pet) => (
                                <Card style={{ margin: '0px auto' }} className="mt-3 mb-5" sx={{ width: 650 }} key={pet.petId}>
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
                                        <Typography variant="body2" color="text.secondary">Type: {pet.type}</Typography>
                                        <Typography variant="body2" color="text.secondary">Status: {pet.status}</Typography>
                                        <Typography variant="body2" color="text.secondary">Height: {pet.height}</Typography>
                                        <Typography variant="body2" color="text.secondary">Weight: {pet.weight}</Typography>
                                        <Typography variant="body2" color="text.secondary">Color: {pet.color}</Typography>
                                        <Typography variant="body2" color="text.secondary">Description: {pet.bio}</Typography>
                                        <Typography variant="body2" color="text.secondary">Breed: {pet.breed}</Typography>
                                        <Typography variant="body2" color="text.secondary">Dietery Restrictions: {pet.dietery_restrictions}</Typography>
                                        <Typography variant="body2" color="text.secondary">Hypoallergenic: {pet.hypoallergenic}</Typography>
                                        <Typography variant="body2" color="text.secondary">Posted At: {pet.createdAt}</Typography>
                                    </CardContent>
                                    <Button
                                        className='mb-3 mt-3'
                                        disabled={loading}
                                        onClick={() => handleReturn(pet.petId)}
                                        variant="outlined"
                                        endIcon={<MdSubject />}
                                        color="secondary"
                                    >Return</Button>
                                </Card>

                            ))}
                        </>
                        :
                        <>
                            {savedPetData.map((pet) => (
                                <Card style={{ margin: '0px auto' }} className="mt-3 mb-5" sx={{ width: 650 }} key={pet.petId}>
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
                                        <Typography variant="body2" color="text.secondary">Type: {pet.type}</Typography>
                                        <Typography variant="body2" color="text.secondary">Status: {pet.status}</Typography>
                                        <Typography variant="body2" color="text.secondary">Height: {pet.height}</Typography>
                                        <Typography variant="body2" color="text.secondary">Weight: {pet.weight}</Typography>
                                        <Typography variant="body2" color="text.secondary">Color: {pet.color}</Typography>
                                        <Typography variant="body2" color="text.secondary">Description: {pet.bio}</Typography>
                                        <Typography variant="body2" color="text.secondary">Breed: {pet.breed}</Typography>
                                        <Typography variant="body2" color="text.secondary">Dietery Restrictions: {pet.dietery_restrictions}</Typography>
                                        <Typography variant="body2" color="text.secondary">Hypoallergenic: {pet.hypoallergenic}</Typography>
                                        <Typography variant="body2" color="text.secondary">Posted At: {pet.createdAt}</Typography>
                                    </CardContent>
                                    <Button
                                        className='mb-3 mt-3'
                                        disabled={loading}
                                        onClick={() => handleRemove(pet.petId)}
                                        variant="outlined"
                                        endIcon={<MdSubject />}
                                        color="secondary"
                                    >Remove</Button>
                                </Card>

                            ))}
                        </>
                    }

                </>
                :
                <div className='mt-5'>
                    <h1 className="text-center mt-5 titles">you currently do not own or foster any pets.</h1>
                </div>
            }

        </div>
    )
}
export default Pets
