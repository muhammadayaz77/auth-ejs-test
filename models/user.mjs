import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/authtestapp");

let userSchema = mongoose.Schema({
  username : String,
  email : String,
  password : String,
  age : Number
})

let userModel = mongoose.model('user',userSchema);
export default userModel;