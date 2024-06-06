import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hola')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("El servidor se esta ejecutando en el puerto:",PORT)
})