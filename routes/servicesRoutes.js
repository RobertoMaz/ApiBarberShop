import express from "express"
import { createServices, getServices, getServiceById, updateService, deleteService } from '../controllers/servicesController.js'

const router = express.Router()

router.route('/')
    .post(createServices)
    .get(getServices)

router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService)

export default router