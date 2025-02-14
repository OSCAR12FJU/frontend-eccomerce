import Image from "next/image";
import React from "react";
import useListProductStore from "@/store/sidebarStore";
// import { TypeProduct } from "@/store/productStore";
interface NotificationProductProps{
    isScrolled: boolean;
    stateNoti: boolean;
}

const NotificationProduct: React.FC<NotificationProductProps> = ({isScrolled, stateNoti}) =>{
    const {listSidebarProduct } = useListProductStore();
    const lastProduct = listSidebarProduct[listSidebarProduct.length - 1];
    console.log("lista de products",listSidebarProduct)

    
    return(
        <div className={`fixed bg-transparent ${isScrolled ? "top-20 md:top-[6rem]" : "top-24 md:top-32"} right-0 z-40 transition-transform duration-500 ease-in-out w-full md:w-1/2 lg:w-1/3 px-2 ${stateNoti ? "flex" : "hidden"}`}>

        <div className="w-full bg-white w-full px-2 rounded-xl shadow-md">
    
        <div className=" flex justify-between items-start pt-2 border-b-[1px] border-[#212229]/20">
    
        <div className="absolute w-4 h-4 bg-white transform rotate-45 -translate-x-1/2 -top-1 right-4 md:right-10 "></div>
    
            {/* -------------------------------- */}
            {/* imagen e info de product */}
            <div className="flex items-center justify-center p-2">
            <div className="flex items-center gap-x-1">
            <Image 
                 width="800"
                 height="800"
                 src={lastProduct?.image}  
                alt={lastProduct?.title}
                 className="h-20 w-20 rounded-lg"
                 priority/>            
             </div>
            <div className="flex justify-center items-start flex-col text-start ml-3">
              <a className="text-base font-normal text-[#212229]">{lastProduct?.title}</a>
              <span className="text-lg text-[#212229] font-semibold">
               ${lastProduct?.price},00</span>
              <span className="text-md font-semibold text-[#212229]">Agregado correctamente al carrito!</span>
                 
             </div>
             </div>
             {/* ////////////// */}
             {/* <CloseIcon className="w-6 h-6 text-[#212229] z-40"/> */}
        </div>
    
        <div className="pt-2 pb-3 px-2 flex justify-between items-center text-[#212229] text-lg">
          <h4 className="font-semibold">Total</h4>
          <span>${lastProduct?.price},00</span>
        </div>
    
        </div>
    
    
        </div>

    )
}

export default NotificationProduct;