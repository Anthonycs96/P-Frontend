import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../VariblesStore";
import { useNavigate } from "react-router-dom";


export const CarritoHooks = () => {
    const navigate = useNavigate();
    const { capturarStatusSMobil,showOrder,token, captureTokenFromAPI,ID } =  useAuthStore();
    const [cart, setCart] = useState([]);

    const handleSubmit = async (orderData,datosDetalleOrden, tokenKey) => { 
  
        const requestOrden = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenKey}`,
            "x-access-token": `${tokenKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        };
    
        const requestDetalleOrden = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenKey}`,
            "x-access-token": `${tokenKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosDetalleOrden),
        };
        const requestMesa = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${tokenKey}`,
            "x-access-token": `${tokenKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ESTADO: "ocupada" }), // nuevo estado de la mesa
        };
    
        try {
          const response = await fetch("http://localhost:3000/api/orden", requestOrden);
          const data = await response.json();
          console.log(data.ID_MESA);
          console.log(requestOrden);
            
          if (data.ID_ORDEN) {
            console.log(data.ID_MESA)
            const responseDO = await fetch("http://localhost:3000/api/detalleOrden", requestDetalleOrden);
            const dataDO = await responseDO.json();
            
            const responseMesa = await fetch("http://localhost:3000/api/mesas/estado/" + data.ID_MESA, requestMesa);
      const dataMesa = await responseMesa.json();
           // window.location.href = 'http://localhost:5173/Mesas';
            navigate("/Mesas", { replace: true })
          }
  
        } catch (error) {
          console.error("Error al enviar los datos de la orden:", error);
        }
      };

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
      }
      }
    
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
    
      const btnRemoveProduct = (product) => {
        const existingProduct = cart.find((p) => p.ID_PRODUCTO === product.ID_PRODUCTO);
        
        if (existingProduct.cantidad >= 1) {
          // Si la cantidad es 1, eliminamos el producto del carrito
          const updatedCart = cart.filter((p) => p.ID_PRODUCTO !== existingProduct.ID_PRODUCTO);
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
  const toggleOrder = () => {
    capturarStatusSMobil(!showOrder);
};

const onSubmit = (event) => {
  event.preventDefault();
  const tokenKey = token.replace(/"/g, "").split(":")[0];

  const orderData = {
    ID_MESA: tableId,
    ID_USUARIO:ID,
    ID_ORDEN: idOrden,
    ID_TIPO_ORDEN: "1",
    TOTAL: total,
  };

  const datosDetalleOrden = cart.map((producto) => {
    return {
      ID_ORDEN: idOrden,
      ID_PRODUCTO: producto.ID_PRODUCTO,
      OBSERVACION: observacion,
      CANTIDAD: producto.cantidad,
    };
  });

  handleSubmit(orderData, datosDetalleOrden, tokenKey);
};

  return {
    cart,
    handleSubmit,
    btnonAddProduct,
    btnonRemoveProduct,
    btnRemoveProduct,
    btnonRemoveTotal,
    toggleOrder,
  };
}
