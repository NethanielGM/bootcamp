import 'dotenv/config'

import {
    readUser,
    readAllUsers,
    createUser,
    loginUser,
    logoutUser,
    refreshUserToken,
    updateUser,
} from '../models/Auth.model.js'

const { TOKEN_COOKIE: tokenCookie } = process.env

export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies[tokenCookie]
        if (!refreshToken) return res.sendStatus(401)
        const user = await readUser({ refresh_token: refreshToken }, true)
        if (!user) return res.sendStatus(403)
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

export const getUsers = async (req, res, next) => {
    try {
        const users = await readAllUsers()
        res.json(users)
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await readUser({ id: req.params.id }, true)
        if (user.error) {
            const { status, msg } = user.error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json(user)
    } catch (err) {
        next(err)
    }
}

export const editUser = async (req, res, next) => {
    try {
        const userUpdated = await updateUser(req.body.userId, req.body)
        if (userUpdated.error) {
            const { status, msg } = userUpdated.error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.json(userUpdated)
    } catch (err) {
        next(err)
    }
}

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
        next(err)
    }
}

export const Login = async (req, res, next) => {
    try {
        const { accessToken, refreshToken, error } = await loginUser(req.body)
        if (error) {
            const { status, msg } = error
            res.status(status).send({ message: msg })
            throw msg
        }
        res.cookie(tokenCookie, refreshToken)
        res.json({accessToken})
    } catch (err) {
        next(err)
    }
}

export const Logout = async (req, res, next) => {
    try {
        const { status, clear } = await logoutUser(req.cookies[tokenCookie])
        if (clear) res.clearCookie(tokenCookie)
        return res.sendStatus(status)
    } catch (err) {
        next(err)
    }
}
