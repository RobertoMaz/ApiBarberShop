import express from "express"
import { createAppointment, getAppointmentsByDate } from "../controllers/appointmentController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/', authMiddleware, createAppointment)
router.get('/', authMiddleware, getAppointmentsByDate)
// router.get('/verify/:token', verifyAccount)
// router.post('/login', login)

// router.get('/user', authMiddleware, user)


export default router