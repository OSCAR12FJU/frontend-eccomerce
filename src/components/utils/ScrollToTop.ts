"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'; // Desactiva la restauración automática
      }
      return () => {
        window.history.scrollRestoration = 'auto'; // Restaura el comportamiento al desmontar
      };
    }, [pathname]); // Se asegura de ejecutarse en cada cambio de ruta
  
    return null;
};

export default ScrollToTop;
