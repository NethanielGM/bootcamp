import express from 'express'
//import 'dotenv/config'
import router from './routes/routes.js'

const app = express()
app.use(express.json());
const port = 8080
app.use(router)
app.listen(port, () => {
   console.log(`Fitness backend listening at http://localhost:${port}`)

});