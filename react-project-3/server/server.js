import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './routes/Root.route.js'

const app = express()

const { PORT: port, CORS_DOMAINS: corsDomains } = process.env
const whiteList = corsDomains.split(', ')
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error())
        }
    },
}
app.use(express.json({ limit: '50mb' }));
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(router)

app.listen(port, () => console.log(`Server listening on port ${port}`))
