import 'dotenv/config'

import {
    readUser, createUser, loginUser, logoutUser, refreshUserToken
} from '../models/Auth.model.js'

const { TOKEN_COOKIE: tokenCookie } = process.env

// GET TOKEN
export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies[tokenCookie]
        if (!refreshToken) return res.sendStatus(401)
        const user = await readUser({ refresh_token: refreshToken }, true)
        if (!user) return res.sendStatus(403, 'Missing token')
        const { accessToken, error } = await refreshUserToken(
            refreshToken,
            user
        )
        if (error) {
            const { status, msg } = error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json({ accessToken })
    } catch (err) {
        next(err)
    }
}

// REGISTER
export const Register = async (req, res, next) => {
    try {
        const userCreated = await createUser(req.body)
        if (userCreated.error) {
            const { status, msg } = userCreated.error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json(userCreated)
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

// LOGIN
export const Login = async (req, res, next) => {
    try {
        const { accessToken, refreshToken, error } = await loginUser(req.body)
        if (error) {
            const { status, msg } = error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.cookie(tokenCookie, refreshToken)
        res.json({ accessToken })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

// LOG OUT
export const Logout = async (req, res, next) => {
    try {
        const { status, clear } = await logoutUser(req.cookies[tokenCookie])
        if (clear) res.clearCookie(tokenCookie)
        return res.sendStatus(status)
    } catch (err) {
        res.status(500).send({ message: err })
    }
}
