import { Alert } from "@mui/material";
import React from "react";
import {useState} from "react"
import {useNavigate} from "react-router-dom"


function ResetPasswordEmail() {

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })

      const navigate = useNavigate()

      const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
          email: data.get('email'),
        }
        if (actualData.email) {
          console.log(actualData);
          document.getElementById('password-reset-email-form').reset()
          setError({ status: true, msg: "Password Reset Email Sent. Check Your Email !!", type: 'success' })
          setTimeout(()=>{
            navigate("/reset")
          },1000)
        } else {
          setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
        }
      }

  return (
    <div className="container w-25">
      <form id="password-reset-email-form" onSubmit={handleSubmit}>
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
           <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : " "}
    </div>
  );
}

export default ResetPasswordEmail;
