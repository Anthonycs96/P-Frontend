import React, {useEffect,useState } from "react";
import { useAuthStore } from "../../VariblesStore";

const TipoMesaHooks = (Idproduct=1) => {
    const [tipoMesaHooks, setTipoMesaHooks] = useState([]);
    const [tipoidHooks, setTipoidHookss] = useState([]);
    const { token, captureTokenFromAPI} = useAuthStore();

    useEffect(() => {
        if (!token) return;
        const tokenKey = token.replace(/"/g, "").split(":")[0];
    
        fetch("http://localhost:3000/api/tipoproducto", {
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
            setTipoMesaHooks(data.listarTipoProducto);
            // console.log(data.listarMesas);
            //console.log(data);
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

      const handletipoidProduct = (Idproduct) => {
        //console.log(Idproduct);
        if (!token) return;
        const tokenKey = token.replace(/"/g, "").split(":")[0];
        fetch(`http://localhost:3000/api/tipoproducto/idtipproduct/${Idproduct}`, {
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
            setTipoidHookss(data.listarIDTIPOPRODUCTO);
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
        handletipoidProduct(Idproduct); // inicializa el componente con estado "ocupada"
      }, []);
  return {
    tipoMesaHooks,
    tipoidHooks,
    handletipoidProduct
  }
}

export default TipoMesaHooks