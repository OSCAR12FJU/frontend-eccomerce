"use client"
import React, { useEffect, useState } from "react";
import ArrowBottomIcon from "./icons/ArrowBottomIcon";
import CloseIcon from "./icons/CloseIcon";
import InstagramIcon from "./icons/InstagramIcon";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import useCategoryProductStore from "@/store/useCategoryProductStore";
import useProductStore, { TypeProduct } from "@/store/productStore";
import Link from "next/link";

interface SidebarProps{
    // toggleAccordion: () => void;
    toggleSidebar: () => void;
    // isOpenAccordion: boolean;
    isOpenSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, isOpenSidebar}) =>{
  const { category } = useCategoryProductStore();
  // const { subCategory, fetchSubCategoryProd } = useSubCategoryProdStore();
  const { fetchProducts, getProductsByCategory } = useProductStore();
  const [isOpenAccordionIndex, setIsOpenAccordionIndex] = useState<number | null>(null);
  const [fillProducts, setFillProducts] = useState<TypeProduct[]>([]);
  const [categorySelect, setCategorySelect] = useState<string>("");

  
  const handleToggleAccordion = (index: number, cate: string) =>{
    if(isOpenAccordionIndex === index){
      setIsOpenAccordionIndex(null);
    }else{
      setIsOpenAccordionIndex(index);
      setCategorySelect(cate)

    }
 };

 useEffect(() =>{
  fetchProducts();
}, [fetchProducts]);

useEffect(() =>{
  if(categorySelect){
    const products = getProductsByCategory(categorySelect);
    setFillProducts(products);
  }
},[categorySelect, getProductsByCategory]);

  // const handleToggleAccordion = (index: number, cate: string) =>{
  //   if(isOpenAccordionIndex.includes(index)){
  //     setIsOpenAccordionIndex((prev) => prev.filter((i) => i !== index));
  //   }else{

  //     setIsOpenAccordionIndex((prev) => [...prev, index]);
  //     setCategorySelect(cate)

  //   }
    //Esta es una logica aceptada pero nos nos hace doble petición pero lo deja abierto los que quedamos.
    // setIsOpenAccordionIndex((prevIndex) => {
    //   if(prevIndex.includes(index)){
    //     return prevIndex.filter((i) =>i !== index);
    //   }else{
    //     return [...prevIndex, index]
    //   }
    // });
    // setCategorySelect(cate);
 


  // const handleSelectCate = (e: React.MouseEvent, cate:string ) =>{
  //   e.preventDefault();
  //   setCategorySelect(cate);
  // }
  // console.log(handleSelectCate)
  
  // useEffect(() =>{
  //   fetchSubCategoryProd(categorySelect);
  // }, [categorySelect]);
  

  return(
 <div className={`fixed lg:hidden top-0 left-0 z-50 h-screen overflow-y-auto bg-[#212229] shadow-md w-1/2 
 ${isOpenSidebar 
 ? "transform translate-x-0 duration-700" 
 : "transform -translate-x-full duration-700"}`}>
  
  {/* banner del sidebar */}
  <div className="bg-[#4D57ED] w-full  flex items-center justify-between py-1 px-4 text-white">
    <span className="text-sm font-light">NEVERSTOP</span>
    <InstagramIcon className="w-4 h-4"/>
  </div>
  
  {/* boton de close */}
  <div className="flex justify-start text-white pt-4 px-4 cursor-pointer" onClick={toggleSidebar}>
    <CloseIcon className="w-6 h-6"/>
  </div>
  
  {/* Arranca el contenedor del acordion */}
  <div id="componentSidebar">
    <h4 className="text-lg font-normal text-white px-4 pt-2">Productos</h4>
    {/* Item acordion principal */}

    {
    category.map((cat,index) =>(
    <>
    <div className="overflow-y-auto pt-2 px-4  border-b-[1px] border-white/20 transition-all duration-500" key={index}>
    <div 
    className="py-2.5 text-white gap-3 flex items-center justify-between w-full font-light rtl:text-right transition-all duration-500 cursor-pointer"
    onClick={ () =>{
      handleToggleAccordion(index, cat);}
    }
    >
      <span className="">{cat}</span>
      { isOpenAccordionIndex === (index) 
      ? (<ArrowLeftIcon className="w-6 h-6 transition-all duration-500 "/>) 
      :( <ArrowBottomIcon className="w-6 h-6  transition-all duration-500"/>)
      }
    </div>
  </div>
{/* contenedor del secundario */}
<div className={`overflow-hidden px-4 bg-[#000]/40 transition-all duration-500 ease-in-out max-h-0  
${isOpenAccordionIndex === (index) 
? ' max-h-screen border-b-[1px] border-white/20' 
: 'max-h-0 '}`}>
  {
    fillProducts && Array.isArray(fillProducts) && fillProducts.map((product) =>(
 <Link 
  href={`/products/${product.title}`} key={product.id}
  className="text-white gap-3 flex items-center justify-between w-full py-3 font-light rtl:text-right uppercase" >
    <span>{product.title.slice(0,24)}</span>
    <ArrowRightIcon className="w-6 h-6"/>
 </Link>
    ))
  }
</div>
    </>

      ))
    }

  </div>
  
  <div id="componentContact">
  <div className="px-4 border-b-[1px] border-white/20 transition-all duration-500">
    <div className="py-2 text-white flex items-center justify-between w-full py-3 font-normal rtl:text-right transition-all duration-500">
      <span className="text-lg">Contactanos</span>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 cursor-pointer"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
      <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
      </svg>
    </div>
  </div>

  </div>

</div>
    )
}

export default Sidebar;