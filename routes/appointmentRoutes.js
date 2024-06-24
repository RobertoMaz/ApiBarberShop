import express from "express"
import { createAppointment, getAppointmentById, getAppointmentsByDate, updateAppointment, deleteAppointment } from "../controllers/appointmentController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/', authMiddleware, createAppointment)
router.get('/', authMiddleware, getAppointmentsByDate)
router.get('/:id', authMiddleware, getAppointmentById)
router.put('/:id', authMiddleware, updateAppointment)
router.delete('/:id', authMiddleware, deleteAppointment)
// router.get('/verify/:token', verifyAccount)
// router.post('/login', login)

// router.get('/user', authMiddleware, user)


export default router