import Clients from "../models/Clients.js"
import { handleNotFoundError, validateObjectId } from "../utils/index.js"

const addClient = async (req, res) => {
    try {
        const client = new Clients(req.body)
        await client.save()
        res.json({
            msg: 'Se agregó el cliente correctamente.'
        })
    } catch (err) {
        const error = new Error('hubo un error al agregar el cliente.')
        return res.status(400).json({
            msg: error.message
        })
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await Clients.find()
        res.json(clients)
    } catch (error) {
        console.log(error)
    }
}

const getClientById = async (req, res) => {

    const { id } = req.params

    if(validateObjectId(id, res)) return

    const client = await Clients.findById(id)

    if(!client){
        return handleNotFoundError("El cliente no existe", res)
    }
    
    res.json(client)
}

const updateClient = async (req, res) => {
    const { id } = req.params

    if(validateObjectId(id, res)) return

    const client = await Clients.findById(id)
    
    if(!client){
        return handleNotFoundError("El cliente no existe", res)
    }

    client.name = req.body.name || client.name
    client.lastName = req.body.lastName || client.lastName
    client.email = req.body.email || client.email
    client.phone = req.body.phone || client.phone
    client.company = req.body.company || client.company
    client.position = req.body.position || client.position
   
    try {
        await client.save()
        res.json({
            msg: "El cliente se actualizó correctamente."
        })
    } catch (err) {
        const error = new Error('Hubo un error al actualizar el cliente.')
        return res.status(400).json({
            msg: error.message
        })
    }
}

const changeState = async (req, res) => {
    const { id } = req.params

    if(validateObjectId(id, res)) return

    const client = await Clients.findById(id)
    
    if(!client){
        return handleNotFoundError("El cliente no existe", res)
    }

    client.state = req.body.state

    try {
        await client.save()
        res.json({
            msg: "El cliente se actualizó correctamente"
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.params
    if(validateObjectId(id, res)) return

    const client = await Clients.findById(id)
    if(!client){
        return handleNotFoundError("El cliente no existe", res)
    }

    try {
        await client.deleteOne()
        res.json({
            msg: 'El cliente se eliminó correctamente.'
        })
    } catch (err) {
        console.log(error)
        const error = new Error('Hubo un error al eliminar el cliente.')
        return res.status(400).json({
            msg: error.message
        })
    }
 }

export {
    addClient,
    changeState,
    deleteClient,
    getClients,
    getClientById,
    updateClient
}