import express from 'express'

//import { loginValidation, registerValidation } from '../middleware/Auth.validation.js'
//import { Register, Login, Logout, refreshToken } from '../controllers/Auth.controller.js'
import { getData } from '../controllers/Form.controller.js'
import { formValidation } from '../middleware/Form.validation.js'

const router = express.Router()

// Sign Up
//router.post('/signup', registerValidation, Register)
// Login
//router.post('/login', loginValidation, Login)
// Log Out
//router.delete('/logout', Logout)
// Refresh Token
//router.get('/token', refreshToken)
// Data
router.post('/getdata', formValidation, getData)


export default router