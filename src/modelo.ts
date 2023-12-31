import { barajarCartas } from "./motor";
export interface Carta {
    idFoto: number;
    imagen: string;
    estaVuelta: boolean;
    encontrada: boolean;
}

interface InfoCarta {
    idFoto: number;
    imagen: string;
}

export const arrayAnimales: InfoCarta[] = [
    { idFoto: 1, imagen: 'images/1.png' },
    { idFoto: 2, imagen: 'images/2.png' },
    { idFoto: 3, imagen: 'images/3.png' },
    { idFoto: 4, imagen: 'images/4.png' },
    { idFoto: 5, imagen: 'images/5.png' },
    { idFoto: 6, imagen: 'images/6.png' },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
    idFoto,
    imagen,
    estaVuelta: false,
    encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
    const cartas: Carta[] = [];

    for (const infoCarta of infoCartas) {
        const carta1 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
        const carta2 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);

        cartas.push(carta1, carta2);
    }
    return cartas;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(arrayAnimales);

export type EstadoPartida =
    | "PartidaNoIniciada"
    | "CeroCartasLevantadas"
    | "UnaCartaLevantada"
    | "DosCartasLevantadas"
    | "PartidaCompleta";

export interface Tablero {
    cartas: Carta[];
    estadoPartida: EstadoPartida;
    indiceCartaVolteadaA?: number;
    indiceCartaVolteadaB?: number;
}

export const crearTableroInicial = (): Tablero => {
    const cartasBarajadas = barajarCartas(cartas);

    const tablero: Tablero = {
        cartas: cartasBarajadas,
        estadoPartida: "PartidaNoIniciada",
    }
    return tablero;
};

export let tablero: Tablero = crearTableroInicial();

