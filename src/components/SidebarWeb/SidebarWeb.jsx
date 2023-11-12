import {NavLink } from "react-router-dom";
import React, {useState } from 'react';
import {
  RiUser6Fill,
  RiHome6Line,
  RiRestaurantLine,
  RiTruckLine,
  RiLogoutBoxLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { MdTableRestaurant } from "react-icons/md";
import { useAuthStore } from "../../VariblesStore";
import logo from "../../public/imagen/logo.jpg";


export default function Sidebar(props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { clearValidacion } = useAuthStore();

  const handleLogout = () => {
    clearValidacion();
  };

  
     const [isExpanded, setExpendState] = useState(false);
  const { showMenu } = props;
  const menuItem = [
    {
      path: "Mesas",
      name: "Mesas",
      icon: <MdTableRestaurant className="text-2xl" />,
    },
    {
      path: "Perfil",
      name: "Perfil",
      icon: <RiUser6Fill className="text-2xl" />,
    },
    {
      path: "SPedidos",
      name: "SPedidos",
      icon: <RiRestaurantLine className="text-2xl" />,
    }
  ];
  
  return (
      <nav
      className={`${
        isExpanded ? "sidebar" : "sidebar close"
      } bg-[#1f1d2b] transition-all fixed lg:left-0 top-0 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 ${
        showMenu ? "left-0" : "-left-full"
      }`}
    >
      <div>
        <ul className="pl-4">
          <header className="flex pb-2">
            <div className="logo-web">
              {/* <h1 className=" imagen"></h1> */}
              <img src={logo} className="w-14 h-14 object-cover rounded-full" />
            </div>
            <div className="flex flex-col titulo-web opacidad text-white font-semibold">
              <span className="name">System</span>
              <span className="profession">Restaurant</span>
            </div>
            <div>
              <i onClick={() => setExpendState(!isExpanded)}>
                <RiLogoutCircleLine className="text-xl toggle" />
              </i>
            </div>
          </header>

          {menuItem.map((item, i) => (
            <li
              className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors"
              key={i}
            >
              <NavLink
                to={item.path}
                className="group-hover:bg-[#ec7c6a] p-4 flex justify-start rounded-lg text-[#ec7c6a] group-hover:text-white transition-colors"
                onClick={() => {
                  setSelectedIndex(i);
                  document
                    .querySelectorAll(".selected")
                    .forEach((el) => el.classList.remove("selected"));
                  document.querySelectorAll("li")[i].classList.add("selected");
                }}
              >
                <i className="pr-1">{item.icon}</i>
                <span className="text nav-text opacidad">{item.name}</span>
              </NavLink>
            </li>
          ))}
          {/* <main>{Children}</main> */}
        </ul>
      </div>
    
    <ul className="pl-6">
      <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
        <a href="/"  onClick={handleLogout} className="group-hover:bg-[#ec7c6a] p-4 flex justify-start rounded-lg text-[#ec7c6a] group-hover:text-white transition-colors">
        <i className="pr-1 text-2xl"><RiLogoutBoxLine/></i>
        <span className="text nav-text opacidad">Logout</span>
        </a>
      </li>
    </ul>
    
    </nav>
    
  )
}
