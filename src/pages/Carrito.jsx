import React, { useState, useEffect } from "react";
import {
  RiSearch2Line,
  RiCloseLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import Hora from "../hooks/Hora/Hora";
import { useParams } from "react-router-dom";
import TipoMesaHooks from "../hooks/TipoMesa/TipoMesaHooks";
import { CarritoHooks } from "../hooks/Carrito/CarritoHooks";
import { useAuthStore } from "../VariblesStore";
import Modal from "../components/Modal/Modal";
import {GeneradorID} from "../hooks/GeneradorID";

const Carrito = () => {
  const { formattedDate, formattedTime } = Hora();
  const { token, showOrder,ID } = useAuthStore();
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {tipoMesaHooks,tipoidHooks,handletipoidProduct}=TipoMesaHooks()
  const [observacion, setObservacion] = useState("");
  const{toggleOrder,btnonAddProduct,cart,btnonRemoveProduct,btnRemoveProduct,handleSubmit}=CarritoHooks();
  const tipoProducto = tipoMesaHooks;
  const idTipoProducto = tipoidHooks
  //console.log(tipoProducto);
  const { tableId, tableName, capacity } = useParams();
  const miID = GeneradorID();
  const fechaActual = new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima' })
  .split('/')
  .reverse()
  .join('-');
  console.log(fechaActual)

const horaActual = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
const fechaHoraActual = fechaActual+' ' + horaActual;

  const onAddProduct = (product) => {
    btnonAddProduct(product);
  };

  const onRemoveProduct = (product) => {
    btnonRemoveProduct(product);
  };

  const onRemoveTotal = (product) => {
    btnRemoveProduct(product);
  };

  const btntoggleOrder = () => {
    toggleOrder();
  };
  
  const btnFilter=(IDTIPOPRODUCTO)=>{
    handleTabChange(0)
    handletipoidProduct(IDTIPOPRODUCTO)
  }

  
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const newTotal = cart.reduce((acc, cur) => acc + cur.total, 0);
    setTotal(newTotal);
    //console.log(newTotal);
  }, [cart]);

  const onSubmit = (event) => {
    event.preventDefault();
    const tokenKey = token.replace(/"/g, "").split(":")[0];
    const orderData = {
      ID_MESA: tableId,
      ID_USUARIO:ID,
      FECHA_HORA_PEDIDO	:fechaHoraActual,
      TIEMPO_ESPERA :fechaHoraActual,
      HORA_ACEPTADO :fechaHoraActual,
      ID_ORDEN: miID,
      ID_TIPO_ORDEN: "1",
      TOTAL: total,
    };

    console.log(orderData)
        const datosDetalleOrden = cart.map((producto) => {
      return {
        ID_ORDEN: miID,
        ID_PRODUCTO: producto.ID_PRODUCTO,
        OBSERVACION: observacion,
        CANTIDAD: producto.cantidad,  
      };
    });

//console.log(orderData, datosDetalleOrden, tokenKey)
    handleSubmit(orderData, datosDetalleOrden, tokenKey);
  };
  
  return (
    <main className="lg:pl-28 grid grid-cols-1 lg:grid-cols-8 pt-4 pb-2 pr-4">
      <div className="lg:col-span-6 md:col-span-5">
        {/* header */}
        <header className="p-4">
          {/* titulo search */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            {/* >Gestor de Ordenes */}
            <div className="items-center">
              <h1 className="text-2xl text-gray-300 mr-4">Gestor de Ordenes</h1>
              <h1 className="text-2xl text-gray-100">{tableName}</h1>
              <p className="text-lg text-gray-400">Capacidad: {capacity}</p>
              <div className="text-xl text-gray-300 flex ">
                <span className="mr-1">Hora:{formattedTime}</span>
                
              </div>
            </div>
            <form  className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div
                className={`lg:px-8 xl:text-lg lg:text-lg text-sm px-2 xl:px-8  py-2 rounded-sm  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...`}
                onClick={handleOpenModal}
              >
                Crear Nuevo Catalogo
              </div>
              <div className="relative">
                <label htmlFor="busqueda" className="sr-only">
                  Buscar
                </label>
                <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  id="busqueda"
                  className="w-full py-2 pl-10 pr-4 bg-[#1f1d2b] rounded-lg text-gray-300 outline-none"
                  placeholder="Buscar"
                />
              </div>
            </form>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tipoProducto.map((TipoProduct,index) => (
                <div
                  key={index}
                  className={`px-2 py-1 rounded-sm cursor-pointer ${
                    activeTab ===  0
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-100 text-gray-600"
                  } bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...`}
                  onClick={() => btnFilter(TipoProduct.ID_TIPO_PRODUCTO)}
                >
                  {TipoProduct.TIPO_PRODUCTO}
                </div>
              ))}
              <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <h1>Contenido del modal</h1>
        <p>Este es el contenido del modal</p>
        <button onClick={handleCloseModal}>Cerrar</button>
      </Modal>
            </div>
            <div className="p-2 pt-4">
            <h2 className="text-xl text-gray-300">Productos:</h2>
              {activeTab === 0 && (
                <div className="h-[400px] md:h-[500px] xl:h-[540px] lg:h-[440px] overflow-scroll pt-14 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-center justify-center">
                {/* card */}
                {idTipoProducto.map((product,index) => (
                  <div
                    key={index}
                    className="group bg-[#1F1D2B]  hover:bg-[#ec7c6a]  py-8 px-14 sm:px-4 rounded-xl flex flex-col items-center text text-gray-300"
                    onClick={() => onAddProduct(product)}
                  >
                    <img
                      src={product.IMAGEN_URL}
                      className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full "
                    />
                    <p className="text-xl text-gray-400 group-hover:text-white">
                      {product.NOMBRE_PRODUCTO}
                    </p>
                    <span className="text-gray-400 group-hover:text-white">
                      {product.DESCRIPCION_PRODUCTO}
                    </span>
                    <p className="text-gray-600 group-hover:text-white">
                      S/.{product.VENTA_PRODUCTO}
                    </p>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </header>
      </div>
      <form  onSubmit={onSubmit} className={`lg:col-span-2 md:col-span-3 fixed lg:static top-0 bg-[#1F1D2B] w-full h-full transition-all duration-500 ${
          showOrder ? "right-0" : "-right-full"
        }`}
      >
        {/* orden */}
        <div className="relative pt-16 text-gray-300 p-2 h-full ">
          <RiCloseLine
            onClick={btntoggleOrder}
            className="absolute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"
          />
          <div className="text-xl text-gray-300 flex ">

          <span className="text-2xl my-4">Orden:{miID}</span>
          </div>

          {/*  */}

          {/* card */}
          <div>
            <div className="grid grid-cols-6 mb-2 p-4">
              <h5 className="col-span-3">items</h5>
              <h5 className="col-span-2">Cant.</h5>
              <h5>Precio</h5>
            </div>
            {/* productos */}
            <div className="h-[400px] md:h-[500px] xl:h-[540px] lg:h-[440px] overflow-scroll">
              {/* product */}
              {cart.map((product,index) => (
                <div className="bg-[#262837] p-4 rounded-xl mb-4" 
                key={index}
                >
                  <div className="grid grid-cols-6 mb-2">
                    {/* descripcion de producto */}

                    <div className="col-span-3 flex items-center gap-3">
                      <img
                        src={product.IMAGEN_URL}
                        className="w-10 h-10 object-cover rounded-full"
                      />

                      <div>
                        <h5 className="text-sm">{product.NOMBRE_PRODUCTO}</h5>
                        <p className="text-xs text-gray-500">
                          S/{parseFloat(product.total).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {/* QTY */}
                    <div className="col-span-2">
                      <a onClick={() => onRemoveProduct(product)}
                        className="bg-[#1F1D2B] hover:bg-[#ec7c6a] px-2 rounded-lg">-</a>
                      <span className="px-1">{product.cantidad}</span>
                      <a 
                       onClick={() => onAddProduct(product)}
                      className="bg-[#ec7c6a] px-2 rounded-lg">+</a>
                    </div>
                    {/* precio */}
                    <div className="">
                      <span>{product.VENTA_PRODUCTO}</span>
                    </div>
                  </div>
                  {/* notas */}
                  <div className="grid grid-cols-6 items-center">
                    <div className="col-span-5">
                      <input
                        type="text"
                        className="bg-[#1F1D2B] py-1 xl:px-10 lg:px-0 rounded-lg outline-none"
                        placeholder="Observacion....."
                        // value={null}
                        // onChange={(e) => setObservacion(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                         onClick={() => onRemoveTotal(product)}
                        className="border border-red-500 p-2 rounded-lg"
                      >
                        <RiDeleteBin6Line className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* submit paymet */}
          <div className="bg-[#262837] w-full absolute bottom-0 left-0 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Descuento</span>
              <span>S/.0</span>
            </div>
            <div className="flex items-center justify-between  mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span>S/{parseFloat(total).toFixed(2)}</span>
            </div>
            <div>
              <button
                className="bg-[#ec7c6a] w-full py-4 px4 rounded-xl"
                type="submit"
              >
                Continuar Compra ...
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Carrito;
