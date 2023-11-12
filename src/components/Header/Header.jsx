import React from 'react'
import { Outlet } from "react-router-dom";
import UserContextProvider from "../../utils/userContextProvider";

const Header = () => {
  return (
    <>
    <UserContextProvider>
    <div className='bg-[#262837] min-h-screen items-center justify-center'>
      <Outlet/></div>
    </UserContextProvider>
    </>
  )
}

export default Header;