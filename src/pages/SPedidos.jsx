import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useAuthStore } from "../VariblesStore";
import SPedidosHooks from "../hooks/SPedidos/SPedidosHooks";
import { DetalleOrdenHooks } from "../hooks/DetalleOrden/DetalleOrdenHooks";
import { OrdenHooks } from "../hooks/Orden/OrdenHooks";
import Hora from "../hooks/Hora/Hora";

const SPedidos = () => {
  const { token } = useAuthStore();
  const { btnonDetalleOrden, DetalleOrd } = DetalleOrdenHooks();
  const { btnupOrden } = OrdenHooks();
  const { Lpedidos } = SPedidosHooks();
  const { formattedDate, formattedTime } = Hora();
  const fechaHoraActual = new Date();
  const DetallesOrd = DetalleOrd;
  // Datos adicones como variable
  const ESTADO_PEDIDO = "ATENDIDO";
  const ID_ORDEN = DetallesOrd[0]?.ID_ORDEN ?? null;

  const onAceptarPedido = (idOrden, ESTADO_PEDIDO, HORA_ACEPTADO) => {
    btnupOrden(idOrden, ESTADO_PEDIDO, HORA_ACEPTADO);
    btnonDetalleOrden(idOrden);
    //window.location.reload();
  };

  return (
    <main className="lg:pl-28 grid xl:grid-cols-1 lg:grid-cols-12 pt-8 pb-2">
      <div className="lg:col-span-12 md:col-span-5">
        <header className="p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="items-center">
              <h1 className="text-2xl text-gray-300 mr-4">Gestor de Chef</h1>
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
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-8 pt-4 pb-2 pr-4">
          <div className="lg:col-span-5 md:col-span-5">
            {/* header */}
            <header className="p-4">
              {/* titulo search */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div className="p-4 bg-gray-300 rounded-lg flex-1">
                  <div className="text-center mb-2">
                    <span className="font-bold text-2xl">80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Porcentaje de atención:</span>
                    <span className="text-sm font-bold">80%</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Demora promedio:</span>
                    <span className="text-sm font-bold">10 min</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-300 rounded-lg flex-1">
                  <div className="text-center mb-2">
                    <span className="font-bold text-2xl">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Porcentaje de atención:</span>
                    <span className="text-sm font-bold">20%</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Demora promedio:</span>
                    <span className="text-sm font-bold">30 min</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-300 rounded-lg flex-1">
                  <div className="text-center mb-2">
                    <span className="font-bold text-2xl">0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Porcentaje de atención:</span>
                    <span className="text-sm font-bold">0%</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Demora promedio:</span>
                    <span className="text-sm font-bold">N/A</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                {Lpedidos.map((objetoListarOrden, index) => {
                   const horaAceptado = new Date(objetoListarOrden.HORA_ACEPTADO);
                   const diferenciaMilisegundos = fechaHoraActual.getTime() - horaAceptado.getTime();
                   
                   const segundos = Math.floor(diferenciaMilisegundos / 1000);
                   const minutos = Math.floor(segundos / 60);
                   const horas = Math.floor(minutos / 60);
                   
                   const tiempoTranscurrido = `${horas} horas, ${minutos % 60} minutos y ${segundos % 60} segundos`;
                   
                  return (
                    <div
                      key={index}
                      className="p-4 md:p-1 bg-gray-300 rounded-lg mt-4 md:text-sm"
                    >
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 flex gap-3 ">
                          <div className="w-12 h-12 md:w-8 md:h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">
                            {index + 1}
                          </div>
                          <div className="grid gap-2 text-gray-600 ">
                            <div>
                              <span className="font-bold">
                                Nº Pedido:{objetoListarOrden.ID_ORDEN}
                              </span>
                            </div>
                            <div>
                              <span className="font-bold">
                                Hora de Pedido:{" "}
                                {new Date(
                                  objetoListarOrden.FECHA_HORA_PEDIDO
                                ).toLocaleString("es-PE", {
                                  timeZone: "America/Lima",
                                })}
                              </span>
                            </div>
                            <div>
                              <span className="font-bold">
                                Moso:{objetoListarOrden.NOMBRE_COMPLETO}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div>
                            <div className="flex justify-center items-center text-gray-500 font-bold mb-2">
                              Tiempo Transcurrido
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                              <div className="border border-gray-500 border-t-0 border-b-0 flex justify-center w-19">
                                <span className="text-gray-500 font-bold">
                                  {objetoListarOrden.HORA_ACEPTADO}
                                  {tiempoTranscurrido}
                                </span>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1 flex flex-col justify-between">
                          <span className="text-gray-500 font-bold">
                            Estado:{objetoListarOrden.ESTADO_PEDIDO}
                          </span>
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 my-1"
                            onClick={() =>
                              onAceptarPedido(
                                objetoListarOrden.ID_ORDEN,
                                ESTADO_PEDIDO,
                                fechaHoraActual
                              )
                            }
                          >
                            Aceptar Pedido
                          </button>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 my-1">
                            Otra acción
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </header>
          </div>

          <form className="lg:col-span-3 md:col-span-3 fixed lg:static top-0 bg-[#1F1D2B] w-full h-full transition-all duration-500 rounded-lg shadow-lg">
            {/* detalle orden */}
            <div className="relative p-4 text-gray-300 p-2 h-full">
              <div className="top-0 left-0 w-full py-2 flex justify-between items-center text-center">
                <div className="text-white text-lg font-bold">
                  Nº Pedido: <span className="text-center">{ID_ORDEN}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Detalle de Orden:</h3>
              {DetallesOrd.length === 0 ? (
                <p className="text-center text-gray-500 my-auto">
                  No hay detalles en la orden
                </p>
              ) : (
                <div className="overflow-y-auto max-h-full">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Producto</th>
                        <th className="text-right">Cantidad</th>
                        <th className="text-right">Observación</th>
                        <th className="text-right">Listo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DetallesOrd.map((objDetallesOrd, index) => (
                        <tr className="border-b" key={index}>
                          <td>{objDetallesOrd.NOMBRE_PRODUCTO}</td>
                          <td className="text-right">
                            {objDetallesOrd.CANTIDAD}
                          </td>
                          <td className="text-right">Sin salsa</td>
                          <td className="text-right">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-500 rounded-full"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SPedidos;
