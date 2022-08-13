import Ajv from 'ajv'
import { loginSchema, registerSchema, updateSchema } from '../data/Auth.schema.js'

const ajv = new Ajv()

const validateRegister = ajv.compile(registerSchema)
const validateLogin = ajv.compile(loginSchema)
const validateUpdate = ajv.compile(updateSchema)

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

export const updateValidation = (req, res, next) => {
    const valid = validateUpdate(req.body)

    if (valid) {
        next()
    } else {
        res.status(400).send(validateUpdate.errors)
    }
}