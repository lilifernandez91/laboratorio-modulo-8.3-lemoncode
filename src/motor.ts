import { Carta, Tablero } from "./modelo"

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
const barajarCartas = (cartas: Carta[]): Carta[] => {
    const newArray = cartas.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const indiceAleatorio = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[indiceAleatorio]] = [newArray[indiceAleatorio], newArray[i]];
    }
    return newArray;
};

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
    // buscar la carta en el listado de cartas del tablero


    // retorna true si:
    // - la carta NO esta volteada y
    // - la carta NO esta encontrada y
    // - no hay dos cartas ya volteadas del mismo tipo (???)
    // si no retorna false
    return true;
}

const voltearLaCarta = (tablero: Tablero, indice: number): void => {
    // llama a la function sePuedeVoltearLaCarta
    // si la funcion retorna false, no hacer nada
    // si la funcion retorna true, volteamos la carta
}

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    // encontrar carta a
    // encontrar carta b
    // si son el mismo animal, retorna true, si no retorna false
    return true;
}

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
    // llamar a la function sonPareja
    // si retorna false, no haces nada
    // si retorna true, marcas las dos cartas como encontradas
    // chequeas si TODAS las cartas estan encontradas, si estan todas, partida completa, si no, no pasa nada
}

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
    // llamar a la function sonPareja
    // si es true no hacemos nada porque de eso se encarga la function parejaEncontrada
    // si es false, se voltean las dos cartas
}

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero): boolean => {
    // revisar si todas las cartas tienen el encontrada en true, 
    //en ese caso retornar true, 
    //si no retorna false
    return true;
}

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
    const cartasBarajadas = barajarCartas(tablero.cartas);
    tablero.cartas = [...cartasBarajadas];
    tablero.estadoPartida = "PartidaNoIniciada";
    tablero.indiceCartaVolteadaA = -1;
    tablero.indiceCartaVolteadaB = -1;
};  