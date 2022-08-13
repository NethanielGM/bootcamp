import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { MdSubject } from 'react-icons/md';

import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

import { PetContext } from '../../context/PetContext';
import { AuthContext } from '../../context/AuthContext';


const PetInfo = () => {

    // PET CONTEXT
    const { loading, basicResult, advancedResult, savePetById, savedPetData, deletePetById, adoptPet, returnPet } = useContext(PetContext)
    const { user } = useContext(AuthContext)

    // STATES
    const { id } = useParams();
    const [isPetAlreadySaved, setPetAlreadySaved] = useState(savedPetData.filter(pet => pet.petId === id).length > 0)

    const navigate = useNavigate()

    // SAVE
    const handleSave = (petId) => {
        savePetById(petId)
        setPetAlreadySaved(true)
    }

    // DELETE
    const handleRemove = (petId) => {
        deletePetById(petId)
        setPetAlreadySaved(false)
    }

    // ADOPT
    const handleAdopt = (petId) => {
        adoptPet(petId)
        navigate('/pets')
    }

    // RETURN
    const handleReturn = (petId) => {
        returnPet(petId)
        navigate('/search')

    }

    const isMyPet = (pet) => {
        return pet.userId === user.id
    }

    const isPetAdopted = (pet) => {
        return pet.userId !== 'b1163fcf-697d-4cff-9eed-56043682d116'  //FIX THIS, NEEDS TO BE NULL
    }

    if (basicResult.length) {
        return (
            <div className="app">
                {basicResult.filter(filterPet => filterPet.petId === id).map(((pet) =>
                    < Card style={{ margin: '0px auto' }} className="mt-5 mb-5" key={pet.petId} >
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
                            onClick={() => isPetAlreadySaved ? handleRemove(pet.petId) : handleSave(pet.petId)}
                            variant="outlined"
                            endIcon={<MdSubject />}
                            color="secondary"
                        >{isPetAlreadySaved ? 'Remove' : 'Save'}</Button>
                        {isMyPet(pet) &&
                            <Button
                                className='mb-3 mt-3'
                                disabled={loading}
                                onClick={() => handleReturn(pet.petId)}
                                variant="outlined"
                                endIcon={<MdSubject />}
                                color="secondary">Return</Button>
                        }
                        {!isMyPet(pet) && !isPetAdopted(pet) &&
                            <Button
                                className='mb-3 mt-3'
                                disabled={loading}
                                onClick={() => handleAdopt(pet.petId)}
                                variant="outlined"
                                endIcon={<MdSubject />}
                                color="secondary">Adopt</Button>
                        }
                        <Button
                            className='mb-3 mt-3'
                            disabled={loading}
                            onClick={() => navigate('/search')}
                            variant="outlined"
                            endIcon={<MdSubject />}
                            color="secondary"
                        >Back</Button>
                    </Card >
                ))}
            </div>

        )
    }
    if (advancedResult.length) {

        return (
            <div className="app">
                {advancedResult.filter(filterPet => filterPet.petId === id).map(((pet) =>
                    <Card style={{ margin: '0px auto' }} className="mt-5 mb-5" key={id}>
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
                            variant="outlined"
                            onClick={() => isPetAlreadySaved ? handleRemove(pet.petId) : handleSave(pet.petId)}
                            endIcon={<MdSubject />}
                            color="secondary"
                        >{isPetAlreadySaved ? 'Remove' : 'Save'}</Button>

                        {isMyPet(pet) &&
                            <Button
                                className='mb-3 mt-3'
                                disabled={loading}
                                onClick={() => handleReturn(pet.petId)}
                                variant="outlined"
                                endIcon={<MdSubject />}
                                color="secondary">Return</Button>
                        }
                        {!isMyPet(pet) && !isPetAdopted(pet) &&
                            <Button
                                className='mb-3 mt-3'
                                disabled={loading}
                                onClick={() => handleAdopt(pet.petId)}
                                variant="outlined"
                                endIcon={<MdSubject />}
                                color="secondary">Adopt</Button>
                        }
                        <Button
                            className='mb-3 mt-3'
                            disabled={loading}
                            onClick={() => navigate('/search')}
                            variant="outlined"
                            endIcon={<MdSubject />}
                            color="secondary"
                        >Back</Button>
                    </Card>
                ))}
            </div>
        )
    }
}
export default PetInfo





