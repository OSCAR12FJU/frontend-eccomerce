import React from "react";
import NotificationProduct from "../NotificationProduct";
import useListProductStore from "@/store/sidebarStore";
interface CartIconProps{
  className: string;
  text: string;
  isScrolled: boolean;
  toggleSidebarCart: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({className, text, toggleSidebarCart, isScrolled}) =>{
  const {listProduct, isNotification } = useListProductStore();


return(
<div className="flex flex-col gap-y-1 justify-center items-center relative " onClick={toggleSidebarCart} >

<div className="relative">
<svg 
  xmlns="http://www.w3.org/2000/svg"  
  className={className}
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  stroke-width="1"> 

  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0">
  </path> 
  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> 
  <path d="M17 17h-11v-14h-2"></path> 
  <path d="M6 5l14 1l-1 7h-13"></path> 
  </svg> 
  {/* componente de bolita contador */}
  <div className="absolute inline-flex items-center justify-center w-4 h-4  text-xs font-normal text-white bg-[#4C56F5] rounded-full -top-1 -end-2">{listProduct.length}
  </div>

  </div>

  <span className="font-sm hidden md:hidden text-sm lg:block">{text}</span>

    {/* componente de notificación */}
    <NotificationProduct isScrolled={isScrolled} stateNoti ={isNotification}/>

  </div>

  


)
}
export default CartIcon;