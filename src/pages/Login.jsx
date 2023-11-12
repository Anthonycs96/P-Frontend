import { useState,useEffect  } from 'react'
import FormLogin from "../components/FormLogin/FormLogin";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  RiUser3Fill
} from "react-icons/ri";

const Login = () => {

  const handleSubmit = (formData,event) => {
    console.log(formData);
  }

  const initialState = {
    USUARIO: "",
    CONTRASENA: "",
  };
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className='min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-slate-900 via-gray-600 via-50% to-slate-900 ...' >
    <div className="bg-white bg-opacity-10 p-8 rounded-lg w-full md:w-96">
      <div className="mb-5">
        <div className='w-28 h-28 rounded-full shadow-2xl -mt-20 object-cover border-2 bg-[#262837] mx-auto text-center'>
          <RiUser3Fill className='w-24 h-24 mx-auto text-center'/>
        </div>
            <h1 className="text-3xl uppercase font-bold text-center pt-5 text-gray-300">
          Login
        </h1>
      </div>
      <FormLogin initialState={initialState} onSubmit={handleSubmit} />
    </div>

    </div>
    </>
  )
}

export default Login