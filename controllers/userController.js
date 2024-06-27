import Appointment from "../models/Appointment.js"


const getUserAppointments = async (req, res) => {
    const { user } = req.params

    // const role = 'admin'
    // if(user !== req.user._id.toString() && role !== 'admin'){

    if(user !== req.user._id.toString()){
        const error = new Error('Acceso denegado')
        return res.status(400).json({ msg: error.message })
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    try {
        const query = req.user.admin ? { date: { $gte: today}} : { user, date: { $gte: today}}
        const appoinments = await Appointment.find(query)
            .populate('services')
            .populate({path: 'user', select: '-password -admin -token -verified -__v'})
            .sort({ date: 'asc', time: 'asc' })
        res.json(appoinments)
    } catch (error) {
        console.log(error)
    }

}


export {

    getUserAppointments,

}