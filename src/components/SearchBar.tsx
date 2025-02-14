"use client"
import React, { useEffect } from "react";
import SearchIcon from "./icons/SearchIcon";
import OptionsProducts from "./OptionProducts";
import InterfaceSearchBar from "./types/InterfaceSearchBar";
import useProductStore from "@/store/productStore";
import useCategoryProductStore from "@/store/useCategoryProductStore";

const SearchBar: React.FC<InterfaceSearchBar> = ({handleChange, searchValue}) =>{
  const {products, fetchProducts} = useProductStore();
  const { category } = useCategoryProductStore();


  useEffect(() =>{
    fetchProducts();
  }, [fetchProducts]);
  // Logica de busqueda de products
  const searchCategory = category.filter((cat) => cat.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  const searchProduct = products.filter((prd) => prd.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));

  const handleSearch = (e: React.MouseEvent)=>{
    e.preventDefault();
    // setSearchValue(e.target.value);
}
    return(
      
    <>
      <div className="absolute inset-y-0 end-0 flex items-center pr-3 pointer-events-none" onClick={(e) => handleSearch(e)}>
        <SearchIcon className="w-8 h-8" />
        <span className="sr-only">Search icon</span>
      </div>
       <input 
       type="text" 
       className={`block w-full py-2 px-3 text-lg text-gray-900 transition-all rounded-xl duration-[200ms]  bg-gray-50 placeholder:text-lg placeholder:font-light placeholder:text-[#212229]`} 
       value={searchValue}
       onChange={handleChange}
       placeholder="¿Qué estás buscando?" />

      {/* Componente de opciones para el buscador */}
      <OptionsProducts className={`${searchValue.length > 0 ? "grid" : "hidden" } `} searchCategory={searchCategory} searchProduct={searchProduct} />
    
    </>
    )
}

export default SearchBar;