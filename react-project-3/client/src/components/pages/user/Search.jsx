import React, { useContext, useState } from 'react'

import { MdSubject } from 'react-icons/md';

import { Form, Modal } from 'react-bootstrap'

import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import IndeterminateCheckBoxSharpIcon from '@mui/icons-material/IndeterminateCheckBoxSharp';

import { CardContent, CardMedia, Card, Typography, TextField, Button } from '@mui/material';

import { AuthContext } from '../../../context/AuthContext';
import { PetContext } from '../../../context/PetContext'

import Login from '../../../components/authentication/Login'
import SignUp from '../../../components/authentication/SignUp'

import { useNavigate } from 'react-router-dom'


const Search = () => {

    // PET CONTEXT
    const { loading, basicSearch, basicResult, advancedResult, advancedSearch } = useContext(PetContext)

    // AUTH CONTEXT
    const { user, showLogin, showSignUp, loginClose, signUpClose } = useContext(AuthContext)

    const navigate = useNavigate()

    // STATES
    // Advanced Search Toggler
    const [advs, setAdvs] = useState(false);
    // Basic Inputs
    const [TypeInput, setTypeInput] = useState('');
    // Advanced Inputs
    const [nameInput, setNameInput] = useState('');
    const [heightInput, setHeightInput] = useState('');
    const [weightInput, setWeightInput] = useState('');
    const [statusInput, setStatusInput] = useState('');
    const [resultMessage, setResultMessage] = useState('')
    // HANDLERS
    // Basic
    const handleBasicSearch = () => {
        basicSearch({ type: TypeInput })
        setTypeInput('')
    }
    // Advanced
    const handleAdvSearch = () => {
        advancedSearch({
            type: TypeInput,
            name: nameInput,
            height: heightInput,
            weight: weightInput,
            status: statusInput,
        })
        setTypeInput('')
        setNameInput('')
        setHeightInput('')
        setWeightInput('')
        setStatusInput('')
    }
    // Info
    const handleInfo = (petId) => {
        navigate(`/info/${petId}`)
    }

    return (
        <div className="app mt-5">
            {!advs ?
                <Form>
                    <h1 className='mt-5 titles'>Basic Search</h1>
                    <Button
                        disabled={loading}
                        className="mb-2 mt-4"
                        color='primary'
                        onClick={() => setAdvs(!advs)}
                        variant="contained"
                        endIcon={<AddBoxSharpIcon />}
                    >
                        Advanced
                    </Button>
                    <TextField
                        className="input mt-4 mb-4"
                        fullWidth label="Search Type"
                        onChange={(e) => setTypeInput(e.target.value)}
                        variant="filled"
                        color="primary"
                    />
                    <Button
                        className="w-100"
                        disabled={loading}
                        onClick={handleBasicSearch}
                        variant="contained"
                        endIcon={<ManageSearchSharpIcon />}
                        color="primary">
                        Search
                    </Button>
                    {
                        basicResult && basicResult.map((pet) => (
                            <Card style={{ margin: '0px auto' }} className="mt-5 mb-5" key={pet.petId}>
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
                                {
                                    user && <Button
                                        className='mb-3 mt-3'
                                        disabled={loading}
                                        onClick={() => handleInfo(pet.petId)}
                                        variant="outlined"
                                        endIcon={<MdSubject />}
                                        color="secondary"
                                    >Info</Button>
                                }
                            </Card>
                        ))
                    }
                </Form>
                : <Form >
                    <h1 className='mt-5 titles'>Advanced Search</h1>
                    <Button
                        disabled={loading}
                        className="mb-2 mt-4"
                        color='secondary'
                        onClick={() => setAdvs(!advs)}
                        variant="contained"
                        endIcon={<IndeterminateCheckBoxSharpIcon />}
                    >
                        Basic
                    </Button>
                    <TextField
                        className="input mt-4 mb-2"
                        fullWidth label="Name"
                        onChange={(e) => setNameInput(e.target.value)}
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        className="input mt-2 mb-2"
                        fullWidth label="Adoption Status"
                        onChange={(e) => setStatusInput(e.target.value)}
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        className="input mt-2 mb-2"
                        fullWidth label="Height"
                        onChange={(e) => setHeightInput(e.target.value)}
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        className="input mt-2 mb-2"
                        fullWidth label="Weight"
                        onChange={(e) => setWeightInput(e.target.value)}
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        className="input mt-2 mb-4"
                        fullWidth label="Type"
                        onChange={(e) => setTypeInput(e.target.value)}
                        variant="filled"
                        color="secondary"
                    />
                    <Button
                        className="w-100 mb-5"
                        disabled={loading}
                        onClick={handleAdvSearch}
                        variant="contained"
                        endIcon={<ManageSearchSharpIcon />}
                        color="secondary"
                    >
                        Search
                    </Button>
                    {advancedSearch &&
                        advancedResult.map((pet) => (
                            <Card style={{ margin: '0px auto' }} className="mt-5 mb-5" key={pet.petId}>
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
                                {
                                    user && <Button
                                        className='mb-3 mt-3'
                                        disabled={loading}
                                        onClick={() => handleInfo(pet.petId)}
                                        variant="outlined"
                                        endIcon={<MdSubject />}
                                        color="secondary"
                                    >Info</Button>
                                }

                            </Card>
                        ))
                    }
                </Form>

            }
            {
                !user &&
                <>
                    <Modal show={showLogin} onHide={loginClose}>
                        <Login />
                    </Modal>
                    <Modal show={showSignUp} onHide={signUpClose}>
                        <SignUp />
                    </Modal>
                </>
            }

        </div >
    )
}
export default Search
