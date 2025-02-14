import { TypeProduct } from "@/store/productStore";
import Link from "next/link";
// import useSubCategoryProdStore from "@/store/useSubCategoryProdStore";
import React from "react";

interface HeaderSubNavProps {
    category: string;
    products: TypeProduct[];
    className: string;
    // onMouseLeave: () => void;
    handleSelectCate: (e: React.MouseEvent, cate: string) => void;
  }

const HeaderSubNav: React.FC<HeaderSubNavProps> = ({
    category,
    className,
    products,
    handleSelectCate,
    }) =>{

    // const { subCategory } = useSubCategoryProdStore();
    return(
        <div  
        className={`bg-white shadow-md fixed mt-10 w-full opacity-90 transition-all duration-500 border-b-[1px] border-[#212229]/20 hidden ${className}`}
        onMouseEnter={() => handleSelectCate}
        // onMouseLeave={onMouseLeave}
        >
        <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900  sm:grid-cols-2 md:grid-cols-3 md:px-6">
            <ul aria-labelledby="mega-menu-full-dropdown-button">
                <li className="p-3 flex flex-col justify-start items-start" >
                    <span className="font-semibold text-lg">{category}</span>
                    {/* <div className="font-semibold text-lg cursor-pointer-none">{category}</div> */}
                        {
                            products && Array.isArray(products) && products.map((product) =>(
                            <Link
                            href={`/products/${product.title}`}
                            key={product.id}>
                            <span
                            key={product.id}
                            className="text-md text-[#212229] hover:text-[#4D57ED] uppercase" >{product.title}
                            </span>
                          </Link>
                            ))
                        }
                </li>
            </ul>
          
        </div>
    </div>

    )
}

export default HeaderSubNav;