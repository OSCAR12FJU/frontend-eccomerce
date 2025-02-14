"use client"
import HeaderSubNav from "./HeaderSubNav";
import { useEffect, useState } from "react";
import useCategoryProductStore from "@/store/useCategoryProductStore";
import ArrowBottomIcon from "./icons/ArrowBottomIcon";
import useProductStore, { TypeProduct } from "@/store/productStore";

const HeaderNav = () =>{
    const { category, fetchCategoryProducts } = useCategoryProductStore();
    const { fetchProducts, getProductsByCategory } = useProductStore();
    // const {fetchSubCategoryProd } = useSubCategoryProdStore();
    const [categorySelect, setCategorySelect] = useState<string>("");
    const [fillProducts, setFillProducts] = useState<TypeProduct[]>([]);
    const [isSubNavVisible, setIsSubNavVisible] = useState(false);
    
    // const [productCategory, setProductCategory] = useState<string>("");

    const handleSelectCate = (e: React.MouseEvent ,cate:string ) =>{
        e.preventDefault();
        setCategorySelect(cate);
        setIsSubNavVisible(true);
    }

    useEffect(() =>{
      fetchCategoryProducts();
    }, [fetchCategoryProducts]);

    useEffect(() =>{
      fetchProducts();
    }, [fetchProducts]);


    useEffect(() =>{
     if(categorySelect){
        const products = getProductsByCategory(categorySelect);
        setFillProducts(products);
        setIsSubNavVisible(true);
     }
    },[categorySelect, getProductsByCategory])

    return(
    <nav className="hidden md:hidden lg:flex border-t-[1px] border-white/20 relative group">
    <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl pt-3 pb-2 px-4 ">
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ">
            <ul className="flex flex-col mt-4 font-light md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse text-white">
                { 
                category.map((cate: string, index: number) =>(
                <li key={index}>
                    <a 
                     href="#"
                     onMouseEnter={(e) => handleSelectCate(e,cate)}
                    //  onMouseLeave={handleMouseLeave}
                     className="block py-2 px-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0" aria-current="page">
                        <span className="flex justify-center items-center gap-x-2 ">{cate} <ArrowBottomIcon className={` w-4 h-4`}/></span></a>
                </li> ))
                }
            </ul>
        </div>
    </div>
    <div>
      
    </div>
    {/* contenedor del submenu de opciones */}
    {
        categorySelect && isSubNavVisible && (
            <HeaderSubNav 
             handleSelectCate={handleSelectCate} className="group-hover:block" 
             category={categorySelect} 
             products= {fillProducts}/>
            
        )
    }
    
</nav>
    )
}
export default HeaderNav;