import { Carta, cartas, Tablero } from "./modelo"
import { mostrarValorIntentos, mensajes, reiniciarCartas, voltearImagenes } from "./ui";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const newArray = cartas.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const indiceAleatorio = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[indiceAleatorio]] = [newArray[indiceAleatorio], newArray[i]];
  }
  return newArray;
};

export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  const carta = tablero.cartas[indice];

  if (carta.encontrada || carta.estaVuelta) {
    return false;
  }

  const cartasVolteadasDelMismoTipo = tablero.cartas.filter(x => x.estaVuelta && !x.encontrada);

  if (cartasVolteadasDelMismoTipo.length <= 1) {
    return true;
  }

  return false;
}

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {

  const carta = tablero.cartas[indice];
  carta.estaVuelta = true;

  tablero.indiceCartaVolteadaA === undefined
    ? (tablero.indiceCartaVolteadaA = indice)
    : (tablero.indiceCartaVolteadaB = indice);
}

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  const cartaA = tablero.cartas[indiceA]
  const cartaB = tablero.cartas[indiceB]

  return cartaA.idFoto === cartaB.idFoto
}

export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  cartaA.encontrada = true;
  cartaB.encontrada = true;

  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
}

export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  cartaA.estaVuelta = false;
  cartaB.estaVuelta = false;

  voltearImagenes(indiceA, indiceB);

  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
}

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every(carta => carta.encontrada);
}

export let intentos = 10;

export const contarIntentos = () => {
  intentos--;
  mostrarValorIntentos()
}

const reiniciarContador = () => {
  intentos = 10
  mostrarValorIntentos()
}

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.estadoPartida = 'CeroCartasLevantadas';
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  const cartasBarajadas = barajarCartas(cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.cartas.forEach(carta => {
    carta.encontrada = false;
    carta.estaVuelta = false;
  })

  reiniciarCartas();
  reiniciarContador();
  mensajes(false)
};

