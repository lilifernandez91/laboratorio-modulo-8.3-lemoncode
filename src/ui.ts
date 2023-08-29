import confetti from 'canvas-confetti';
import { Tablero, tablero } from "./modelo";
import { contarIntentos, esPartidaCompleta, iniciaPartida, intentos, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta } from "./motor";

const btnIniciar = document.getElementById('btn-iniciar');
const numeroIntentos = document.querySelector('.numero');
const appContent = document.querySelector('.app-content')
const mensaje = document.querySelector('.mensaje')

document.addEventListener('DOMContentLoaded', () => {
    reiniciarCartas();

    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => iniciaPartida(tablero));
    }
})

export const reiniciarCartas = () => {
    if (appContent) {
        while (appContent.firstChild) {
            appContent.removeChild(appContent.firstChild);
        }
    }

    tablero.cartas;

    for (let i = 0; i < tablero.cartas.length; i++) {
        const divImagenes = document.createElement('div');
        const cartaDelListado = tablero.cartas[i % tablero.cartas.length];

        divImagenes.className = 'letter';
        divImagenes.id = `${i}`;

        const img = document.createElement('img');
        img.src = cartaDelListado.imagen;
        img.alt = '';
        img.className = 'img d-none';
        img.id = `imagen__${i}`;
        img.setAttribute('data-indice-id', i.toString())

        divImagenes.setAttribute('data-indice-id', i.toString())

        appContent?.appendChild(divImagenes);
        divImagenes?.appendChild(img);

        divImagenes.addEventListener('click', (event) => handleImageClick(event))
    }
}

export const mostrarValorIntentos = () => {
    if (numeroIntentos) {
        numeroIntentos.textContent = intentos.toString()
    }
}

export const mensajes = (mostrar: boolean = true, texto: string = '', color: string = ''): void => {
    if (mensaje instanceof HTMLElement) {
        if (mostrar) {
            mensaje.style.visibility = 'visible';
            mensaje.style.color = color;
        } else {
            mensaje.style.visibility = 'hidden';
        }
        mensaje.textContent = texto;
    }
}

const mensajeHasPerdido = () => {
    if (intentos === 0) {
        mensajes(true, '❌ Lo siento, has perdido', 'red');
        return;
    }
}

const tarjetaYaVolteada = (idElemento: string) => {
    if (idElemento.includes('imagen')) {
        mensajes(true, 'Esta carta ya está volteada', 'red')
    } else {
        mensajes(false)
    }
}

const partidaCompletada = (tablero: Tablero) => {
    if (tablero.estadoPartida === "PartidaCompleta") {
        return;
    }
}

const validartarjeta = (tablero: Tablero, targetElement: HTMLElement, idElemento: string) => {
    if (!isNaN(Number(idElemento))) {
        if (sePuedeVoltearLaCarta(tablero, Number(idElemento))) {
            const elementoImagen = targetElement.querySelector('img')
            if (elementoImagen instanceof HTMLElement) {
                elementoImagen.classList.toggle('d-none');
            } else {
                throw new Error('No es un elemento html')
            }
            voltearLaCarta(tablero, Number(idElemento));
        }

        if (tablero.indiceCartaVolteadaA === undefined || tablero.indiceCartaVolteadaB === undefined) {
            return;
        }

        if (sonPareja(tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB, tablero)) {
            parejaEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB)

            const partidaCompleta = esPartidaCompleta(tablero);

            if (partidaCompleta) {
                tablero.estadoPartida = 'PartidaCompleta';
                mensajes(true, '🎉 Felicitaciones, has ganado', 'green');
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
        else {
            parejaNoEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB)
            const indiceB = document.getElementById(`imagen__${tablero.indiceCartaVolteadaB}`)
            if (indiceB instanceof HTMLElement) {
                indiceB.classList.add('d-none')
            }
            contarIntentos()
        }
        mensajeHasPerdido()
    }
}

const handleImageClick = (event: Event) => {
    if (event instanceof MouseEvent) {
        const targetElement = event.target;

        if (tablero.estadoPartida === 'PartidaNoIniciada') {
            mensajes(true, 'Pulse en el botón Iniciar Partida', 'red')
            return;
        }

        if (targetElement instanceof HTMLElement) {
            const idElemento = targetElement.id;

            tarjetaYaVolteada(idElemento)
            partidaCompletada(tablero)
            validartarjeta(tablero, targetElement, idElemento)
        } else {
            throw new Error('No es un elemento html')
        }
    }
}

export const voltearImagenes = (indiceA: number, indiceB: number) => {
    setTimeout(() => {
        const elementoA = document.getElementById(`imagen__${indiceA}`);
        const elementoB = document.getElementById(`imagen__${indiceB}`);
        if (elementoA instanceof HTMLElement) {
            elementoA.classList.add('d-none')
        } else {
            throw new Error('No es un elemento html')
        }
        if (elementoB instanceof HTMLElement) {
            elementoB.classList.add('d-none')
        } else {
            throw new Error('No es un elemento html')
        }
    }, 500);
}


