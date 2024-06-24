import Appointment from "../models/Appointment.js"


const getUserAppointments = async (req, res) => {
    const { user } = req.params

    // const role = 'admin'
    // if(user !== req.user._id.toString() && role !== 'admin'){

    if(user !== req.user._id.toString()){
        const error = new Error('Acceso denegado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const appoinments = await Appointment.find({ 
            user,
            date: {
                $gte: new Date()
            }
        }).populate('services').sort({ date: 'asc' })
        res.json(appoinments)
    } catch (error) {
        console.log(error)
    }

}


export {

    getUserAppointments,

}