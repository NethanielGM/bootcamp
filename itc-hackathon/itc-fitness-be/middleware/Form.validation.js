import Ajv from 'ajv'
import { formSchema } from '../data/Form.schema.js'

const ajv = new Ajv()

const validateForm = ajv.compile(formSchema)

export const formValidation = (req, res, next) => {
    const valid = validateForm(req.body)
    if (valid) {
        next()
    } else {
        res.status(400).send(validateUpdate.errors)
    }
}