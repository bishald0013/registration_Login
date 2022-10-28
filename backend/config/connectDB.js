import mongoose from "mongoose"

const connectDB = async (DATABASE_URL)=>{
    try {
        const DB_OPTION = {
            dbName: "authVerify"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION)
        console.log("Connected successfully...")   
    } catch (error) {
        console.log(error)
    }
}

export default connectDB