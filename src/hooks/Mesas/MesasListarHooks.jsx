import React, {useEffect,useState } from "react";
import { useAuthStore } from "../../VariblesStore";

const MesasListarHooks = () => {
    const [mesas, setMesas] = useState([]);
    const { token, captureTokenFromAPI} = useAuthStore();

    useEffect(() => {
        if (!token) return;
        const tokenKey = token.replace(/"/g, "").split(":")[0];
    
        fetch("http://localhost:3000/api/mesas", {
          headers: {
            Authorization: `Bearer ${tokenKey}`,
            "x-access-token": `${tokenKey}`,
          },
        })
          .then((response) => {
            useAuthStore.getState().captureStatusFromAPI(response.status);
            return response.json();
          })
          .then((data) => {
            setMesas(data.listarMesas);
            //console.log(data.listarMesas);
            if (data.nuevoToken) {
              captureTokenFromAPI(data.nuevoToken);
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.status &&
              error.response.status === 401
            ) {
              // Do nothing, since this is an expected error condition
            } else {
              console.error(error);
            }
          });
      }, []);
  return mesas
}

export default MesasListarHooks