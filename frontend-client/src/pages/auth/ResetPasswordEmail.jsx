import { Alert } from "@mui/material";
import React from "react";
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import { useResetPasswordEmailMutation } from "../../services/userAuthApi";



function ResetPasswordEmail() {

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })

      const [resetPasswordEmail] = useResetPasswordEmailMutation()
      

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
          email: data.get('email'),
        }
        if (actualData.email) {

          const res = await resetPasswordEmail(actualData)
          console.log(actualData);
          console.log(res)

          if(res.data.status === "success"){
              setError({ status: true, msg: res.data.message, type: 'success' })
          }
          if(res.data.status === "fail"){
            setError({ status: true, msg: res.data.message, type: 'error' })
          }

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
