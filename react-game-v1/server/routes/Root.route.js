import express from 'express'
import { Register, Login, Logout, editUser, refreshToken } from '../controllers/Auth.controller.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { addScore, getHighScore, getLastScore, getScores, getTopScores } from '../controllers/Scores.controller.js'
import scoresValidation from '../middleware/Scores.validation.js'
import { loginValidation, registerValidation, updateValidation } from '../middleware/Auth.validation.js'

const router = express.Router()

// Authentication API
router.post('/signup', registerValidation, Register)
router.post('/login', loginValidation, Login)
router.delete('/logout', Logout)
router.put('/edit', verifyToken, updateValidation, editUser)
router.get('/token', refreshToken)

// Scores API
router.post('/addScore', verifyToken, scoresValidation, addScore)
router.get('/lastScore/:id', verifyToken, getLastScore)
router.get('/highScore/:id', verifyToken, getHighScore)
router.get('/topScores/:id', verifyToken, getTopScores)
router.get('/getScores', getScores)

export default router
