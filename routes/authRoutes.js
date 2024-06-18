import express from "express"
import { login, register, verifyAccount, user } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)

router.get('/user', authMiddleware, user)


export default router