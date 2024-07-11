import express from "express"
import {getClients, addClient, getClientById, updateClient, changeState, deleteClient} from '../controllers/clientsController.js'

const router = express.Router()

router.route('/')
    .get(getClients)
    .post(addClient)

router.route('/:id')
    .get(getClientById)
    .patch(updateClient)
    .delete(deleteClient)

router.route('/state/:id')
    .patch(changeState)

export default router