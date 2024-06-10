import mongoose from "mongoose"

function validateObjectId(id, res) {
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('El id no es valido')
        return res.status(400).json({
            msg: error.message
        })
    }

}

function handleNotFoundError(message, res){
    const error = new Error(message)
    return res.status(404).json({
        msg: error.message
    })
}

export {
    validateObjectId,
    handleNotFoundError

}