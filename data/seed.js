import { db } from "../config/db.js"
import { configDotenv } from "dotenv"
import Services from "../models/Services.js"
import { services } from "./servicesBeauty.js"

configDotenv()
await db()

async function seedDB() {
    try {
        await Services.insertMany(services)
        console.log("Se agregaron los datos correctamente")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
    
async function clearDB() {
    try {
        await Services.deleteMany()
        console.log("Se eliminaron todos los datos correctamente")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

process.argv[2] === '--import' ? seedDB() : clearDB()