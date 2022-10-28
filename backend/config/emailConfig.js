import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:"bishaldeb282@gmail.com",
        pass:"cfbhdhzoqcepmsmh"
    }
})

export default transport