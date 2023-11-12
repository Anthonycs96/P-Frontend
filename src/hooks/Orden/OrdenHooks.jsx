import React from "react";
import { useAuthStore } from "../../VariblesStore";

export const OrdenHooks = () => {
  const { token, captureTokenFromAPI } = useAuthStore();
  const tokenKey = token.replace(/"/g, "").split(":")[0];
  const btnupOrden = async (ID_ORDEN, ESTADO_PEDIDO, HORAACEPTADO) => {
    const fecha = new Date(HORAACEPTADO);
    // obtiene los componentes de fecha y hora del objeto de fecha
    const year = fecha.getFullYear();
    const month = ("0" + (fecha.getMonth() + 1)).slice(-2);
    const day = ("0" + fecha.getDate()).slice(-2);
    const hours = ("0" + fecha.getHours()).slice(-2);
    const minutes = ("0" + fecha.getMinutes()).slice(-2);
    const seconds = ("0" + fecha.getSeconds()).slice(-2);
    // construye la cadena de fecha en el formato deseado
    const HORA_ACEPTADO = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(HORA_ACEPTADO); // "2023-05-05 12:37:29"
    try {
      if (!ID_ORDEN) return; // Si el idOrden no existe, no hagas nada.
      //console.log(HORA_ACEPTADO);
      const actualizarOrden = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenKey}`,
          "x-access-token": `${tokenKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ESTADO_PEDIDO, HORA_ACEPTADO }),
      };
      const DetalleactualizarOrden = await fetch(
        `http://localhost:3000/api/orden/${ID_ORDEN}`,
        actualizarOrden
      );
      console.log(DetalleactualizarOrden);
      // console.log(ID_ORDEN,ESTADO_PEDIDO,HORAACEPTADO )
    } catch (error) {
      console.error("Error al enviar los datos de la Factura:", error);
    }
  };
  return {
    btnupOrden,
  };
};
