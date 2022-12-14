import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import {useNavigate, useParams} from "react-router-dom"
import { useUserResetPasswordMutation } from "../../services/userAuthApi";

function PasswordReset() {

  const [error, setError] = useState({
    status: false,
    msg:"",
    type: ""
  })

  const navigate = useNavigate()
  const { id, token} = useParams()
  const [userResetPassword] = useUserResetPasswordMutation()
 
  const handleSubmit = async (e) => {   
    e.preventDefault()
    
    const newPassword = new FormData(e.currentTarget)
    const newUserPassword = {
      password: newPassword.get("password"),
      confirm_password: newPassword.get("confirm_password")
    }

    if(newUserPassword.password && newUserPassword.confirm_password){
      if(newUserPassword.password === newUserPassword.confirm_password){
        
        const res = await userResetPassword({newUserPassword, id, token})
        console.log(res)

        if(res.data.status === "success"){
          setError({status: true, msg: res.data.message, type: "success"})
        }
        if(res.data.status === "fail"){
          setError({status: true, msg: res.data.message, type: "fail"})
        }

      }else{
        setError({status: true, msg:"password and condirm password doesnot match", type: "error"})
        
        console.log("password and condirm password doesnot match")
      }
    }else{
      setError({status: true, msg:"both fields are required", type:"error"})
    }

  }

  return (
    <div className="container mt-5 w-25">
      <form id="password-reset" onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            New Password
          </label>
          <input
            type="password"
            name="password"
            class="form-control"
            id="password"
            
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
          Confirm password
          </label>
          <input
            type="password"
            name="confirm_password"
            class="form-control"
            id="confirm_password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
    </div>
  );
}

export default PasswordReset;
