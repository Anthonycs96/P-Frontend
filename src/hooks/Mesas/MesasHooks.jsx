import React, { useState, useEffect} from "react";
import { useAuthStore } from "../../VariblesStore";
import { useNavigate } from "react-router-dom";

export const MesasHooks = () => {
  const navigate = useNavigate();

  const btnNuevaOrden= (table) => {
    const {
      CAPACIDAD,
      DESCRIPCION,
      ID_MESA,
      IMAGEN_URL,
      NOMBRE_MESA,
    }=table
    console.log(table);
    navigate(`/Mesas/Carrito/${ID_MESA}/${NOMBRE_MESA}/${CAPACIDAD}`)
  };

  const btnDetalleOrden =(MesaOrdenDetalle, DetalleOrdenHooks)=>{
    navigate(`/Mesas/DetalleOrden`, { state: { MesaOrdenDetalle, DetalleOrdenHooks } })
  }
  const btnACarritoCompras =()=>{
    navigate(`/Mesas/Carrito`)
  }
  return {
    btnNuevaOrden,
    btnDetalleOrden,
    btnACarritoCompras
  };
};
