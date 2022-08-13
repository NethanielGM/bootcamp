import { createConnection } from 'mysql2/promise'
import { Sequelize } from 'sequelize'
import 'dotenv/config'

const {
    SQL_DIALECT: dialect,
    SERVER_HOST: host,
    SERVER_USER: user,
    SERVER_PASSWORD: password,
    DB_NAME: database,
} = process.env

// Connect to server and create db if not exist
const connection = await createConnection({ host, user, password })
await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`)

// Connect to db with sequelize
const db = new Sequelize(database, user, password, { host, dialect })

export default db
