import mongoose from 'mongoose'

const clientsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    state: {
        type: Boolean,
        trim: true
    },
    
})

const Clients = mongoose.model('Clients', clientsSchema)
export default Clients