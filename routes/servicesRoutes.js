import express from "express"
import { createServices, getServices, getServiceById, updateService, deleteService } from '../controllers/servicesController.js'

const router = express.Router()

// router.post('/', createServices)
// router.get('/', getServices)
// router.get('/:id', getServiceById)
// router.put('/:id', updateService)
// router.delete('/:id', deleteService)

router.route('/')
    .post(createServices)
    .get(getServices)

router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService)


export default router