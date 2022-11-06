import { Alert } from "@mui/material";
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { getToken } from "../services/LocalStorage";
import { useChangePasswordMutation, useGetLoggedUserQuery } from "../services/userAuthApi"
import {removeToken} from "../services/LocalStorage"
import { useEffect } from "react";


function Dashbord() {

  const [error, setError] = useState({
    status: false,
    msg:"",
    type:""
  })

  const navigate = useNavigate()

  
  const [changePassword] = useChangePasswordMutation()
  const token = getToken()
  const {data, isSuccess} = useGetLoggedUserQuery(token)
  console.log(data) 

  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })

  useEffect(() => {
    if(data && isSuccess){
      setUserData({
        email: data.user.email,
        name: data.user.name
      })
    }
  }, [data, isSuccess])

  // logout user
  const handleClick = (e) =>{
    e.preventDefault()
    removeToken('token')
    navigate("/login")
  }

  // change password
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
          if(resp.data.status === "success"){
            setError({status: true, msg: resp.data.message, type: "success"})
            console.log(resp)
            setTimeout(() => {
              navigate("/login")
            }, 2000)

          }else{
            setError({status: true, msg:resp.data.message, type: "error"})
          }

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
          <h1 className="fs-6">UserName:{userData.name}</h1>
          <h2 className="fs-5">Email:{userData.email}</h2>
          <button onClick={handleClick} type="submit" class="btn btn-primary">Logout</button>
        </div>
        <div className="col-lg-6">
          <form id="confirm-password" action="" onSubmit={handleSubmit}>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label for="inputPassword6" className="col-form-label">
                  Password
                </label>
              </div>
              <div class="col-auto">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div className="col-auto">
              </div>
            </div>
            <div className="row g-3 align-items-center mt-3">
              <div className="col-auto">
                <label for="inputPassword6" class="col-form-label">
                  Confirm_password
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                />
              </div>
              <div className="col-auto">
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
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
