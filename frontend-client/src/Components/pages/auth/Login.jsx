import { TextField, Button, Box, Alert } from "@mui/material";
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react";

const Login = () => {

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()

        const user = new FormData(e.currentTarget)
        const actualData = {
            email: user.get("email"),
            password: user.get("password")
        }

        if(actualData.email && actualData.password){
            document.getElementById("login-form").reset()
            setError({status: true, msg:"Loged in successfully", type:"success"})
            navigate("/")
            console.log(actualData)
        }else{
            setError({status: true, msg:"All fields are require", type:"error"})
        }
    }

  return (
    <>
      <div className="container mt-5 pt-5 mx-auto w-25">
        <form id="login-form" onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              class="form-control"
              id="password"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
          <Link to="/">Forgot Password</Link>
        </form>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </div>
    </>
  );
};

export default Login;
