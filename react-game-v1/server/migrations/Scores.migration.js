import { Sequelize } from 'sequelize'
import db from '../data/Database.js'
import Users from './Auth.migration.js'

const Scores = db.define(
    'scores',
    {
        scoreId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: { isUUID: { args: 4, msg: 'Not a valid score ID' } },
        },
        userId: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            validate: {
                isUUID: {
                    args: 4,
                    msg: 'Not a valid User ID',
                },
            },
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Score must be an integer',
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
)

Users.hasMany(Scores, {
    foreignKey: 'userId',
})
Scores.belongsTo(Users)

;(async () => {
    await db.sync()
})()

export default Scores
