const mongoose = require('mongoose');

module.exports = ()=>{
mongoose.connect(process.env.MONGODB_URI).then(
   ()=>{ console.log("connected to db")
}).catch((err)=>{console.log("error connecting in db")})
}