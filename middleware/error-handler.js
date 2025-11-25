const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
  let customError = {
    codigo_status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    mens: err.message || 'Alguma deu errado, tente de novo mais tarde'
  }
  
  //if (err instanceof CustomAPIError) {
    //return res.status(err.statusCode).json({ msg: err.message })
  //}

  if(err.name === 'ValidationError'){
    console.log(Object.values(err.errors))
    customError.mens = Object.values(err.errors).map((item) => item.message).join(',')
    customError.codigo_status = 400
  }

  if(err.code && err.code === 11000){
    customError.mens = 'Valor duplicado para o campo ' + Object.keys(err.keyValue) + ' , por favor escolha outro valor'
    customError.codigo_status = 400
  }

  if(err.name ===  'CastError'){
    customError.mens = 'Nenhum item com o id ' + err.value
    customError.codigo_status = 404  
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.codigo_status).json({msg:customError.mens})
}

module.exports = errorHandlerMiddleware
