import Ajv from 'ajv'
import { loginSchema, registerSchema } from '../data/Auth.schema.js'

const ajv = new Ajv()

const validateRegister = ajv.compile(registerSchema)
const validateLogin = ajv.compile(loginSchema)

export const registerValidation = (req, res, next) => {
    const valid = validateRegister(req.body)

    if (valid) {
        next()
    } else {
        res.status(400).send(validateRegister.errors)
    }
}

export const loginValidation = (req, res, next) => {
    const valid = validateLogin(req.body)

    if (valid) {
        next()
    } else {
        res.status(400).send(validateLogin.errors)
    }
}
