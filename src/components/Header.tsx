"use client"
import Image from "next/image";
import CartIcon from "./icons/CartIcon";
import ContactIcon from "./icons/ContactIcon";
import HamburIcon from "./icons/HamburIcon";
import React, {useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import SidebarCart from "./SidebarCart";
import NeverStop from "../../public/images/never-stop.png"
import HeaderNav from "./HeaderNav";
import Link from "next/link";

const Header = () =>{
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenSideBarCart, setIsOpenSideBarCart] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // console.log(searchValue)
  
  const toggleSidebarCart = () =>{
    setIsOpenSideBarCart(!isOpenSideBarCart);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchValue(e.target.value);
  };

  const toggleSidebar = () =>{
    setIsOpenSidebar(!isOpenSidebar);
  };


  useEffect(() => {
    const handleScroll = () => {
      // Detecta si el scroll no está en la posición inicial
      setIsScrolled(window.scrollY > 0);
    };

    // Agregar el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return(
      <>
<header className ={`${isScrolled ? "shadow-md " : ""} fixed bg-[#212229] border-gray-200  top-0 w-full z-50 transition-all duration-500 flex justify-center flex-col`}>
  {/* Banner de Promoción de la pagina */}
  <div className={`${isScrolled ? 
    "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"} 
    transition-all duration-[200ms] flex w-full font-sm py-1 text-white text-sm bg-[#4D57ED] justify-center items-center`}>3 CUOTAS SIN INTERÉS / 10% OFF EN TRANSF Y EFV</div>
   {/* Arranca el contenido del header */}
    <div className ={`max-w-screen-2xl flex justify-between items-center px-4 ${isScrolled 
    ? "md:pt-0 pt-0 md:pb-1 pb-2"
    : "md:pt-8 pt-4 pb-4"} 
    transition-all duration-[200ms] w-full mx-auto`}>
    
    <div className="flex md:flex flex-1 lg:hidden justify-start cursor-pointer" onClick={toggleSidebar}>
      <HamburIcon className="w-8 h-8 text-white"/>
    </div>


  {/* contenedor del logo */}
    <div className="w-full md:w-full lg:w-auto flex justify-center items-center lg:justify-start mr-4 ">
    <Link 
    href={"/"}
    className="flex items-center space-x-3">

    {/* <a href="https://flowbite.com/" className =""> */}
        <Image 
        width="48"
        height="48"
        src={NeverStop} 
        className="" 
        alt="NeverStop Logo" 
        />
        
        <span className ="text-4xl font-semibold text-white">NeverStop</span>
    {/* </a> */}
    </Link>
    </div>

     {/* contenedor del SearchBar */}
    <div className="relative hidden md:hidden lg:flex flex-1 max-w-3xl ">
      <SearchBar handleChange={handleChange} searchValue ={searchValue}/>
    </div>
  
    <div className ="text-white flex justify-end gap-4 md:gap-6 lg:gap-8 md:w-auto ml-4">

      <ContactIcon className="w-8 h-8 md:w-10 md:h-10" text="Contactanos"/>
      <CartIcon className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" text="Mis Compras" toggleSidebarCart={toggleSidebarCart} isScrolled={isScrolled}/>
    </div>

</div>


  {/* Aca arranca la barra de navegación del destock */}
  <HeaderNav />

  {/* SearchBar para movile */}
  <div className ="max-w-screen-2xl flex justify-center items-center px-4 pb-4 md:px-0 md:pb-4 lg:pb-0">
  <div className="flex md:flex lg:hidden relative flex-1 max-w-3xl">
    <SearchBar handleChange={handleChange} searchValue={searchValue}/>
  </div>

  </div>
</header>

{/* Sidebar */}
<Sidebar  toggleSidebar={toggleSidebar} isOpenSidebar={isOpenSidebar}/>

{/* sidebarcart */}
<SidebarCart toggleSidebarCart={toggleSidebarCart} isOpenSideBarCart={isOpenSideBarCart} />

</>

    )
}

export default Header;