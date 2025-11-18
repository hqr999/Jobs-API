const { UnauthenticatedError } = require("../errors")
const jwt = require('jsonwebtoken')

const auth = async(req,res,next) => {
    //checando o header 
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Autenticação inválida')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // Uni o usuário as rotas do emprego
        req.user = {userId:payload.userId,nome:payload.nome}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Autenticação inválida')
    }
}






module.exports = auth