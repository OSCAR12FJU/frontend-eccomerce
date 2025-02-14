import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import { TypeProduct } from "@/store/productStore";
import Link from "next/link";
interface OptionProductsProps{
  className: string;
  searchCategory: string[];
  searchProduct: TypeProduct[];
}

const OptionsProducts: React.FC<OptionProductsProps> = ({className, searchCategory, searchProduct}) =>{
    return(
        <div className={`absolute ${className}  top-12 left-0 bg-white z-50 bg-[#F9FAFB] rounded-xl shadow-md grid-cols-1 md:grid-cols-3 px-4 py-4 w-full gap-4 max-h-80 overflow-hidden`}>
      
        <div className="hidden md:flex flex-col justify-start items-start col-span-1 overflow-hidden">
            <h4 className="font-semibold text-md pb-1 border-b-[0.1rem] ">Sugerencias</h4>
          <ul className="py-1 text-sm md:text-md text-[#212229] font-normal">
            {/* Nombre de cada categoria existente */}
            {
              searchCategory.map((category, index) =>(
            <li key={index}>
              <a href="#" className="block py-2 hover:bg-gray-100">{category}</a>
            </li> 
              ))
            }

        </ul>
        </div>

        <div className="flex flex-col justify-start items-start md:col-span-2 overflow-hidden">
          
        <h4 className="font-semibold pb-1 text-md border-b-[0.1rem]">Productos</h4>
          
        <div className="flex flex-col w-full max-h-80 overflow-y-auto">

        {/* ///////////////////////////////////// */}
        {
          searchProduct.map((product, index) =>(

        <Link key={index} href={`/products/${product.title}`}>
        <div className="flex items-center justify-between p-4 mb-1 border-b-[0.1rem] w-full gap-4 cursor-pointer">
        <div className="flex items-center">
         <Image 
         width="80"
         height="80"
         src={product.image} 
         alt='product-image' 
         className="h-20 w-20 rounded-lg object-contain fill "/>    
        </div>

        <div className="flex flex-col w-full  justify-center pl-4">
         <a className="text-sm md:text-md font-normal text-[#212229]">{product.title}</a>
        <span className="text-base text-[#212229] font-semibold">
           {product.price}
        </span>
        </div>
        <div className="flex justify-center items-center text-[#212229]">
          <ArrowRightIcon className="w-8 h-8"/>

        </div>
        </div>
        </Link>
          ))
        }

        </div>

        {/* /////////////////////// */}
        </div>
        </div>

    )
}
export default OptionsProducts;