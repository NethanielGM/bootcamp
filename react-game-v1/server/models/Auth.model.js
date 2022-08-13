import Users from '../migrations/Auth.migration.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { customAlphabet } from 'nanoid'
import { error, exposeAttributes } from '../utils/utils.js'

const nanoid = customAlphabet('1234567890abcdef', 10)

const publicAttributes = ['id', 'email', 'nickname', 'firstName', 'lastName']

export const readAllUsers = async () => {
    const users = await Users.findAll({ attributes: publicAttributes })
    return users
}

export const readUser = async (where, isPublic = false) => {
    const user = await Users.findOne({
        where,
        ...(isPublic && { attributes: publicAttributes }),
    })
    return user
}

export const createUser = async (reqBody) => {
    const { nickname, email, password, passwordConfirm, firstName, lastName } =
        reqBody
    if (password !== passwordConfirm)
        return error(400, 'Password confirmation does not match')

    const emailExists = await readUser({ email })
    console.log(emailExists)
    if (emailExists) return error(409, 'Email already exists')

    if (nickname) {
        console.log('ischecking')
        const nicknameExists = await readUser({ nickname })
        if (nicknameExists)
            return error(409, 'Nickname is already in use')
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = {
        nickname: nickname || `User${nanoid(7)}`,
        email,
        password: hashPassword,
        firstName,
        lastName,
    }
    console.log(newUser)
    await Users.create(newUser)

    return await readUser({ email }, true)
}

export const updateUser = async (userId, fields) => {
    const { nickname, email, password, passwordConfirm, firstName, lastName } = fields

    const where = { id: userId }

    // Update password
    if (password) {
        if (password !== passwordConfirm)
            return error(400, 'Password confirmation does not match')
    }

    // Update email
    if (email) {
        const emailExists = await readUser({ email })
        if (emailExists.length) return error(409, 'Email already exists')
    }

    // Update nickname
    if (nickname) {
        const nicknameExists = await readUser({ nickname })
        if (nicknameExists.length)
            return error(409, 'Nickname is already in use')
    }

    await Users.update(fields, { where })
    return await readUser(where, true)
}

export const loginUser = async (reqBody) => {
    const user = await readUser({ email: reqBody.email })
    if (!user) return error(400, 'User does not exist')

    const { id: userId, password } = user

    const passwordOK = await bcrypt.compare(reqBody.password, password)
    if (!passwordOK) return error(400, 'Wrong Password')

    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
    })

    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d',
        }
    )

    await updateUser(userId, { refresh_token: refreshToken })
    const res = exposeAttributes(user.dataValues, publicAttributes)
    return { accessToken, refreshToken }
}

export const logoutUser = async (refreshToken) => {
    if (!refreshToken) return { status: 204 }

    const user = await readUser({ refresh_token: refreshToken })
    if (!user) return { status: 204 }

    await updateUser(user.id, { refresh_token: null })
    return { status: 200, clear: true }
}

export const refreshUserToken = async (refreshToken, user) => {
    return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return error(403, 'Access token is not valid')
            const keys = exposeAttributes(user.dataValues, publicAttributes)
            const accessToken = jwt.sign(
                { user: keys },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '15s',
                }
            )
            return { accessToken }
        }
    )
}
