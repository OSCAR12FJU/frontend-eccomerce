import { create } from 'zustand';

// export interface TypeProduct {
//   id: number;
//   title: string;
//   price: number;
//   description?: string;
//   quantity?: number;
//   category?: string;
//   image: string;
// }
// interface TypeCategory{

// }


interface ApiCategoryResponse{
  category: string[];
  lastFetched: number | null;
  hasFetched: boolean;
}

interface CategoryProductState {
  category: string[]; 
  fetchCategoryProducts: () => Promise<void>;
  lastFetched: number | null;
  hasFetched: boolean;
  // addProduct: (product: TypeProduct) => void; 
}

const CACHE_TTL = 60 * 1000;

// console.log("content category.....", localStorage.getItem('category'));

const useCategoryProductStore = create<CategoryProductState>((set, get) => ({
    category: JSON.parse(localStorage.getItem('category') || '[]'), // Estado inicial
    lastFetched: Number(localStorage.getItem('lastFetchedCategory')) || null,
    hasFetched: false,


    // Obtener productos desde la API
    fetchCategoryProducts: async () => {
      const {hasFetched, lastFetched} = get();
      const now = Date.now();
      
      if(hasFetched && lastFetched && now - lastFetched < CACHE_TTL){
        return;
      }

      try {
        const response = await fetch('https://backend-eccomerce-r7a8.onrender.com/api/category/getAllCategory'); 
        const data: ApiCategoryResponse = await response.json();

        set({
          category: data.category,
          hasFetched: true,
          lastFetched: now 
        }); 
        localStorage.setItem('category', JSON.stringify(data.category));
        localStorage.setItem('lastFetchedCategory', now.toString());

      } catch (error) {
        console.error('Error fetching category:', error);
      }
    },
  
    // Agregar un producto
    // addCategory: (category) =>
    //   set((state) => { 
    //     const updateCategory =  [...state.category, category];
    //     localStorage.setItem('category', JSON.stringify(updateCategory));
    //     return {category: updateCategory};
    //    }),
  }));
  
  export default useCategoryProductStore;