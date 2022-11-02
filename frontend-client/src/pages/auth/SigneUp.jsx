 import { Alert } from "@mui/material";
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { setToken } from "../../services/LocalStorage"

function SigneUp() {

  const [resp, setResp] = useState()

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const navigate = useNavigate()
  const [registerUser] = useRegisterUserMutation()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const user = new FormData(e.currentTarget)
    const actualUser = {
        name: user.get("username"),
        email: user.get("email"),
        password: user.get("password"),
        confirm_password: user.get("confirm_password"),
        tc: user.get("tc")
    }
    if(actualUser.name && actualUser.email && actualUser.password && actualUser.confirm_password && actualUser.tc){
      if(actualUser.password === actualUser.confirm_password){
        if(actualUser.tc !== null){

          const res = await registerUser(actualUser)
          console.log(res)

          if(res.data.status === "success"){
            navigate("/")
            setToken(res.data.token)

          }else{
            setError({status: true, msg:res.data.message, type: "error"})
          }
          
        }else{
          setError({status: true, msg:"terms and condition required", type: "error"})
        }
      }else{
        setError({status: true, msg:"password and confirm password doesnot matched", type: "error"})
      }
    }else{
      setError({status: true, msg:"All fields are required", type: "error"})
    }


  }


  return (
    <div className="container main_container mb-5">
      <div className="container mt-5 ">
        <form id="signeup-form" onSubmit={handleSubmit}> 
          <div class="row mb-3">
            <label for="username" class="col-sm-2 col-form-label">
              UserName
            </label>
            <div class="col-sm-10">
              <input type="text" name="username" class="form-control" id="username" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input type="email" name="email" class="form-control" id="email" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input type="password" name="password" class="form-control" id="password" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input type="password" name="confirm_password" class="form-control" id="confirm_password" />
            </div>
          </div>
          <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
            <div class="row mb-3">
              <div class="col-sm-10 offset-sm-2">
                <div class="form-check">
                  <input class="form-check-input" name="tc" value={true} type="checkbox" id="gridCheck1" />
                  <label class="form-check-label" for="gridCheck1">
                    Terms and condition
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        </form>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </div>
    </div>
  );
}

export default SigneUp;
