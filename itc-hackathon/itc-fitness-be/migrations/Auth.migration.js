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
            validate: { isEmail: { msg: 'Not a valid Email' } },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: hashValidator,
                    msg: 'Not a valid Hash Password',
                },
            },
        },
        phone: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Not a valid Phone',
                },
            },
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: 'Not Alphanumeric FirsName',
                },
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: 'Not Alphanumeric LastName',
                },
            },
        },
        refresh_token: {
            type: Sequelize.TEXT,
            allowNull: true,
            validation: { is: { args: tokenValidator, msg: 'Not a valid Token' } },
        },
    },
    {
        freezeTableName: true,
    }
);
(async () => { await db.sync() })()
export default Users
