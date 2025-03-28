const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const user=mongoose.model('user',userSchema)

const details=new mongoose.Schema({
    FunnyName:{
        type:String,required:true
    },
    Description:{
        type:String,
        required:true
    }
})
const detail=mongoose.model('detail',details)

mongoose.exports={detail,user}