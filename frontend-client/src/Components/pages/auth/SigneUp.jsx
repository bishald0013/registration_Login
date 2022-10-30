import { Alert } from "@mui/material";
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

function SigneUp() {

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()

    const user = new FormData(e.currentTarget)
    const actualUser = {
        username: user.get("username"),
        email: user.get("email"),
        password: user.get("password"),
        confirm_password: user.get("confirm_password"),
        tc: user.get("tc")
    }
   

    const {username, email, password , confirm_password, tc} = actualUser

  if(password && confirm_password){
    if(password === confirm_password){
      if(tc != null){
        if(username && email){
          
          document.getElementById("signeup-form").reset()
          
          setError({status: true, msg: "successfully created", type: "Success"})
          console.log(actualUser)
          
          navigate("/")

        }else{
          console.log("username or email require")
          setError({status: true, msg:"userName and email bolth required", type: "error"})
        }
      }else{
        console.log("please aggree terms and codition")
        setError({status: true, msg:"please agree terms & condition", type: "error"})
      }
    }else{
      setError({status: true, msg:"password and confirm password doesnot match", type: "error"})
    }
  }else{
    setError({status: true, msg:"password and confirm password required", type: "error"})
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
                  <input class="form-check-input" name="tc" type="checkbox" id="gridCheck1" />
                  <label class="form-check-label" for="gridCheck1">
                    Example checkbox
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
