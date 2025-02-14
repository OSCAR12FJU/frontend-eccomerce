"use client"
import Image from "next/image"
import CartCardIcon from "./icons/CartCardIcon"
import EyeIcon from "./icons/EyeIcon"
import React from "react"
import { TypeProduct } from "@/store/productStore"
import useListProductStore from "@/store/sidebarStore"
import Link from "next/link"

export const CardProduct: React.FC<TypeProduct> = ({id, title,price , image, description, quantity, category, productType}) =>{

    const { addListProduct, listProduct, setNotification, addListSidebarProduct, listSidebarProduct } = useListProductStore();

    const product = {id, title, price, image, description, quantity, category }

    const handleSumbitListProduct = (e: React.MouseEvent<HTMLElement>, product: TypeProduct ) =>{
      e.preventDefault();
      setNotification(false);
      setTimeout(() => {
        setNotification(true)
      }, 0);

      addListSidebarProduct([...listSidebarProduct, product])

        const productExist = listProduct.some(
            (productList) => productList.id === product?.id);
        if(productExist){
            const updatedProducts = listProduct.map((productList) => productList.id === product?.id 
            ? {...productList, selecQuantity: (productList.selecQuantity || 0) + 1}
            : productList );
            addListProduct(updatedProducts);
        }else{
            const productQuantity = {...product, selecQuantity: 1};
            addListProduct([...listProduct, productQuantity]);
        }
        setTimeout(() => setNotification(false), 2000);

  }

    return(
    <>
    {/* estructura correcta de cart */}
  <div className="w-full max-w-sm bg-white rounded-lg flex flex-col items-center group cursor-pointer hover:border-b-0 md:px-5 px-3 md:hover:shadow-lg rounded">

  <div className="w-full h-48 md:h-56 overflow-hidden rounded-t-lg relative ">
       <Image 
       className="object-contain w-full h-full fill" 
       style={{backgroundSize: 'contain'}} 
       src={image} 
       alt={title} 
       width={300}
       height={300}
       priority/>

      {/* Logica segun qeu tipo de estado tiene este proyecto */}
      {
        
      }
      {/* boton de rayo */}
      {
        productType !== "express" 
        ? <button className="absolute inline-flex items-center justify-center rounded-full bg-[#212229] bottom-0 left-1 md:left-4 z-10">
        <span className="relative flex justify-center items-center text-center px-4 pt-[3px] pb-[1px] transition-all text-white text-md">
        ✈️
        </span>
      </button> 
      : <button className="absolute inline-flex items-center justify-center rounded-full  bg-[#212229] bottom-0 left-4 z-10">
        <span className="relative px-2 py-[1px] md:px-4 md:py-1 md:pb-0 transition-all text-white ">
          ⚡
        </span>
      </button> 

      }
     
      {/* boton de avion */}
      
  </div>
      {/* </div> */}

      {/* 2 parte del contenido de la card */}
      <div className="flex flex-col justify-start items-start p-2 pb-0 w-full">
          <h4 className="text-lg font-normal text-[#424BCB] uppercase">{title.slice(0,16)}</h4>
          <div className="flex justify-center items-center gap-2"> 
              <span className="text-2xl font-bold text-gray-900 mb-2  ">${price}</span>
          </div> 

      </div>
      <hr className="w-full border-[#B9BDEC] hidden border-[0.0.2px] md:block group-hover:hidden"></hr>

      <div className="flex justify-center md:opacity-0 group-hover:opacity-100  opacity-100 transition-opacity duration-300 rounded md:px-5 px-3 pb-2">
          <a  className="text-white bg-[#212529] hover:bg-[#212529] focus:ring-4 focus:outline-none focus:ring-gray-600 font-semibold rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center me-2 cursor-pointer"
          onClick={(e) => handleSumbitListProduct(e,product)}>

              <CartCardIcon className="hidden md:flex w-3.5 h-3.5 me-2"/>
              COMPRAR
              </a>
              {/* <Link  to={`/products/${product.id}`}> */}
              <Link 
              href={`/products/${encodeURIComponent(title)}`}
              className="text-gray-900 bg-white font-bold rounded-full text-sm px-2 md:px-4 py-2.5 text-center flex justify-center items-center border border-[#212 229] cursor-pointer" >
              <EyeIcon className="w-5 h-5"/> 
              <span className="hidden md:flex ">VER</span>
              </Link>
              {/* </Link> */}
      </div>
  </div> 
  {/* ///////////////////////////// */}
    </>

    )

}