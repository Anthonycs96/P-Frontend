import { useState, useEffect } from "react";
import {
  RiUserLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Fill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { usernameValidate } from "../../helper/ValidateHeper";
import {useAuthStore} from '../../VariblesStore';

function Form(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { token,status } = useAuthStore();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (event) => {
    try {
      const result = await usernameValidate(formik.values);

      if (token && status === 200) {
        navigate("/SPedidos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: props.initialState,
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit,
  });
  useEffect(() => {
    if (parseInt(status) === 200) {
      navigate("/SPedidos");
    }
  }, [
    status,
    token, navigate
  ]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="relative mb-n2">
        <a className="text-gray-400 ml-2">Usuario</a>
        <label htmlFor="USUARIO">
          <RiUserLine className="absolute left-2 top-1/2 translate-y-[20%] text-gray-500" />
        </label>
        <input
          className="border-gray-200 outline-none py-2 px-8 rounded-lg bg-[#13121a] text-white w-full"
          type="text"
          name="USUARIO"
          value={formik.values.USUARIO}
          onChange={formik.handleChange}
        />
      </div>
      <div className="relative">
        <a className="text-gray-400 ml-2">Contraseña</a>
        <label htmlFor="CONTRASENA">
          <RiLock2Fill className="absolute left-2 top-1/2 translate-y-[20%] text-gray-500" />
        </label>
        <input
          className="border-gray-200 outline-none py-2 px-8 rounded-lg bg-[#13121a] text-white w-full"
          type={showPassword ? "text" : "password"}
          name="CONTRASENA"
          value={formik.values.CONTRASENA || ""}
          onChange={formik.handleChange}
        />
        {showPassword ? (
          <RiEyeLine
            onClick={handleClickShowPassword}
            className="absolute right-2 top-1/2 translate-y-[20%] text-gray-500 hover:cursor-pointer"
          />
        ) : (
          <RiEyeOffLine
            onClick={handleClickShowPassword}
            className="absolute right-2 top-1/2 translate-y-[20%] text-gray-500 hover:cursor-pointer"
          />
        )}
      </div>
      <div>
        <div className="container mx-auto text-center">
          <button
            className="mt-6 bg-red-500 text-white w-1/2 py-2 px-6 rounded-lg hover:scale-105 transition-all"
            type="submit"
          >
            Ingresar
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
