import { readScores, readScore, createScore } from '../models/Scores.model.js'

const limitDefault = 100

export const getScores = async (req, res, next) => {
    const sortBy = req.body.sort === 'DATE' ? 'createdAt' : 'score'
    const sortOrder = req.body.order === 'ASC' ? 'ASC' : 'DESC'

    const where = req.body.where
    const order = [[sortBy, sortOrder]]
    const limit = req.body.limit || limitDefault

    try {
        const scores = await readScores({ where, order, limit })
        res.json(scores)
    } catch (error) {
        next(error)
    }
}

export const getLastScore = async (req, res, next) => {
    const where = { userId: req.params.id }
    const order = [['createdAt', 'DESC']]

    try {
        const lastScore = await readScore({ where, order })
        res.json(lastScore)
    } catch (error) {
        next(error)
    }
}

export const getHighScore = async (req, res, next) => {
    const where = { userId: req.params.id }
    const order = [['score', 'DESC']]

    try {
        const highScore = await readScore({ where, order })
        res.json(highScore)
    } catch (error) {
        next(error)
    }
}

export const getTopScores = async (req, res, next) => {
    const where = { userId: req.params.id }
    const order = [['score', 'DESC']]
    const limit = 3

    try {
        const highScore = await readScores({ where, order, limit })
        res.json(highScore)
    } catch (error) {
        next(error)
    }
}

export const addScore = async (req, res, next) => {
    const newScore = req.body

    try {
        const createdScore = await createScore(newScore)
        res.json(createdScore)
    } catch (error) {
        next(error)
    }
}
