import express from "express"
import { login, register, verifyAccount, user, forgotPassword, verifyPasswordResetToken, updatePassword, admin} from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get('/forgot-password/:token', verifyPasswordResetToken)
router.post('/forgot-password/:token', updatePassword)

router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)


export default router