import React,{lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import PageNotFound from "../components/Error404/PageNotFound";
import Login from "../pages/Login";
import Mesas from "../pages/Mesas";
import Perfil from "../pages/Perfil";
import Carrito from "../pages/Carrito";
import DetalleOrden from "../pages/DetalleOrden";
import SPedidos from "../pages/SPedidos";

import Loading from "../components/Cargar/Loading";
const LazySidebar = lazy(() => import('../components/SidebarMovil/SidebarMovil'));

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Header/>,
        errorElement:<PageNotFound/>,
        children:[
            {
                index:true,
                element:<Login/>,
            },
            {
                path:'/',
                element:<Suspense fallback={<Loading/>}>
                    <LazySidebar/>
                </Suspense>,
                children:[
                    {
                        path:'/Mesas',
                        element:<Mesas/>,
                    },
                    {
                        path:'Perfil',
                        element:<Perfil/>,
                    },
                    {
                        path: "/Mesas/Carrito/:tableId/:tableName/:capacity",
                        element: <Carrito />,
                      },
                      {
                        path:"Mesas/DetalleOrden",
                        element:<DetalleOrden/>,
                      },
                        {
                            path:"SPedidos",
                            element:<SPedidos/>,
                      }
                      
                ]
            }
        ]
    }
])