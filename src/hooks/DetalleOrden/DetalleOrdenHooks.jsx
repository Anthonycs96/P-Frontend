import React, { useState, useEffect} from "react";
import { useAuthStore } from "../../VariblesStore";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const DetalleOrdenHooks = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [DetalleOrd, setDetalleOrd] = useState([]);
  const [sumatotal, setSumatotal] = useState([]);
  const { state } = useLocation();
  const mesaDetalle = state ? state.MesaOrdenDetalle : null;
  const { token, captureTokenFromAPI, showOrder, ID } = useAuthStore();
  const [total, setTotal] = useState(0);
  const tokenKey = token.replace(/"/g, "").split(":")[0];
  const [datosFacturaDetalle, setDatosFacturaDetalle] = useState([]);
  const [datosFactura, setDatosFactura] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);

  const idOrden = mesaDetalle ? mesaDetalle.ID_ORDEN : null;
  // const nombreMesa = mesaDetalle.NOMBRE_MESA;

  const handleFactura = async(DatosFactura,ID_MESAS)=>{
console.log(ID_MESAS)
const requestAgregarFactura = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${tokenKey}`,
    "x-access-token": `${tokenKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(DatosFactura),
};
try {
  const response = await fetch("http://localhost:3000/api/factura", requestAgregarFactura);
  const data = await response.json();
  //console.log(data.factura);
  if (data.factura.ID_FACTURA) {
    const FacturacionId = data.factura.ID_FACTURA;

    // Consulta a la API de facturas
    const detalleOrden = {
      headers: {
        Authorization: `Bearer ${tokenKey}`,
        "x-access-token": `${tokenKey}`,
        "Content-Type": "application/json",
      },
    };
    const facturaResponse = await fetch(`http://localhost:3000/api/factura/${FacturacionId}`, detalleOrden);
    const facturaData = await facturaResponse.json();
    setDatosFactura(facturaData.listarFacturacionDetalle)
    console.log(facturaData.listarFacturacionDetalle)
   
  
    // Consulta factura detalle al API
    const facturacionOrden = {
      headers: {
        Authorization: `Bearer ${tokenKey}`,
        "x-access-token": `${tokenKey}`,
        "Content-Type": "application/json",
      },
    };
    const facturacionOrdenResponse = await fetch(`http://localhost:3000/api/factura/ID/${FacturacionId}`, facturacionOrden);
    const facturaDetalleData = await facturacionOrdenResponse.json();
    setDatosFacturaDetalle(facturaDetalleData.listarFacturacion)

    // Consulta modificar estado de mesa al API
    const modificacionMesas = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenKey}`,
        "x-access-token": `${tokenKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ESTADO: "DESOCUPADA" })
    };
    const modificacionMesasResponse = await fetch("http://localhost:3000/api/mesas/estado/"+ID_MESAS, modificacionMesas);
    const modificacionMesasData = await modificacionMesasResponse.json();
    console.log(modificacionMesasData);
  }
  
} catch (error) {
  console.error("Error al enviar los datos de la Factura:", error);
}
}

useEffect(() => {
  if (datosFactura.length && datosFacturaDetalle.length) {
    setDatosCargados(true);
  }
}, [datosFacturaDetalle, datosFactura]);

useEffect(() => {
  if (datosCargados) {
    navigate('/Mesas', {
      state: {
        isOpen: true,
        datosFactura: datosFactura,
        datosFacturaDetalle: datosFacturaDetalle
      }
    });
  }
}, [datosCargados, datosFactura, datosFacturaDetalle, navigate]);


  const handleAgregar= async(AgregarOrden)=>{
    console.log(AgregarOrden);

    const requestAgregar = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenKey}`,
        "x-access-token": `${tokenKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AgregarOrden),
    };
    try {
      const response = await fetch("http://localhost:3000/api/detalleOrden", requestAgregar);
      const data = await response.json();
      console.log(requestAgregar);
    } catch (error) {
      console.error("Error al enviar los datos de la orden:", error);
    }
  }

  const btnonAddProduct=(product)=>{
    const existingProduct = cart.find((p) => p.ID_PRODUCTO === product.ID_PRODUCTO);

  if (existingProduct) {
    const updatedCart = cart.map((p) =>
      p.ID_PRODUCTO === existingProduct.ID_PRODUCTO ? { ...p, cantidad: p.cantidad + 1, total:(p.cantidad + 1)*p.VENTA_PRODUCTO} : p
    );
    setCart(updatedCart);
  } else {
    const newProduct = {
      ID_PRODUCTO: product.ID_PRODUCTO,
      IMAGEN_URL: product.IMAGEN_URL,
      NOMBRE_PRODUCTO: product.NOMBRE_PRODUCTO,
      VENTA_PRODUCTO: product.VENTA_PRODUCTO,
      cantidad: 1 ,// añadimos la cantidad inicial
      total: product.VENTA_PRODUCTO
    };
    setCart([...cart, newProduct]);
    //console.log([cart, newProduct])
  };
  };
  const btnonRemoveProduct = (product) => {
    const existingProduct = cart.find((p) => p.ID_PRODUCTO === product.ID_PRODUCTO);
  
    if (existingProduct.cantidad === 1) {
      // Si la cantidad es 1, eliminamos el producto del carrito
      const updatedCart = cart.filter((p) => p.ID_PRODUCTO !== existingProduct.ID_PRODUCTO);
      setCart(updatedCart);
    } else {
      // Si la cantidad es mayor a 1, actualizamos la cantidad y el total del producto
      const updatedCart = cart.map((p) =>
        p.ID_PRODUCTO === existingProduct.ID_PRODUCTO ? { ...p, cantidad: p.cantidad - 1, total: (p.cantidad - 1) * p.VENTA_PRODUCTO } : p
      );
      setCart(updatedCart);
    }
  };

  const btnonRemoveTotal = (product) => {
    const existingProduct = cart.find((p) => p.ID_PRODUCTO === product.ID_PRODUCTO);
    
    if (existingProduct.cantidad >= 1) {
      // Si la cantidad es 1, eliminamos el producto del carrito
      const updatedCart = cart.filter((p) => p.ID_PRODUCTO !== existingProduct.ID_PRODUCTO);
      setCart(updatedCart);
    }
  };

  const btnonDetalleOrden = (idOrden) => {
    if (!idOrden) return; // Si el idOrden no existe, no hagas nada.
    fetch(`http://localhost:3000/api/detalleOrden/DetalleOrderOrden/${idOrden}`, {
      headers: {
        Authorization: `Bearer ${tokenKey}`,
        "x-access-token": `${tokenKey}`, // esto es opcional, si el API utiliza 'x-access-token' como nombre del encabezado
      },
    })
      .then((response) => {
        useAuthStore.getState().captureStatusFromAPI(response.status);
        //console.log(response.status);
        //   throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setDetalleOrd(data.DetalleOrden);
        //console.log(data.DetalleOrden);
        let sumaTotal = 0;
        for (let i = 0; i < data.DetalleOrden.length; i++) {
          //console.log(data.DetalleOrden[i].SUMATOTAL);
          sumaTotal += data.DetalleOrden[i].TOTAL;
        }
        setSumatotal(sumaTotal);
  
        if (data.nuevoToken) {
          captureTokenFromAPI(data.nuevoToken);
        } // log de la respuesta del API con los datos
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
    btnonDetalleOrden(idOrden, token);
  }, [idOrden]);
  
  useEffect(() => {
    const newTotal = cart.reduce((acc, cur) => acc + cur.total, 0);
    setTotal(newTotal);
    //console.log(newTotal);
  }, [cart]);

  return {
    datosFactura,
    datosFacturaDetalle,
    cart,
    DetalleOrd,
    idOrden,
    sumatotal,
    total,
    btnonAddProduct,
    btnonRemoveProduct,
    btnonRemoveTotal,
    handleAgregar,
    handleFactura,
    btnonDetalleOrden
  }
  
}

