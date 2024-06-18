import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/db.js'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

db()

app.use(express.json())


const whiteList = [process.env.FRONTEND_URL, undefined]

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
app.use(cors(corsOptions))

app.use('/apiv1/services', servicesRoutes)
app.use('/apiv1/auth', authRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("El servidor se esta ejecutando en el puerto:",PORT)
})