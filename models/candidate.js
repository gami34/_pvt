let mongoose = require('mongoose');


let candidateSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    poll1:{
        type:Number,
        required: true
    },
    poll2:{
        type:Number,
        required: true
    },
    poll3:{
        type:Number,
        required: true
    },
    poll4:{
        type:Number,
        required: true
    },
    poll5:{
        type:Number,
        required: true
    },
    poll6:{
        type:Number,
        required: true
    },
    poll7:{
        type:Number,
        required: true
    },
    poll8:{
        type:Number,
        required: true
    },
    poll9:{
        type:Number,
        required: true
    },
    poll10:{
        type:Number,
        required: true
    },
});

let Candidate = module.exports =  mongoose.model('Candidate',candidateSchema, 'candidate');