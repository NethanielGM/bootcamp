import Ajv from 'ajv'
import { parkingSpotSchema } from '../data/Parking.schema.js'

const ajv = new Ajv()
const validate = ajv.compile(parkingSpotSchema)

export const parkingValidation = (req, res, next) => {
    const valid = validate(req.body)
    if (valid) {
        next()
    } else {
        res.status(400).send(validate.errors)
    }
}
