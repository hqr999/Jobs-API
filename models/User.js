const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'Por favor providencie um nome'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: [true, 'Por favor providencie um email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Por favor providencie um e-mail válido',
        ],
        unique:true,
    },
    senha:{
        type:String,
        required: [true, 'Por favor providencie uma senha'],
        minlength:6,
    }
})

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.senha = await bcrypt.hash(this.senha,salt)
    next()
})


UserSchema.methods.criaJWT = function() {
    return jwt.sign({userdId:this._id,nome:this.nome},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparaSenha = async function (senhaCandidata) {
    const correspondencia = await bcrypt.compare(senhaCandidata,this.senha)
    return correspondencia
}

module.exports = mongoose.model('User',UserSchema)