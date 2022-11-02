import { Alert } from "@mui/material";
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { getToken } from "../services/LocalStorage";
import { useChangePasswordMutation, useGetLoggedUserMutation } from "../services/userAuthApi"
import {removeToken} from "../services/LocalStorage"


function Dashbord() {

  const [error, setError] = useState({
    status: false,
    msg:"",
    type:""
  })

  const navigate = useNavigate()

  const [getLoggedUser] = useGetLoggedUserMutation() 

  const [changePassword] = useChangePasswordMutation()
  const token = getToken("token")



  const handleClick = (e) =>{
    e.preventDefault()
    removeToken('token')
    navigate("/login")

  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

      const newChangedPassword = new FormData(e.currentTarget)
      const newPassword = {
        password: newChangedPassword.get("password"),
        confirm_password: newChangedPassword.get("confirm_password")
      }

      if(newPassword.password && newPassword.confirm_password){
        if(newPassword.password === newPassword.confirm_password){

          const resp =  await changePassword({newPassword, token})
          console.log(resp)

        }else{
          setError({status: true, msg:"password and confirm both does't match", type: "error"})
        }
      }else{
        setError({status: true, msg:"Both the fields are required", type: "error"})
      }

  }


  return (
    <div className="container">
      <div className="row mt-5 mx-3">
        <div className="col-lg-6">
          <h1 className="fs-6">Email: bishaldeb282@gmail.com</h1>
          <h2 className="fs-5">UserName: Bishal Deb</h2>
          <button onClick={handleClick} type="submit" class="btn btn-primary">Logout</button>
        </div>
        <div className="col-lg-6">
          <form id="confirm-password" action="" onSubmit={handleSubmit}>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Password
                </label>
              </div>
              <div class="col-auto">
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text">
                  Must be 8-20 characters long.
                </span>
              </div>
            </div>
            <div class="row g-3 align-items-center mt-3">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Confirm_password
                </label>
              </div>
              <div class="col-auto">
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div class="col-auto">
                <span id="passwordHelpInline" class="form-text">
                  Must be 8-20 characters long.
                </span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
            Submit
          </button>
          </form>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
