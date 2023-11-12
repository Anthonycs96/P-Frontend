import React, { useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
  RiDeleteBin6Line,
} from "react-icons/ri";
import Modal from "../components/Modal/Modal";
import { DetalleOrdenHooks } from "../hooks/DetalleOrden/DetalleOrdenHooks";
import Hora from "../hooks/Hora/Hora";
import TipoMesaHooks from "../hooks/TipoMesa/TipoMesaHooks";
import { useAuthStore } from "../VariblesStore";
import {GeneradorID} from "../hooks/GeneradorID";

const DetalleOrden = () => {
  const miIDFC = "FACT" + GeneradorID();
  const {ID } = useAuthStore();
  const { formattedDate, formattedTime } = Hora();
  const isMobile = navigator.userAgent.match(/Mobi/);
  const {
    cart,
    sumatotal,
    DetalleOrd,
    total,
    btnonAddProduct,
    btnonRemoveProduct,
    btnonRemoveTotal,
    handleAgregar,
    handleFactura
  } = DetalleOrdenHooks();
  const { tipoMesaHooks, tipoidHooks, handletipoidProduct } = TipoMesaHooks();
  const { state } = useLocation();
  const mesaDetalle = state?.MesaOrdenDetalle; //captura la mesaDetalle que viene de mesas
  const ID_MESAS= mesaDetalle?.ID_MESA;
  const miID_Orden = mesaDetalle?.ID_ORDEN;
  const nombreMesa = mesaDetalle?.NOMBRE_MESA;
  const [activeTab, setActiveTab] = useState(0);
  const [observacion, setObservacion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const tipoProducto = tipoMesaHooks;
  const idTipoProducto = tipoidHooks;
  const [montoPago, setMontoPago] = useState(0);
  const [vuelto, setVuelto] = useState(0);
  //console.log(ID_MESAS)

  const btnPagar =()=>{

    const DatosFactura = {
      ID_FACTURA:miIDFC,
      ID_ORDEN: miID_Orden,
      TOTAL: sumatotal,
      MONTO_PAGADO: montoPago,
      VUELTO: vuelto,
      ID_USUARIO: ID
    };
    handleFactura(DatosFactura,ID_MESAS)
//console.log(factura);
  }

  const btnAgregar = () => {
    const AgregarOrden = cart.map((objetoNOrden) => ({
      ID_ORDEN: miID_Orden,
      ID_PRODUCTO: objetoNOrden.ID_PRODUCTO,
      OBSERVACION: observacion,
      CANTIDAD: objetoNOrden.cantidad,
      ESTADO_PAGO: "PENDIENTE",
    }));

    handleAgregar(AgregarOrden);
    window.location.reload();
  };

  const btnFilter = (IDTIPOPRODUCTO) => {
    setActiveTab(0);
    handletipoidProduct(IDTIPOPRODUCTO);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const onAddProduct = (product) => btnonAddProduct(product);

  const onRemoveProduct = (product) => btnonRemoveProduct(product);

  const onRemoveTotal = (product) => btnonRemoveTotal(product);

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  const handleChange = (event) => {
    const nuevoMontoPago = parseFloat(event.target.value);

    if (event.target.value === "") {
      setMontoPago("");
      setVuelto("");
    } else if (!isNaN(nuevoMontoPago)) {
      const nuevoVuelto = nuevoMontoPago - parseFloat(sumatotal);
      setMontoPago(nuevoMontoPago);
      setVuelto(nuevoVuelto);
    } else {
      setMontoPago(event.target.value);
      setVuelto("");
    }
  };

  return (
    <Fragment>
      <main className="lg:pl-28 mb-14 md:mb-0">
        <div className="mx-auto grid lg:grid-cols-8 p-2 pb-2 pt-8 gap-4">
          <div className="lg:col-span-8 md:col-span-full">
            <div>
              <h1 className="text-2xl text-gray-300">
                Detalle de la {nombreMesa}
              </h1>
              <div className="text-xl text-gray-300 flex ">
                <span className="mr-1">Hora:{formattedTime}</span>
                <p></p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 lg:col-span-2 md:col-span-6 rounded-lg">
            <div className="p-4 bg-[#1f1d2b] grid grid-cols-1 gap-2 items-center justify-center rounded-lg">
              <h1 className="text-2xl my-2 text-gray-300">Orden:{miID_Orden}</h1>
              <div className="grid grid-cols-5 mb-2 p-2 bg-[#262837] rounded-xl">
                <h5 className="col-span-3">items</h5>
                <h5 className="col-span-1">Cant.</h5>
                <h5 className="">Precio</h5>
              </div>
              <div className="h-[400px] md:h-[500px] lg:h-[505px] xl:h-[620px] overflow-scroll">
                {DetalleOrd.map((objetoDtll, index) => (
                  <div className="bg-[#262837] p-1 rounded-xl mb-4" key={index}>
                    <div className="grid grid-cols-5 mb-2">
                      {/* descripcion de producto */}
                      <div className="col-span-3 flex items-center gap-3">
                        <img
                          src={objetoDtll.IMAGEN_URL}
                          className="w-10 h-10 object-cover rounded-full"
                        />

                        <div>
                          <h5 className="text-sm">
                            {objetoDtll.NOMBRE_PRODUCTO}
                          </h5>
                        </div>
                      </div>

                      {/* QTY */}
                      <div className="col-span-1">
                        <span className="px-1">{objetoDtll.CANTIDAD}</span>
                      </div>
                      {/* precio */}
                      <div className="">
                        <span>{parseFloat(objetoDtll.TOTAL).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 md:col-span-6 rounded-lg">
            <div className="items-center justify-between mb-0">
              {/* <h2 className="text-xl text-gray-300">Choose Dishes</h2> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 md:gap-2">
              <div className="md:col-span-2 lg:col-span-2 p-4 bg-[#1f1d2b] grid grid-cols-1 gap-2 items-center justify-center rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  <h2 className="xl:col-span-3 lg:col-span-2 xl:text-2xl lg:text-lg text-gray-300">
                    Productos para Agregar
                  </h2>
                  <div className="xl:col-span-1 lg:col-span-2 text-right">
                    <a
                      className="px-2 p-1 rounded-lg bg-[#2E86C1]"
                      onClick={() => btnAgregar(cart)}
                    >
                      Agregar
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-6 mb-2 p-2  bg-[#262837] rounded-xl">
                  <h5 className="col-span-3">items</h5>
                  <h5 className="col-span-2">Cant.</h5>
                  <h5>Precio</h5>
                </div>
                <div className="h-[400px] md:h-[500px] xl:h-[540px] lg:h-[440px] overflow-scroll">
                  {cart.map((objetoNOrden) => (
                    <div
                      className="bg-[#262837] p-1 rounded-xl mb-4"
                      key={objetoNOrden.ID_PRODUCTO}
                    >
                      <div className="grid grid-cols-6 mb-2 gap-1">
                        {/* descripcion de producto */}
                        <div className="col-span-3 flex items-center gap-1">
                          <img
                            src={objetoNOrden.IMAGEN_URL}
                            className="xl:w-14 xl:h-14 lg:w-10 lg:h-10 object-cover rounded-full"
                          />

                          <div>
                            <h5 className="text-sm">
                              {objetoNOrden.NOMBRE_PRODUCTO}
                            </h5>
                          </div>
                        </div>

                        {/* QTY */}
                        <div className="col-span-2 flex lg:flex-col xl:flex-row items-center">
                          <a
                            className="bg-[#1F1D2B] hover:bg-[#ec7c6a] px-3 rounded-lg"
                            onClick={() => onAddProduct(objetoNOrden)}
                          >
                            +
                          </a>
                          <span className="px-1">{objetoNOrden.cantidad}</span>
                          <a
                            className="bg-[#1F1D2B] hover:bg-[#ec7c6a] px-3 rounded-lg "
                            onClick={() => onRemoveProduct(objetoNOrden)}
                          >
                            -
                          </a>
                        </div>
                        {/* precio */}
                        <div className="">
                          <span>
                            {parseFloat(objetoNOrden.total).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {/* notas */}
                      <div className="grid grid-cols-6 items-center">
                        <div className="col-span-5">
                          <input
                            type="text"
                            className="bg-[#1F1D2B] py-1 xl:px-10 lg:px-0 rounded-lg outline-none"
                            placeholder="Observacion....."
                            value={observacion}
                            onChange={(e) => setObservacion(e.target.value)}
                          />
                        </div>
                        <div>
                          <button
                            className="border border-red-500 p-2 rounded-lg"
                            onClick={() => onRemoveTotal(objetoNOrden)}
                          >
                            <RiDeleteBin6Line className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 lg:col-span-4 rounded-lg">
                <div>
                  <div className="grid grid-cols-6 m-1 p-4 bg-[#1F1D2B] rounded-xl">
                    <h5 className="col-span-2">Total Orden</h5>
                    <h5 className="col-span-2">
                      {parseFloat(sumatotal).toFixed(2)}
                    </h5>
                  </div>
                  <div className="grid grid-cols-6 m-1 p-4 bg-[#1F1D2B] rounded-xl">
                    <h5 className="col-span-2">Total Agregado</h5>
                    <h5 className="col-span-2">
                      {parseFloat(total).toFixed(2)}
                    </h5>
                  </div>
                  <div>
                    <div>
                      <nav className="flex flex-wrap text-gray-300 items-center justify-between border-b gap-1">
                        {tipoProducto.map((TipoProduct) => (
                          <div
                            key={TipoProduct.ID_TIPO_PRODUCTO}
                            className={`flex-grow px-2 py-1 rounded-sm cursor-pointer ${
                              activeTab === 0
                                ? "bg-gray-300 text-gray-800"
                                : "bg-gray-100 text-gray-600"
                            } bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...`}
                            onClick={() =>
                              btnFilter(TipoProduct.ID_TIPO_PRODUCTO)
                            }
                          >
                            {TipoProduct.TIPO_PRODUCTO}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>
                  {activeTab === 0 && (
                    <div className="p-4 grid lg:grid-cols-3 lg:gap-4 md:gap-6 gap-2 items-center justify-center bg-[#1f1d2b] rounded-lg h-[400px] md:h-[500px] lg:h-[350px] xl:h-[470px] overflow-scroll">
                      {/* card */}

                      {/* card */}
                      {idTipoProducto.map((product) => (
                        <div
                          key={product.ID_PRODUCTO}
                          className="lg:mt-16 mt-28 group bg-[#262837] hover:bg-[#ec7c6a] lg:py-8 px-14 sm:px-2 rounded-xl flex flex-col items-center text text-gray-300"
                          onClick={() => onAddProduct(product)}
                        >
                          <img
                            src={product.IMAGEN_URL}
                            className="w-36 h-36 object-cover -mt-20 shadow-2xl rounded-full "
                          />
                          <p className="text-lg text-gray-400 group-hover:text-white">
                            {product.NOMBRE_PRODUCTO}
                          </p>
                          <span className="text-sm text-gray-400 group-hover:text-white">
                            {product.DESCRIPCION_PRODUCTO}
                          </span>
                          <p className="text-gray-600 group-hover:text-white">
                            S/.{product.VENTA_PRODUCTO}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-[#1F1D2B] mt-1 p-4 rounded-xl">
                    <div>
                      <button
                        className="bg-[#ec7c6a] w-full py-4 px4 rounded-xl"
                        type="submit"
                        onClick={handleOpenModal}
                        //onClick={handleCartItemSelection}
                      >
                        Continuar Compra ...
                      </button>
                    </div>
                  </div>
                  <Modal isOpen={isOpen} onClose={handleCloseModal}>
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                      <div className="w-[600px] flex flex-col">
                        <button
                          className="text-white text-xl place-self-end"
                          onClick={handleCloseModal}
                        >
                          X
                        </button>

                        <div className="bg-white p-5 rounded-lg">
                          <div>
                          <div>
                                <div className="flex justify-center items-center text-xl pb-8">
                                  <h3>Pagar Pedido</h3>
                                </div>
                                <div className="grid grid-cols-6 mb-2 p-2 bg-gray-500 rounded-md">
                                  <h5 className="col-span-3">Items</h5>
                                  <h5 className="col-span-2">Cant.</h5>
                                  <h5>Precio</h5>
                                </div>
                                {DetalleOrd.map((objetoDtll, index) => (
                                  <div
                                    className="grid grid-cols-6 mb-2 p-3 bg-gray-200 rounded-md"
                                    key={index}
                                  >
                                    <div className="col-span-3 flex items-center gap-3">
                                      <img
                                        src={objetoDtll.IMAGEN_URL}
                                        className="w-10 h-10 object-cover rounded-full"
                                      />
                                      <div>
                                        <h5 className="text-sm">
                                          {objetoDtll.NOMBRE_PRODUCTO}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-span-2">
                                      {objetoDtll.CANTIDAD}
                                    </div>
                                    <div>
                                      S/.
                                      {parseFloat(objetoDtll.TOTAL).toFixed(2)}
                                    </div>
                                  </div>
                                ))}
                                <div>
                                  <div className="grid grid-cols-6 mb-2 p-2 bg-gray-400 rounded-md">
                                    <h5 className="col-span-5">Total:</h5>
                                    <h5 className="col-span-1">
                                      S/.{parseFloat(sumatotal).toFixed(2)}
                                    </h5>
                                    <h5 className="col-span-5">Pago:</h5>
                                    <input
                                      type="tel"
                                      pattern="[0-9]*"
                                      className="col-span-1 rounded-md"
                                      value={montoPago}
                                      onChange={handleChange}
                                      placeholder="S/."
                                    />
                                    <h5 className="col-span-5">Vuelto:</h5>
                                    {typeof vuelto === "number" ? (
                                      <h5 className="col-span-1">
                                        S/.{vuelto.toFixed(2)}
                                      </h5>
                                    ) : (
                                      <h5 className="col-span-1">S/.0.00</h5>
                                    )}
                                  </div>
                                </div>
                              </div>
                            <div>
                            <div>
                            {isMobile ? (
    <p>Lo siento, la factura no se puede ver en dispositivos móviles.</p>
  ) : (
    <>
    {montoPago === undefined || montoPago <= 0 || montoPago === '' ? (
      <div>
        <p>Por favor ingrese el monto de la moneda de pago.</p>
        <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" disabled>
          Pagar
        </button>
      </div>
    ) : (
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-green-600 transition duration-300 ease-in-out" onClick={btnPagar}>
        Pagar
      </button>
    )}
    </>
  )}
  </div>
        </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default DetalleOrden;
