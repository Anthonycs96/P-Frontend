import React, { useEffect, useCallback } from "react";
import { useAuthStore } from "../VariblesStore"; // Importa un hook personalizado para obtener el token y el estado de autenticación del usuario.
import { validarPermisos } from "../helper/ValidateHeper"; // Importa una función para validar los permisos del usuario.

export const UserContext = React.createContext(); // Crea un contexto llamado "UserContext".

const UserContextProvider = ({ children }) => { // Define un componente que será el proveedor de contexto.
  const { token,status } = useAuthStore(); // Usa el hook personalizado "useAuthStore" para obtener el token y el estado de autenticación del usuario.
  validarPermisos(token, status); // Verifica si el usuario tiene los permisos necesarios para acceder a la aplicación.

  return (
    <UserContext.Provider value={{ token }}>{children}</UserContext.Provider> // Provee el valor del token al contexto "UserContext" y envuelve los componentes hijos.
  );
};

export default UserContextProvider; // Exporta el componente proveedor de contexto "UserContextProvider".
