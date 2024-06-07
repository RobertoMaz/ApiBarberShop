import express from "express"
import { createServices, getServices, getServicesById } from '../controllers/servicesController.js'

const router = express.Router()

router.get('/', getServices)
router.post('/', createServices)
router.post('/:id', getServicesById)

export default router