import Ajv from 'ajv'
import scoresSchema from '../data/Scores.schema.js'

const ajv = new Ajv()
const validate = ajv.compile(scoresSchema)

const scoresValidation = (req, res, next) => {
    const valid = validate(req.body)

    if (valid) {
        next()
    } else {
        res.status(400).send(validate.errors)
    }
}

export default scoresValidation