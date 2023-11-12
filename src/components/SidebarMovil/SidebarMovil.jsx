import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarWeb from "../SidebarWeb/SidebarWeb";
import { useAuthStore } from "../../VariblesStore";
import {
  RiAlignRight,
  RiUser3Line,
  RiShoppingCart2Line,
  RiLogoutBoxLine,
  RiCloseLine,
} from "react-icons/ri";

const sidebarMobil = () => {
  const [showOrder, setShowOrder] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const togglOrder = () => {
    setShowOrder(!showOrder);
    useAuthStore.getState().capturarStatusSMobil({ showOrder });
    setShowMenu(false);
  };

  const { clearValidacion } = useAuthStore();

  const handleLogout = () => {
    clearValidacion();
  };

  return (
    <>
      <SidebarWeb showMenu={showMenu} />
      {/* Menu movil */}
      <nav className="bg-[#1f1d2b] lg:hidden fixed w-full bottom-0 left-0 text-3xl px-8 text-gray-400 p-4 flex items-center justify-between rounded-tl-xl rounded-tr-xl z-20">
        <a className="p-2" onClick={handleLogout} href="/">
          <RiLogoutBoxLine></RiLogoutBoxLine>
        </a>
        <button className="p-2">
          <RiUser3Line />
        </button>
        <button onClick={togglOrder} className="p-2">
          <RiShoppingCart2Line />
        </button>
        {/* <CarritoCompras showOrder={showOrder} /> */}
        <button onClick={toggleMenu} className="text-white p-2">
          {showMenu ? <RiCloseLine /> : <RiAlignRight />}
        </button>
      </nav>

      <Outlet />
    </>
  );
};

export default sidebarMobil;
