const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    empresa:{
        type:String,
        required:[true,'Por favor forneça o nome de uma empresa'],
        maxlength:50
    },
    ocupacao:{
        type:String,
        required:[true,'Por favor forneça o ocupacao'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['entrevistando','declinado','pendente'],
        default:'pendente'
    },
    criado_por:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Por favor forneça um usuário']
    }
},{timestamps:true})


module.exports = mongoose.model('Job',JobsSchema)