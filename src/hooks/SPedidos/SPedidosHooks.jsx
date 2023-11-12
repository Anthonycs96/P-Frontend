import React, {useEffect,useState } from "react";
import { useAuthStore } from "../../VariblesStore";

const SPedidosHooks = () => {
    const [Lpedidos, setLpedidos] = useState([]);
    const { token, captureTokenFromAPI} = useAuthStore();
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(null);
   

    useEffect(()=>{
        if (!token) return;
        const tokenKey = token.replace(/"/g, "").split(":")[0];

        fetch("http://localhost:3000/api/orden", {
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
            setLpedidos(data.listarOrden)
            //console.log(data.listarOrden)

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

    useEffect(() => {
      if (Lpedidos && Lpedidos.length > 0) {
        Lpedidos.map((pedido) => {
          const fechaPedido = new Date(pedido.HORA_ACEPTADO);
          //console.log(fechaPedido)
          const fechaActual = new Date();
    
          const tiempoTranscurridoEnMilisegundos =
            fechaActual.getTime() - fechaPedido.getTime();
    
          const segundosTranscurridos = tiempoTranscurridoEnMilisegundos / 1000;
          const horasTranscurridas = Math.floor(segundosTranscurridos / 3600);
          const minutosTranscurridos = Math.floor((segundosTranscurridos % 3600) / 60);
          const segundosRestantes = Math.floor(segundosTranscurridos % 60);
    
          const tiempoTranscurrido = `${horasTranscurridas}:${minutosTranscurridos}:${segundosRestantes}`;
    
          // Actualizar el estado de cada pedido con el tiempo transcurrido
          setTiempoTranscurrido(tiempoTranscurrido);
        });
    
        // Actualizar el tiempo transcurrido cada segundo para todos los pedidos
        const intervalId = setInterval(() => {
          Lpedidos.map((pedido) => {
            const fechaPedido = new Date(pedido.HORA_ACEPTADO);
            const fechaActual = new Date();
    
            const tiempoTranscurridoEnMilisegundos =
              fechaActual.getTime() - fechaPedido.getTime();
    
            const segundosTranscurridos = tiempoTranscurridoEnMilisegundos / 1000;
            const horasTranscurridas = Math.floor(segundosTranscurridos / 3600);
            const minutosTranscurridos = Math.floor((segundosTranscurridos % 3600) / 60);
            const segundosRestantes = Math.floor(segundosTranscurridos % 60);
    
            const tiempoTranscurrido = `${horasTranscurridas}:${minutosTranscurridos}:${segundosRestantes}`;
    
            // Actualizar el estado de cada pedido con el tiempo transcurrido
            setTiempoTranscurrido(tiempoTranscurrido);
            //console.log(tiempoTranscurrido)
          });
        }, 1000);
    
        return () => clearInterval(intervalId);
      }
    }, [Lpedidos]);
    


  return {Lpedidos,tiempoTranscurrido
  };
}
export default SPedidosHooks;