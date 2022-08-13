import Users from '../migrations/Auth.migration.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { error, exposeAttributes } from '../utils/utils.js'

// ATRIBUTES
const publicAttributes = ['id', 'email', 'phone', 'firstName', 'lastName', 'createdAt']

// GET USER
export const readUser = async (where, isPublic = false) => {
    return await Users.findOne({
        where,
        ...(isPublic && { attributes: publicAttributes }),
    })
}

// REGISTER USER
export const createUser = async (fields) => {
    const { phone, email, password, passwordConfirm, firstName, lastName } = fields
    // PASSWORD CONFORMATION
    if (password !== passwordConfirm)
        return error(400, 'Password confirmation does not match')
    // EMAIL CONFORMATION
    const emailExists = await readUser({ email })
    if (emailExists) return error(409, 'Email already exists')
    // PHONE CONFORMATION
    if (phone) {
        const phoneExists = await readUser({ phone })
        if (phoneExists)
            return error(409, 'phone is already in use')
    }
    // HASH WITH BCRYPT
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = {
        phone,
        email,
        password: hashPassword,
        firstName,
        lastName,
    }
    await Users.create(newUser)
    return await readUser({ email }, true)
}

// UPDATE USER
export const updateUser = async (userId, fields) => {
    const { phone, email, password, re_password } = fields
    const where = { id: userId }

    // PASSWORD
    if (password !== re_password)
        return error(400, 'Password confirmation does not match')

    // EMAIL
    if (email) {
        const emailExists = await readUser({ email })
        if (emailExists && emailExists.dataValues.id !== userId) return error(409, 'Email already exists')
    }
    // PHONE
    if (phone) {
        const phoneExists = await readUser({ phone })
        if (phoneExists && phoneExists.dataValues.id !== userId)
            return error(409, 'phone is already in use')
    }
    await Users.update(fields, { where })
    await readUser(where, true);
    return await readUser(where, true)
}

// LOGIN USER
export const loginUser = async (fields) => {
    const user = await readUser({ email: fields.email })
    if (!user) return error(400, 'User does not exist')
    const { id: userId, password } = user
    const passwordOK = await bcrypt.compare(fields.password, password)
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
    exposeAttributes(user.dataValues, publicAttributes)
    return { accessToken, refreshToken }
}

// LOGOUT USER
export const logoutUser = async (refreshToken) => {
    if (!refreshToken) return { status: 204 }
    const user = await readUser({ refresh_token: refreshToken })
    if (!user) return { status: 204 }
    await updateUser(user.id, { refresh_token: null })
    return { status: 200, clear: true }
}

// REFRESH TOKEN
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
