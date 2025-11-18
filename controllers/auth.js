const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')


const register = async(req,res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({usuario:{nome:user.nome},token})
}

const login = async(req,res) => {
    const {email,senha} = req.body 

    if (!email || !senha) {
        throw new BadRequestError('Por favor forneça um email válido')
    }
    const user = await User.findOne({email})

    //Compara senha 
    if(!user){
        throw new UnauthenticatedError('Credenciais inválidas')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({usuario: {usuario:user.nome},token})
}


module.exports = {
    register,
    login,
}