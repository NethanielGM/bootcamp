import { Sequelize } from 'sequelize'
import db from '../data/Database.js'

// Bcrypt hash
const hashValidator = /^\$2[ayb]\$.{56}$/

// JWT HS-256
const tokenValidator =
    /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/

const Users = db.define(
    'users',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
            validate: { isUUID: { args: 4, msg: 'Not a valid ID' } },
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: { msg: 'Not a valid email' } },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: hashValidator,
                    msg: 'Not a valid hash password',
                },
            },
        },
        nickname: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isAlphanumeric: { msg: 'Nickname name must be alphanumeric' },
            },
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        refresh_token: {
            type: Sequelize.TEXT,
            allowNull: true,
            validation: { is: {args: tokenValidator, msg: 'Not a valid token'} },
        },
    },
    {
        freezeTableName: true,
    }
)

;(async () => {
    await db.sync()
})()

export default Users
