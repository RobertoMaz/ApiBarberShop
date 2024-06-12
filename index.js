import express from 'express'
import { db } from './config/db.js'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'

configDotenv()


const app = express()

app.use(express.json())

db()
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
/////////////////////////////////// borrar el undefined
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
// app.use(cors(corsOptions))

app.use('/apiv1/services', servicesRoutes)
app.use('/apiv1/auth', authRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("El servidor se esta ejecutando en el puerto:",PORT)
})