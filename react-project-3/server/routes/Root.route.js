import express from 'express'

// Authentication Validation
import { loginValidation, registerValidation } from '../middleware/Auth.validation.js'
// Token Validation
import { verifyToken } from '../middleware/VerifyToken.js'

// Authentication Controller
import { Register, Login, Logout, refreshToken } from '../controllers/Auth.controller.js'
// Parking Controller
import { addParkingSpot, getAllParkingSpots, deleteParkingSpot, getUserParkingSpot } from '../controllers/Parking.controller.js'


const router = express.Router()

// AUTHENTICATION API
router.post('/signup', registerValidation, Register)
router.post('/login', loginValidation, Login)
router.delete('/logout', Logout)
router.get('/token', refreshToken)

// PARKING API
router
    .route('/spot')
    .get(verifyToken, getAllParkingSpots)
    .post(verifyToken, addParkingSpot)
    .delete(verifyToken, deleteParkingSpot)
router
    .route('/spot/user')
    .get(verifyToken, getUserParkingSpot)

export default router