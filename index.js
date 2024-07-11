import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/db.js'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import clients from './routes/clientsRoutes.js'

dotenv.config()

const app = express()

db()

app.use(express.json())

const whiteList = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2]

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
app.use('/apiv1/appointments', appointmentRoutes)
app.use('/apiv1/users', userRoutes)
app.use('/apiv1/clients', clients)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("El servidor se esta ejecutando en el puerto:",PORT)
})