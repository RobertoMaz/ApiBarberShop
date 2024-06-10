import mongoose from 'mongoose'

export const db = async () => {

    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log("Se conecto correctamennte")
    } catch (error) {
        console.log('Error: ' + error)
        process.exit(1)
    }
}