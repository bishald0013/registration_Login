import mongoose from 'mongoose'

//Defining mongooseSchema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    tc: {type: Boolean, required: true}
})

//Defining mongoose Model
const UserModel = mongoose.model("user", userSchema)

export default UserModel