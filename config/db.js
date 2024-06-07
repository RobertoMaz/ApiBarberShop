import mongoose from 'mongoose'

export const db = async () => {

    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log("Se conecto correctamennte")
    } catch (error) {
        console.log('Error: ' + error)
        process.exit(1)
    }
}