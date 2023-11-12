import toast from "react-hot-toast";
import { authenticate } from "../helper/LoginHelper";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../VariblesStore";


/**validacion de login en pagina */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  if (values.USUARIO && values.CONTRASENA) {
    try {
      // check user exist or not
      await authenticate(values);
    } catch (error) {
      errors.exist = "Credenciales inválidas. Intente nuevamente";
      toast.error(errors.exist);
      //console.error(error);
    }
  }

  return errors;
}
/**validacion username */
function usernameVerify(error = {}, values) {
  if ([values.USUARIO, values.CONTRASENA].includes("")) {
    error.USUARIO = "Campos USUARIO es obligatorio";
    toast.error(error.USUARIO);
  }
  return error;
}

export function validarPermisos(tokenValido, estado) {
  const { clearValidacion } = useAuthStore();
  const navigate = useNavigate();
    useEffect(() => {
      if (!tokenValido || estado === 401|| estado === 403 || estado === null) {
        navigate('/');
        clearValidacion();
         // Redirige a la página de inicio de sesión
      } else {
        toast.error(
          "Ha ocurrido un error al iniciar sesión. Por favor, inténtelo de nuevo."
        );
      }
    }, [tokenValido, estado,navigate]);
   
}
