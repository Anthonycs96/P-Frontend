import React, {useEffect,useState } from "react";
import { useAuthStore } from "../../VariblesStore";

export const MesasListarStadoHooks = (estado='OCUPADA') => {
  const [mesasEstados, setMesasEstados] = useState([]);
      const { token, captureTokenFromAPI} = useAuthStore();

  const handleEstadoClick = (estado) => {
    //console.log(estado);
    if (!token) return;
    const tokenKey = token.replace(/"/g, "").split(":")[0];
    fetch(`http://localhost:3000/api/mesas/especial/${estado}`, {
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
        //console.log(data.listarMesas[0].ID_MESA);
        //console.log(data);
        setMesasEstados(data.mesaDetalleOrden);
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
  };
  useEffect(() => {
    handleEstadoClick(estado); // inicializa el componente con estado "ocupada"
  }, []);
  return {
    mesasEstados,
    handleEstadoClick
  }
};
