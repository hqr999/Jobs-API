const getAllJobs = async(req,res) => {
    res.send('pega todos os empregos')
}

const getJob = async(req,res) => {
    res.send('pega um emprego')
}

const createJob = async(req,res) => {
    res.send('emprego criado')
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