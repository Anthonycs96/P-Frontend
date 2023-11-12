import React, { useState, useEffect } from "react";
import {
  RiSearch2Line
} from "react-icons/ri";
import Facturacion from "../components/Facturacion/Facturacion";
import { useLocation } from 'react-router-dom';
import Hora from "../hooks/Hora/Hora";
import { useAuthStore } from "../VariblesStore";
import MesasListarHooks from "../hooks/Mesas/MesasListarHooks";
import { MesasListarStadoHooks } from "../hooks/Mesas/MesasListarStadoHooks";
import { MesasHooks } from "../hooks/Mesas/MesasHooks";
import Modal from "../components/Modal/Modal";

const Mesas = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(location.state?.isOpen ?? false);
  const datosFactura = location.state ? location.state.datosFactura : null;
  const datosFacturaDetalle = location.state ? location.state.datosFacturaDetalle[0] : null;
  const { formattedDate, formattedTime } = Hora();
  //console.log(datosFacturaDetalle)
  const { token} = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);
  const mesas = MesasListarHooks(token);
  const { handleEstadoClick, mesasEstados } = MesasListarStadoHooks();
  const { btnNuevaOrden, btnDetalleOrden,btnACarritoCompras } = MesasHooks();

  const nuevaOrden = (table) => {
    btnNuevaOrden(table);
  };

  const onDetalleOrden = (MesaOrdenDetalle) => {
    //console.log(MesaOrdenDetalle)
    btnDetalleOrden(MesaOrdenDetalle);
  };

  const onNuevaOrden = (table) => {
    btnNuevaOrden(table);
  };

  const handleCloseModal = () => {
    //console.log("cerrar");
    setIsOpen(false);
  };
  

  const btnEstadoOcupada = (estado) => {
    handleTabChange(1);
    handleEstadoClick(estado);
  };

  const btnEstadoDesocupada = (estado) => {
    handleTabChange(2);
    handleEstadoClick(estado);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <main className="lg:pl-28 grid xl:grid-cols-1 lg:grid-cols-12 pt-8 pb-2">
      <div className="lg:col-span-12 md:col-span-5">
        <header className="p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div className="items-center">
              <h1 className="text-2xl text-gray-300 mr-4">Gestor de Mesas</h1>
              <div className="text-xl text-gray-300 flex ">
                <span className="mr-1">Hora:{formattedTime}</span>
                
              </div>
            </div>
            <form
              action=""
              className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6"
            >
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
          <div className="grid grid-cols-1">
            <div className="flex xl:gap-4 lg:gap-4 gap-2 flex-wrap">
              <div
                className={`lg:px-8 xl:text-lg lg:text-lg text-sm xl:px-8 px-2 py-2 rounded-sm ${
                  activeTab === 0
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-600"
                }  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...`}
                onClick={() => handleTabChange(0)}
              >
                Todas las Mesas
              </div>
              <div
                className={`lg:px-8 xl:text-lg lg:text-lg text-sm xl:px-8 px-2 py-2 rounded-sm ${
                  activeTab === 1
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-600"
                } bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...`}
                tabIndex="1"
                onClick={() => btnEstadoOcupada("OCUPADA")}
              >
                Mesas Ocupadas
              </div>
              <div
                className={`lg:px-8 xl:text-lg lg:text-lg text-sm xl:px-8 px-2 py-2 rounded-sm ${
                  activeTab === 2
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-600"
                }  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...`}
                onClick={() => btnEstadoDesocupada("DESOCUPADA")}
              >
                Mesas Disponibles
              </div>
            </div>
            <div className="p-2 pt-8">
              {activeTab === 0 && (
                <>
                  <h2 className="text-xl text-gray-300">
                    Listar Todas las Mesas:
                  </h2>
                  <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-6 lg:gap-6 gap-2 items-center justify-center">
                    {/* card */}
                    {mesas.map((table) => (
                      <div
                        className="dropdown relative flex flex-col justify-center "
                        key={table.ID_MESA}
                      >
                        <button
                          id="button1"
                          className="bg-[#1F1D2B] group py-12 lg:px-4 xl:px-8 px-2 rounded-xl flex flex-col items-center text text-gray-300 w-full"
                        >
                          <img
                            src={table.IMAGEN_URL}
                            className="group-hover:bg-[#ec7c6a] group-hover:ring-4 group-hover:ring-[#ec7c6a] w-40 h-40 object-cover -mt-10 shadow-2xl rounded-full  bg-slate-200 group"
                            style={{ marginTop: "-40px" }}
                          />
                          <p className="text-xl text-gray-400">
                            {table.NOMBRE_MESA}
                          </p>
                          <span className="text-gray-400">
                            Personas:{table.CAPACIDAD}
                          </span>
                          <p className="text-gray-600">{table.DESCRIPCION}</p>
                        </button>
                        <ul className="dropdown-menu absolute z-10 bg-white rounded shadow-md mt-2 left-0 top-1/2 hidden flex justify-center group-hover:block">
                          {table.ESTADO === "OCUPADA" && (
                            <div className="p-2">
                              <a
                                onClick={() => onDetalleOrden(table)}
                                className="px-3 py-2 hover:bg-[#ec7c6a] rounded"
                              >
                                Detalles Orden
                              </a>
                            </div>
                          )}
                          {table.ESTADO === "DESOCUPADA" && (
                            <li
                              key={`table-${table.NUMERO}`}
                              className="px-3 py-2 hover:bg-[#ec7c6a] rounded"
                            >
                              <a
                                href="#"
                                onClick={() => onNuevaOrden(table)}
                                type="submit"
                              >
                                Nueva Orden
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 1 && (
                <>
                  <h2 className="text-xl text-gray-300">Mesas Ocupadas:</h2>
                  <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-6 lg:gap-6 gap-2 items-center justify-center">
                    {/* card */}
                    {mesasEstados.map((mesa) => (
                      <div
                        className="dropdown relative flex flex-col justify-center "
                        key={mesa.ID_MESA}
                      >
                        <button
                          id="button1"
                          className="bg-[#1F1D2B] group py-12 lg:px-4 xl:px-8 px-2 rounded-xl flex flex-col items-center text text-gray-300 w-full"
                        >
                          <img
                            src={mesa.IMAGEN_URL}
                            className="group-hover:bg-[#ec7c6a] group-hover:ring-4 group-hover:ring-[#ec7c6a] w-40 h-40 object-cover -mt-10 shadow-2xl rounded-full  bg-slate-200"
                            style={{ marginTop: "-40px" }}
                          />
                          <p className="text-xl text-gray-400">
                            {mesa.NOMBRE_MESA}
                          </p>
                          <span className="text-gray-400">
                            Personas:{mesa.CAPACIDAD}
                          </span>
                          <p className="text-gray-600">{mesa.DESCRIPCION}</p>
                        </button>
                        <ul className="dropdown-menu absolute z-10 bg-white rounded shadow-md mt-2 left-0 top-1/2 hidden flex justify-center group-hover:block">
                          {mesa.ESTADO === "OCUPADA" && (
                            <div className="p-2">
                              <a
                                onClick={() => onDetalleOrden(mesa)}
                                className="px-3 py-2 hover:bg-[#ec7c6a] rounded"
                              >
                                Detalles Orden
                              </a>
                            </div>
                          )}
                          {mesa.ESTADO === "DESOCUPADA" && (
                            <li
                              key={`mesa-${mesa.NUMERO}`}
                              className="px-3 py-2 hover:bg-[#ec7c6a] rounded"
                            >
                              <a
                                href="#"
                                onClick={() => onNuevaOrden(mesa)}
                                type="submit"
                              >
                                Nueva Orden
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 2 && (
                <>
                  <h2 className="text-xl text-gray-300">Mesas Desocupadas:</h2>
                  <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-6 lg:gap-6 gap-2 items-center justify-center">
                    {/* card */}
                    {mesasEstados.map((mesa) => (
                      <div
                        className="mesa dropdown relative flex flex-col justify-center "
                        key={mesa.ID_MESA}
                      >
                        <button
                          id="button1"
                          className="bg-[#1F1D2B] group py-12 lg:px-6 xl:px-8 px-2 rounded-xl flex flex-col items-center text text-gray-300 w-full"
                        >
                          <img
                            src={mesa.IMAGEN_URL}
                            className="group-hover:bg-[#ec7c6a] group-hover:ring-4 group-hover:ring-[#ec7c6a] w-40 h-40 object-cover -mt-10 shadow-2xl rounded-full  bg-slate-200"
                            style={{ marginTop: "-40px" }}
                          />
                          <p className="text-xl text-gray-400">
                            {mesa.NOMBRE_MESA}
                          </p>
                          <span className="text-gray-400">
                            Personas:{mesa.CAPACIDAD}
                          </span>
                          <p className="text-gray-600">{mesa.DESCRIPCION}</p>
                        </button>
                        <ul className="dropdown-menu absolute z-10 bg-white rounded shadow-md mt-2 left-0 top-1/2 hidden flex justify-center group-hover:block">
                          {mesa.ESTADO === "OCUPADA" && (
                            <div className="p-2">
                              <a
                                onClick={() => onDetalleOrden(mesa)}
                                className="px-3 py-2 hover:bg-[#ec7c6a] rounded"
                              >
                                Detalles Orden
                              </a>
                            </div>
                          )}
                          {mesa.ESTADO === "DESOCUPADA" && (
                            <li
                              key={`mesa-${mesa.NUMERO}`}
                              className="px-3 py-2 hover:bg-[#ec7c6a] rounded"
                            >
                              <a
                                href="#"
                                onClick={() => onNuevaOrden(mesa)}
                                type="submit"
                              >
                                Nueva Orden
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
      </div>
      
      <>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
                            
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                      <div className="w-[600px] flex flex-col">
          <button className="text-white text-xl place-self-end" onClick={handleCloseModal}>X</button>
          <div className="bg-white p-5 rounded-lg">
            <div>
              <Facturacion
              datosFactura={datosFactura}
              datosFacturaDetalle={datosFacturaDetalle}
              />
            </div>
          </div>
                        </div>
                        </div>
        </Modal>
    </>
    </main>
  );
};

export default Mesas;
