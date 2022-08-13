import { createContext, useContext, useEffect, useState, } from 'react'

import axios from 'axios'

import { api, AuthContext } from './AuthContext'

export const PetContext = createContext()

axios.defaults.withCredentials = true

export const PetProvider = (props) => {

    // PROPS
    const { children } = props

    // STATES
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [singlePetData, setSinglePetData] = useState([])
    const [savedPetData, setSavedPetData] = useState([])
    const [allPetsData, setallPetsData] = useState([])
    const [basicResult, setbasicResult] = useState([])
    const [advancedResult, setAdvancedResult] = useState([])
    const [adoptedPetData, setAdoptedPetData] = useState([])


    // AUTH CONTEXT
    const { user, axiosJWT } = useContext(AuthContext)

    // GET PETS
    const getAllPets = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${api}/pet`)
            setallPetsData(response.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // GET PET BY ID
    const getPetById = async (petId) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.get(`${api}/pet/${petId}`)
            setSinglePetData(response.data[0])
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // PATCH PET
    const update = async (newPet) => {
        if (loading) return
        setLoading(true)
        try {
            await axiosJWT.patch(`${api}/pet/edit`, newPet)
            alert("Changes saved")
            window.location.reload(false);
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // POST PET
    const addPet = async (newPet) => {
        setLoading(true)
        try {
            const res = await axiosJWT.post(`${api}/pet`, {
                userId: user.id, // can take user id from token
                type: newPet.type,
                name: newPet.name,
                status: newPet.status,
                picture: newPet.picture,
                height: newPet.height,
                weight: newPet.weight,
                color: newPet.color,
                bio: newPet.bio,
                hypoallergenic: newPet.hypoallergenic,
                dietery_restrictions: newPet.dietary,
                breed: newPet.breed,
            })
            setLoading(false)
            return res
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    // GET FAVORITES
    const getUserSavedPets = async () => {
        if (loading) return
        setLoading(true)
        const response = await axiosJWT.get(`${api}/favorite`)
        setSavedPetData(response.data);
        setLoading(false)
    }

    // POST FAVORITE
    const savePetById = async (petId) => {
        if (loading) return
        setLoading(true)
        const response = await axiosJWT.post(`${api}/pet/${petId}/save`)
        setLoading(false)
    }

    // DELETE FAVORITE
    const deletePetById = async (petId) => {
        if (loading) return
        setLoading(true)
        await axiosJWT.delete(`${api}/pet/${petId}/save`)
        getUserSavedPets()
        setLoading(false)
    }

    // BASIC SEARCH
    const basicSearch = async (query) => {
        if (loading) return
        setLoading(true)
        const response = await axios.post(`${api}/pet/search`, query)
        setbasicResult(response.data);
        setAdvancedResult([])
        setLoading(false)
    }

    // ADVANCED SEARCH
    const advancedSearch = async (query) => {
        if (loading) return
        setLoading(true)
        const response = await axios.post(`${api}/pet/search`, query)
        setAdvancedResult(response.data);
        setbasicResult([])
        setLoading(false)
    }

    // ADOPT
    const adoptPet = async (petId) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.post(`${api}/pet/${petId}/adopt`)
            setAdoptedPetData(response.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    // RETURN
    const returnPet = async (petId) => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.post(`${api}/pet/${petId}/return`)
            setAdoptedPetData(response.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    // GET ADOPTED
    const getAdoptedPet = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosJWT.get(`${api}/adopted`)
            setAdoptedPetData(response.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
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

    // ERROR HANDLER
    useEffect(() => {
        if (error) {
            if (error.response) {
                if (error.response.status === 401 || 403) {
                    console.warn(`Error ${error.response.status}: session expired`)
                    return
                }
                const { status, data } = error.response
                alert(`Error (${status}): ${data.message}`)
            }
            setError(false)
        }
    }, [error])

    return (
        <PetContext.Provider
            value={{
                loading,
                error,
                allPetsData,
                basicResult,
                advancedResult,
                singlePetData,
                savedPetData,
                adoptedPetData,
                addPet,
                getAllPets,
                basicSearch,
                advancedSearch,
                getPetById,
                update,
                savePetById,
                deletePetById,
                getUserSavedPets,
                setSinglePetData,
                adoptPet,
                returnPet,
                getAdoptedPet
            }}
        >
            {children}
        </PetContext.Provider >
    )
}
