import { Sequelize } from 'sequelize'
import db from '../data/Database.js'
const Parking = db.define(
    'parking',
    {
        spotId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: { isUUID: { args: 4, msg: 'Not a valid spot ID' } },
        },
        userId: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        lat: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Not a valid Input: lat',
                },
            },
        },
        lng: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Not a valid Input: lng',
                },
            },
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Not a valid Input: time',
                },
            },
        }
    },
    {
        freezeTableName: true,
    }
)
export default Parking
