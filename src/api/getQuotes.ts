import { load } from 'cheerio';

export interface ResponseGetQuotes {
  compra: string;
  venta: string;
  ultimaActua: string;
}

const url = 'https://dolarhoy.com/cotizacion-dolar-blue';

async function getQuotes(): Promise<ResponseGetQuotes> {
  try {
    const response = await fetch(url); // Cambiamos a la API nativa fetch
    const html = await response.text();

    const $ = load(html);

    const compra = $('.tile.cotizacion_value .tile.is-parent.is-8 .tile.is-child .value')
      .first()
      .text()
      .trim();
    const venta = $('.tile.cotizacion_value .tile.is-parent.is-8 .tile.is-child .value')
      .last()
      .text()
      .trim();
    const ultimaActualizacion = $('.tile.update .tile.is-parent .tile.is-child span')
      .text()
      .trim();

    const data: ResponseGetQuotes = {
      compra: compra,
      venta: venta,
      ultimaActua: ultimaActualizacion,
    };

    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return {
      compra: 'N/A',
      venta: 'N/A',
      ultimaActua: 'N/A',
    };
  }
}

export default getQuotes;
