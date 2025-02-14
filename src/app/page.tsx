"use client"
import { CardProduct } from "@/components/CardProduct";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";

export default function Home() {
  const { products, fetchProducts } = useProductStore();



  useEffect(() =>{
    fetchProducts();
  }, [fetchProducts]);
  

  return (
    <>
    
{/* Banner principal de publicidad */}
<section className="mt-40 md:mt-28 lg:mt-36 bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply h-[400px] mb-8 md:mb-12 transition-all duration-300">
    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 h-full flex flex-col justify-center items-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                Learn more
            </a>  
        </div>
    </div>
</section>

{/* seccion de productos pagina principal */}
<section className="w-full mx-auto md:max-w-6xl max-w-2xl pb-10 flex flex-col justify-center items-center ">
  <div className="w-full flex justify-start items-start px-6">
  <h2 className="font-semibold text-3xl md:text-4xl pt-2 md:pt-0 pb-8"> Productos Destacados</h2>
  </div>
  {/* contenedor de las cards */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-0">
  {/* contenedr de la card */}
  {
    products.map((product) => (
        <CardProduct key={product.id} {...product}/>
    ))
  }



  </div>

</section>




    </>
  );
}
