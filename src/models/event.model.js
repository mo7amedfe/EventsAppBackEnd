const mongoose = require('mongoose');



const eventSchema =new mongoose.Schema({

    organizer_id:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
   
    },
    time:{
        type:String,

    },
    location:{
        type:String,

    },
    imageUrl:{
        type:String,
    },
    price:{
        type:Number
    }
},{timestamps:true});

module.exports=mongoose.model("Event",eventSchema);