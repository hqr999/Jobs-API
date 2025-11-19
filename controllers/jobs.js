const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const {BadRequestError,NotFoundError} = require('../errors')


const getAllJobs = async(req,res) => {
    const empregos = await Job.find({criado_por:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({empregos,quantidade: empregos.length})
}

const getJob = async(req,res) => {
    const {
        user: {userId},
        params: {id: empregoId}
    } = req 
    
    const emprego = await Job.findOne({
        _id: empregoId,
        criado_por: userId,
    })
    if(!emprego){
        throw new NotFoundError(`Nenhuma ocupacao com esse ${empregoId}`)
    }
    res.status(StatusCodes.OK).json({ emprego })
}

const createJob = async(req,res) => {
    req.body.criado_por = req.user.userId
    const emprego = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({emprego})
}

const updateJob = async(req,res) => {
    const{body:{empresa,ocupacao},user:{userId},params:{id: empregoId}} = req 

    if(empresa === '' || ocupacao === ''){
        throw new BadRequestError('Campos Empresa ou Ocupacao ')
    }

    const emprego = await Job.findByIdAndUpdate({_id:empregoId,criado_por:userId},req.body,{new: true, runValidators: true})
    if(!emprego){
        throw new NotFoundError(`Nenhuma ocupacao com o id ${empregoId}`)
    }
    res.status(StatusCodes.OK).json({emprego})
}

const deleteJob = async(req,res) => {
    res.send('emprego deletado')
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}