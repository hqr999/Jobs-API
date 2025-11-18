const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')


const register = async(req,res) => {
    const user = await User.create({...req.body})
    const token = user.criaJWT()
    res.status(StatusCodes.CREATED).json({usuario:{nome:user.nome},token})
}

const login = async(req,res) => {
    const {email,senha} = req.body 

    if (!email || !senha) {
        throw new BadRequestError('Por favor forneça um email válido')
    }
    const user = await User.findOne({email})

    if(!user){
        throw new UnauthenticatedError('Credenciais inválidas')
    }
     //Compara senha 
     const senha_valida = await user.comparaSenha(senha)
     if(!senha_valida) {
        throw new UnauthenticatedError('Credenciais inválidas')
     }

    const token = user.criaJWT()
    res.status(StatusCodes.OK).json({usuario: {usuario:user.nome},token})
}


module.exports = {
    register,
    login,
}