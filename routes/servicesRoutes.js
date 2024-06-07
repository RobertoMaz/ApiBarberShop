import express from "express"
import { services } from "../data/beautyServices.js"

const router = express.Router()

router.get('/', (req, res) => {

    const products = [

        {
            id: 1,
            price: 30,
            name: 'laptop'
        },
        {
            id: 2,
            price: 80,
            name: 'monitor'
        },
    ]


    res.json(products)
})

export default router