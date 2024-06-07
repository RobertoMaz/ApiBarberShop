import express from 'express'
import servicesRoutes from './routes/servicesRoutes.js'

const app = express()

app.use('/apiv1/services', servicesRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("El servidor se esta ejecutando en el puerto:",PORT)
})