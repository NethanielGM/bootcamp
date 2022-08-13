import Scores from '../migrations/Scores.migration.js'
import Users from '../migrations/Auth.migration.js'
import { error } from '../utils/utils.js'

export const readScores = async ({where, order, limit}) => {
    const scores = await Scores.findAll({
        where,
        order,
        limit
    })
    return scores
}

export const readScore = async ({where, order}) => {
    const scores = await Scores.findOne({
        where,
        order
    })
    return scores
}

export const createScore = async (reqBody) => {
    const {userId, score} = reqBody
    const newScore = await Scores.create({
        userId,
        score
    })
    return newScore
}