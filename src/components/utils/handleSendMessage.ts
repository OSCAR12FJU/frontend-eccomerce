import useListProductStore from "@/store/sidebarStore";

const HandleSendMessage = () => {
    
    const {listProduct} = useListProductStore();
    // Función para calcular el total
    const accountTotal = (): number => {
      const total = listProduct.reduce((total, product) => {
        const productTotal = (product.selecQuantity || 0) > 1
          ? Number(product.price) * Number(product.selecQuantity || 1)
          : Number(product.price);
  
        return total + productTotal;
      }, 0);
      return Math.round(total);
    };
  
    const purchaseTotal = accountTotal();
    
    // Generar el mensaje con la factura
    const purchaseInvoice = listProduct
      .map((product) => 
        `\nNombre: ${product.title}, \nCantidad: ${product.selecQuantity}, \nPrecio: $${product.price}`)
      .join("\n");
  
    const message = `Hola, Equipo de NeverStop!\nQuiero comprar los siguientes productos:\n${purchaseInvoice}\n\nTotal: $${purchaseTotal}`;
  
    // Crear la URL para WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=541165123948&text=${message.replace(/\n/g, "%0A")}`;
    
    // Abrir la URL en una nueva ventana
    window.open(whatsappURL, "_blank");
  };

  export default HandleSendMessage;