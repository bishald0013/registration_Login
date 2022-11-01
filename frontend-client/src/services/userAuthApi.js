import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user/' }),

  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query:(user) =>{
        return{
            url: "register",
            method: "POST",
            body: user,
            headers:{
                "Content-type":"application/json"
            }
        }
      },
    }),

    loginUser: builder.mutation({
      query:(user)=>{
        return{
          url:  "login",
          method: "POST",
          body: user,
          headers:{
            "Content-type":"application/json"
          } 
        }
      }
    }),

    changePassword: builder.mutation({
      query: ({newPassword, token}) => {
        return{
          url: "changepassword",
          method: "PATCH",
          body: newPassword,
          headers:{
            "authorization": `Bearer ${token}`
          }
        }
      }
    }),

    getLoggedUser: builder.mutation({
      query: (token) =>{
        return{
          url: "loggedUser",
          method: "GET",
          headers: {
            "authorization": `Bearer ${token}`
          }
        }
      }
    })
  }),

 

})


export const {useRegisterUserMutation, useLoginUserMutation, useChangePasswordMutation, useGetLoggedUserMutation} = userAuthApi