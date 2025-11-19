const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const {BadRequestError,NotFoundError} = require('../errors')


const getAllJobs = async(req,res) => {
    const empregos = await Job.find({criado_por:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({empregos,quantidade: empregos.length})
}

const getJob = async(req,res) => {
    res.send('pega um emprego')
}

const createJob = async(req,res) => {
    req.body.criado_por = req.user.userId
    const emprego = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({emprego})
}

const updateJob = async(req,res) => {
    res.send('emprego atualizado')
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