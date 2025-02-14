import { TypeProduct } from "@/store/productStore"
import useListProductStore from "@/store/sidebarStore";
import Image from "next/image"
import React from "react"
import InputCount from "./InputCount";

export const ItemSidebarCart: React.FC<TypeProduct> = ({id, title ,price, image}) =>{
    const { removeListProduct, updateProductQuantity, listProduct} = useListProductStore();

    //Funciones para los items de los products
    const handleDelete = (id: number) =>{
        removeListProduct(id)
    }
    const productList = listProduct.find((prd) => prd.title === title);

    const handleIncrement = (id: number) =>{
        const product = listProduct.find((product) => product.id === id);
        if(product){
          const newQuantity = (product.selecQuantity || 0) + 1;
          updateProductQuantity(id, newQuantity)
        }
      }
    
      const handleDecrement = (id: number) =>{
        const product = listProduct.find((product) => product.id === id);
        if(product){
          const newQuantity = (Number(product.selecQuantity) || 0) - 1;
          if (newQuantity > 0){
            updateProductQuantity(id, newQuantity);
          }else{
            removeListProduct(id);
          }
        }
      };
    return(
        <div className="flex items-center justify-between py-4 mb-2">
        <div className="flex items-center gap-3 ">
        <Image 
         width="80"
         height="80"
         src={image}  
         alt='Auriculares Gamer' 
         className="h-20 w-20 rounded-lg"
         priority/>     
        <div>
        <div className="rounded-full w-full mb-2">
          <a className="text-lg font-normal text-white">{title}</a>
         </div>

    {/* input de decremento e incremento */}
    <InputCount 
    handleDecrement={handleDecrement}
    handleIncrement={handleIncrement}
    quantity={Number(productList?.selecQuantity) || 1}
    id={id}
    inputCount="text-white"
    inputDecr="text-white"
    inputIncr="text-white"/>

    {/* //////////////// */}


      </div>
     </div>
     <div className="mx-4 rounded-full flex flex-col w-12 gap-2 justify-center items-end">

      <div className="text-white cursor-pointer transition-all duration-500" onClick={() => handleDelete(id)}>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round">  

      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
       
      </div>
     <div>
     <span className="text-base text-white font-normal"> ${price}</span>
    </div>
            
  </div>

 </div> 
    )

}