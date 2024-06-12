import User from '../models/User.js'

const register = async (req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({msg: error.message})
    }


    const { email, name, password } = req.body

    

    try {
        const user = new User(req.body)
        await user.save()
        res.json({
            msg: 'El usuario se creo correctamente, revisa tu email.'
        })
    } catch (error) {
        console.log(error)
    }
}


export {
    register

}