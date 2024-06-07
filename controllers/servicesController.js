import mongoose from "mongoose"
import { services } from "../data/servicesBeauty.js"
import Services from "../models/Services.js"

const createServices = async (req, res) => {

    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const service = new Services(req.body)
        const result = await service.save()
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

const getServices = (req, res) => {

    res.json(services)
}

const getServicesById = async (req, res) => {

    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('El id no es valido')
        return res.status(400).json({
            msg: error.message
        })
    }

    const service = await Services.findById(id)
    if(!service){
        const error = new Error('El servicio no existe')
        return res.status(404).json({
            msg: error.message
        })
    }
    
    res.json(service)
    // res.json(services)
}

export {
    createServices,
    getServices,
    getServicesById
} 