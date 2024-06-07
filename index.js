import express from 'express'
import servicesRoutes from './routes/servicesRoutes.js'
import { db } from './config/db.js'
import { configDotenv } from 'dotenv'

configDotenv()


const app = express()

app.use(express.json())

db()

app.use('/apiv1/services', servicesRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("El servidor se esta ejecutando en el puerto:",PORT)
})