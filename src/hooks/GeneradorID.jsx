import React, { useState, useEffect } from "react";

export const GeneradorID = () => {
  const [idOrden, setIdOrden] = useState('');
    function generarID() {
        // Generar una cadena única combinando la fecha actual y un número aleatorio
        const fechaActual = new Date().getTime().toString();
        const numeroAleatorio = Math.random().toString().substring(2, 2);
        const idOrden1 = fechaActual + numeroAleatorio;
    
        const idOrden = idOrden1.slice(-6);
        return idOrden;
      }
      useEffect(() => {
        const miID = generarID();
        setIdOrden(miID);
      }, []);
  return idOrden
}