import { create } from 'zustand';

export interface TypeListProduct {
  id: number;
  title: string;
  price: number;
  description?: string;
  quantity?: number;
  selecQuantity?: number;
  category?: string;
  image: string;
}

interface ProductState {
  listProduct: TypeListProduct[]; 
  listSidebarProduct: TypeListProduct[]; 
  isNotification: boolean; 
  addListProduct: (product: TypeListProduct[]) => void; 
  addListSidebarProduct: (product: TypeListProduct[]) => void; 
  addIndProduct: (product: TypeListProduct) => void; 
  removeListProduct: (id: number) => void;
  setNotification: (value: boolean) => void;
  updateProductQuantity: (id: number, quantity: number) => void; 
}

const useListProductStore = create<ProductState>((set) => ({
    listProduct: [], // Estado inicial
    listSidebarProduct: [], 
    isNotification: false, 
  
    // Agregar un producto
    // addListProduct: (product) =>
    //   set((state) => ({ listProduct: [...stateA.listProduct, product] })),
    addListProduct: (product) => set({ listProduct: product }),

    addListSidebarProduct: (product) => set({ listSidebarProduct: product }),

    addIndProduct: (product) => set((state) => ({
      listProduct: [...state.listProduct, product]
    })),

    //Eliminar de la lista
    removeListProduct: (id) =>
        set((state) => ({
          listProduct: state.listProduct.filter((product) => product.id !== id),
        })),
    //Avisar que se selecciono un valor
    setNotification: (value) =>set({isNotification: value}) ,

    //Cambiar el valor del selecQuantity
    updateProductQuantity: (id, selecQuantity) =>
      set((state) => ({
        listProduct: state.listProduct.map((product) =>
        product.id === id ? {...product, selecQuantity}: product)
      }))
  }));


  

  export default useListProductStore;