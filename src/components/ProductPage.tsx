"use client"
import useProductStore, { TypeProduct } from "@/store/productStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import CompCarrousel from "./CompCarrousel";
import useListProductStore from "@/store/sidebarStore";
import InputCount from "./InputCount";
import getQuotes, { ResponseGetQuotes } from "@/api/getQuotes";
// import HandleSendMessage from "./utils/handleSendMessage";

const ProductPage = ({title}: {title: string}) =>{
 const {products, fetchProducts} = useProductStore();
 const {listProduct,addListProduct, updateProductQuantity, removeListProduct, addIndProduct} = useListProductStore();

 const [quotes, setQuotes] = useState<ResponseGetQuotes>({
  compra: 'Cargando...',
  venta: 'Cargando...',
  ultimaActua: 'Cargando...',
 });

//Funciòn para añadir al carrito 
 const handleSumbitListProduct = (e: React.MouseEvent<HTMLElement>, product: TypeProduct ) =>{
        e.preventDefault();
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
  }

useEffect(() =>{
  const fetchQuotes = async() =>{
    const data = await getQuotes();
    setQuotes(data);
  }
  fetchQuotes();
}, []);

//funcion converción
const converPrice = (priceUSD: string, priceARS: number | undefined): number =>{
  if (!priceUSD || !priceARS) {
    throw new Error('Ambos precios deben ser proporcionados.');
  }
  // const priceNumberUSD = parseFloat(priceUSD.replace(/[^0-9.]/g, ''));
  const converUSD = priceUSD.slice(1)
  const price = converUSD.split(',')[0]
  const priceNumberUSD = Number(price)
  
  console.log("precio dolar", converUSD)
  console.log("precio dolar", priceNumberUSD)
  // const priceNumberARS = parseFloat(priceARS.replace(/[^0-9.]/g, ''));

  if (isNaN(priceNumberUSD)) {
    console.error("Error: El precio USD no es válido.");
    return 0;
  }

  if (isNaN(priceARS)) {
    console.error("Error: El precio ARS no es válido.");
    return 0;
  } 
  const result = Math.round(priceARS / priceNumberUSD);
  return result
}
//  const [productList, setProductList] = useState<TypeListProduct>();

{/*logica para la destructuración del obj para el product page*/}
useEffect(() =>{
    fetchProducts()
},[fetchProducts])
const decodedTitle = decodeURIComponent(title);

const productFind = products.find((prd:TypeProduct) => prd.title === decodedTitle)
const productListFind = listProduct.find((prd) => prd.title === productFind?.title)

const imageUrl = productFind?.image ?? "https://http2.mlstatic.com/D_NQ_NP_2X_660325-MLA45810336750_052021-F.webp";
console.log("producto" ,productFind);

{/*funcion para el input de incr y decr del product page*/}

const handleIncrement = (id: number) =>{
    const product = listProduct.find((product) => product.id === id);
    if(product){
      const newQuantity = (Number(product.selecQuantity) || 0) + 1;
      if (newQuantity > 0){
        updateProductQuantity(id, newQuantity);
      }else{
        removeListProduct(id);
      }
    } else if (productFind) {
        // Si el producto no está en la lista, lo agrega con cantidad inicial de 1
        addIndProduct({ ...productFind, selecQuantity: 1 });
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

//Función para enviar el recibo por mensaje.
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
const purchaseTotal = accountTotal();
const purchaseInvoice = listProduct.map((product) => 
                        `\nNombre: ${product.title}, \nCantidad: ${product.selecQuantity},                            \nPrecio: $${product.price}`)
                        .join("\n");
const message = `Hola, Equipo de NeverStop!\nQuiero comprar los siguientes productos:\n${purchaseInvoice}\n\nTotal: $${purchaseTotal}`;                    
const whatsappURL = `https://api.whatsapp.com/send?phone=541165123948&text=${message.replace(/\n/g, "%0A")}`;


    return(
        <section className="w-full mx-auto md:max-w-6xl max-w-2xl pt-44 md:pt-48 flex flex-col justify-center items-center overflow-hidden md:h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-4 md:max-h-screen overflow-hidden">
        {/* Primera columna */}
        <div className="grid grid-cols-1 md:grid-cols-3">
            {/* columna en destock de galeria */}
            <CompCarrousel 
            className="hidden md:flex flex-col justify-start items-center col-span-1 gap-y-2 py-4 "
            imageUrl={imageUrl}/>
            {/* imagen central de product */}
            <div className="flex flex-col justify-center md:justify-start items-center col-span-2">
            <Image
            src={imageUrl} 
            width={300} 
            height={300} 
            className="object-cover w-2/3 md:w-full"
            alt="Product Image"
            />
            </div>
            {/* componente de galeria para movile */}
            <CompCarrousel 
            className="flex md:hidden justify-center items-center gap-x-2"
            imageUrl={imageUrl}/>

        </div>
        {/* Segunda columna */}

        <div className=" p-4 relative overflow-auto">
          {/* titulo */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            {decodedTitle}
          </h2>
          {/* logica si segun el type de product */}
          {
            productFind?.productType !== "express" && (
          <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#A3128F] via-[#8F27F9] to-[#4D57ED] my-2 text-center py-2 px-3 ">          
            <span className="md:pb-0 transition-all text-white text-xl font-medium text-center">
            Importación por encargue ✈️
            </span>
          </div>
            )
          }

          {/* parte de los precios */}
          <div className="flex justify-start items-center gap-x-6">
            <div className="flex justify-start items-start flex-col">
              <span className="text-xs font-light">Pesos Argentinos</span>
              <h4 className="text-3xl font-medium mr-2">
                ${productFind?.price}ARS
              </h4>
            </div>
            <div className="flex justify-start items-start flex-col">
              <span className="text-xs font-light">Dólares o USDT
              </span>
              <h4 className="text-3xl font-medium mr-2">
                {converPrice(quotes.venta, productFind?.price)}USD
              </h4>
            </div>
          </div>
          <div>
            <span className="text-xs font-light">Cotización del dólar : ARS {quotes.venta}</span>           
          </div>
  
          <div className="flex justify-start items-center gap-x-6 mb-4">
            <div className="flex justify-center items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#212229"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
              <path d="M3 9l4 0"></path>
            </svg>
            <span className="font-medium text-xl">Envíos Gratis</span>
            </div>
            <InputCount
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            id={Number(productFind?.id)}
            inputCount="text-[#212229]"
            inputDecr="text-[#212229]"
            inputIncr="text-[#212229]"
            quantity={listProduct.length === 0
               ? Number(0) 
               : Number(productListFind?.selecQuantity )}
            />


          </div>
  
          <div className="flex mb-6 gap-4">
            <button 
            className="bg-[#212229] flex gap-2 items-center text-white px-3 py-3 md:px-4 md:py-2 rounded-full text-[0.9rem] md:text-medium font-semibold"
            onClick={(e) => {
              if(productFind){
                handleSumbitListProduct(e, productFind)
              }else{
                console.error('product not found');
              }}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 md:w-8 md:h-8"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
                strokeWidth="1"
              >
                <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                <path d="M12.5 17h-6.5v-14h-2"></path>
                <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5"></path>
                <path d="M16 19h6"></path>
                <path d="M19 16v6"></path>
              </svg>
              <span className="hidden md:block">AÑADIR AL CARRITO
              </span>
              <span className="block md:hidden">AÑADIR
              </span>
            </button>
  
            <button 
            className="bg-[#01BC39] flex gap-2 items-center font-semibold text-white px-3 py-3 text-[0.9rem] md:text-medium md:px-6 md:py-2 rounded-full"
            onClick={() => window.open(whatsappURL, "_blank")}
            rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 md:w-8 md:h-8"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
                strokeWidth="2"
              >
                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
              </svg>
              COMPRAR AHORA
            </button>
  
     
          </div>
          <hr className="text-gray-600"></hr>
  
          <div className="mt-4 font-normal text-md text-[#212229]">
            <p>{productFind?.description}</p>
          </div>
        </div>
      </div>
      {/* Mostrar CardProducts por misma categoria */}

      </section>
    )
}

export default ProductPage;