import { addParking, getAll, getOne, remove } from '../models/Parking.model.js'

// ADD
export const addParkingSpot = async (req, res) => {
    const newParkingSpot = req.body
    const userId = req.user.id
    try {
        const response = await addParking(newParkingSpot, userId)
        if (response.error) {
            const { status, msg } = response.error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json(response)
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

// GET ALL
export const getAllParkingSpots = async (req, res) => {
    const userId = req.user.id
    try {
        const response = await getAll(userId)
        if (response.error) {
            const { status, msg } = response.error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

// GET USER
export const getUserParkingSpot = async (req, res) => {
    const userId = req.user.id
    try {
        const response = await getOne(userId)
        if (response.error) {
            const { status, msg } = response.error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}


// DELETE
export const deleteParkingSpot = async (req, res) => {
    const userId = req.user.id
    try {
        const response = await remove(userId)
        if (response.error) {
            const { status, msg } = response.error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json(response)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

