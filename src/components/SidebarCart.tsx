import useListProductStore from "@/store/sidebarStore";
import CloseIcon from "./icons/CloseIcon";
import InstagramIcon from "./icons/InstagramIcon";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import React from "react";
import { ItemSidebarCart } from "./ItemSidebarCart";

interface SidebarCartProps{
    isOpenSideBarCart: boolean;
    toggleSidebarCart: () => void;

}


const SidebarCart:React.FC<SidebarCartProps> = ({isOpenSideBarCart,toggleSidebarCart }) =>{

  const {listProduct } = useListProductStore();

  //Funcion para calcular el total
   const accountTotal = (): number =>{
    const total = listProduct.reduce((total, product) =>{
      const productTotal = (product.selecQuantity || 0) > 1 
      ? Number(product.price) * Number(product.selecQuantity || 1 ) 
      : Number(product.price)

      return total + productTotal
    }, 0)
    const totalResult = Math.round(total);
    return totalResult;
  }
  //Función para enviar el recibo por mensaje.
  const purchaseTotal = accountTotal();
  const purchaseInvoice = listProduct.map((product) => 
                          `\nNombre: ${product.title}, \nCantidad: ${product.selecQuantity},                            \nPrecio: $${product.price}`)
                          .join("\n");
  const message = `Hola, Equipo de NeverStop!\nQuiero comprar los siguientes productos:\n${purchaseInvoice}\n\nTotal: $${purchaseTotal}`;                    
  const whatsappURL = `https://api.whatsapp.com/send?phone=541165123948&text=${message.replace(/\n/g, "%0A")}`;




  return(
        <div className={`fixed  top-0 right-0 z-50 h-screen overflow-y-auto bg-[#212229] shadow-md w-full md:w-1/2 lg:w-2/5 ${isOpenSideBarCart ? "transform translate-x-100 duration-700" : "transform translate-x-full duration-700"}`}>
          
          {/* banner del sidebar */}
          <div className="bg-[#4D57ED] w-full  flex items-center justify-between py-1 px-4 text-white">
            <span className="text-sm font-light">GRACIAS POR TU COMPRA</span>
            <InstagramIcon className="w-4 h-4"/>
          </div>
          
          {/* boton de close */}
          <div className="flex justify-start text-white pt-4 px-4 cursor-pointer" onClick={toggleSidebarCart}>
            <CloseIcon className="w-6 h-6"/>
          </div>
          
          {/* Arranca el SidebarCart */}
          <div id="componentSidebarCart">
          <div className="overflow-y-auto pt-2 px-4 border-b-[1px] border-white/20 transition-all duration-500">
        
            {/* Item de la cart de sidebar */}
            {
              listProduct.map((product) =>(
                 <ItemSidebarCart key={product.id} {...product} />))
            }
          
        
          </div>
         {/* //////////////////// */}
        
          <div className="overflow-y-hidden pt-4 px-4 transition-all duration-500 ">
          <div className="text-2xl flex justify-between font-semibold text-white">
          <h4>Total:</h4>
          <span>${accountTotal()},00</span>
          </div>
        
          <a 
          className="bg-[#27B03C] flex gap-2 items-center font-semibold text-white justify-center text-center px-2 py-3 md:px-6 md:py-2 rounded-full text-base cursor-pointer my-4"
          onClick={() => window.open(whatsappURL, "_blank")}
          rel="noopener noreferrer">
          <WhatsAppIcon className="w-6 h-6 md:w-8 md:h-8"/>
          COMPRAR AHORA</a>
         </div>
          </div>
          
        
        </div>
        
        
    )
}

export default SidebarCart;