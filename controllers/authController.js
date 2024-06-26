import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js'
import User from '../models/User.js'
import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {

    const { email, name, password } = req.body
    const userExists = await User.findOne({ email })
    const MIN_PASSWORD_LENGTH = 8

    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({msg: error.message})
    }


    if(userExists){
        const error = new Error('El correo ya existe')
        return res.status(400).json({msg: error.message})
    }

    if(password.trim().length < MIN_PASSWORD_LENGTH){
        const error = new Error(`El password no puede contener menos de ${MIN_PASSWORD_LENGTH} caracteres`)
        return res.status(400).json({msg: error.message})
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        const { name, email, token } = result

        sendEmailVerification({name, email, token})

        res.json({
            msg: 'El usuario se creo correctamente. Te enviamos un correo para confirmar tu cuenta.'
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyAccount = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({token})

    if(!user){
        const error = new Error(`Hubo un error, el token no es válido`)
        return res.status(401).json({msg: error.message})
    }

    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({
            msg: 'Usuario Confirmado Correctamente'
        })
    } catch (error) {
        console.log(error)
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})
    if(!user){
        const error = new Error(`El correo no existe.`)
        return res.status(401).json({msg: error.message})
    }

    if(!user.verified){
        const error = new Error(`Aun no confirmaste tu cuenta, verifica tu correo para confirmar la cuenta.`)
        return res.status(401).json({msg: error.message})
    }

    if(await user.checkPassword(password)){
        const token = generateJWT(user._id)
        return res.json({ token })
    } else {
        const error = new Error(`El password es incorrecto.`)
        return res.status(401).json({msg: error.message})
    }

}

const user = async (req, res) => {
    const { user } = req
    res.json(user)
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    
    const user = await User.findOne({email})


    if(!user){
        const error = new Error(`El correo no existe.`)
        return res.status(404).json({msg: error.message})        
    }

    if(!user.verified){
        const error = new Error(`El correo no esta verificado.`)
        return res.status(403).json({msg: error.message})        
    }

    try {
        user.token = uniqueId()
        const result = await user.save()
        await  sendEmailPasswordReset({email: result.email, name: result.name, token: result.token})
        res.json({msg: 'Hemos enviado un correo con las instrucciones.'})
    } catch (error) {
        console.log(error)
    }


}

const verifyPasswordResetToken = async (req, res) => {
    const { token } = req.params

    const isValidToken = await User.findOne({token})

    if(!isValidToken){
        const error = new Error(`El Token no es válido.`)
        return res.status(400).json({msg: error.message})        
    }

    res.json({msg: 'Token válido'})
}

const updatePassword = async (req, res) => {
    const { token } = req.params

    console.log(token)
    const user = await User.findOne({token})

    if(!user){
        const error = new Error(`El Token no es válido.`)
        return res.status(400).json({msg: error.message})        
    }
    
    const { password } = req.body
    try {
        user.token = ''
        user.password = password
        await user.save()
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const admin = async (req, res) => {
    const { user } = req
    if(!user.admin){
        const error = new Error(`Acción no válida`)
        return res.status(403).json({msg: error.message})
    }

    
    res.json(user)
}


export {
    register,
    verifyAccount,
    login,
    user,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    admin

}