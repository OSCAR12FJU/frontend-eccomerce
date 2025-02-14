import { create } from 'zustand';

export interface TypeProduct {
  id: number;
  title: string;
  price: number;
  description?: string;
  productType?: string;
  quantity?: number;
  category?: string;
  image: string;
}

interface ProductState {
  products: TypeProduct[]; 
  hasFetched: boolean; 
  lastFeched: number | null; 
  fetchProducts: () => Promise<void>;
  addProduct: (product: TypeProduct) => void; 
  getProductsByCategory: (category: string) => TypeProduct[]; 
}

interface ApiProductResponse{
    products: TypeProduct[];
    hasFetched: boolean;
    lastFeched: number | null; 
}

const CACHE_TTL = 60 * 1000;

// console.log("contenido...",localStorage.getItem('products'));

const useProductStore = create<ProductState>((set, get) => ({
    products: JSON.parse(localStorage.getItem('products') || '[]'),// Estado inicial
    hasFetched: false,
    lastFeched: Number(localStorage.getItem('lastFetched')) || null,

  
    // Obtener productos desde la API
    fetchProducts: async () => {
      const {hasFetched, lastFeched} = get();
      const now = Date.now();

      if(hasFetched && lastFeched && now - lastFeched < CACHE_TTL) {
        return;
      }

      try {
        const response = await fetch('https://backend-eccomerce-r7a8.onrender.com/api/product/getAllProducts'); 
        const data: ApiProductResponse = await response.json();
        //auque ya habiamos incializado anteriormente las propiedades con esa data, tenemos la ultima o si no se subio nada esta vacio, y aca despues la petiiciòn lo inciializacmos.

        set({ 
          products: data.products,
          hasFetched: true, 
          lastFeched: now
        }); 
        //Aca actulizamos el localstorage
        localStorage.setItem('products', JSON.stringify(data.products));
        localStorage.setItem('lastFetched', now.toString());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  
    // Agregar un producto
    addProduct: (product) =>
      set((state) => { 
        const updateProducts = [...state.products, product];
        localStorage.setItem('products', JSON.stringify(updateProducts));
        return {products: updateProducts};

      }),

    getProductsByCategory: (category: string) =>{
      const {products} = get();
      return products.filter(product => product.category === category);
    }
  }));
  
  export default useProductStore;