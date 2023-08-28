import confetti from 'canvas-confetti';
import { tablero } from "./modelo";
import { esPartidaCompleta, iniciaPartida, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta } from "./motor";

const btnIniciar = document.getElementById('btn-iniciar');
const numeroIntentos = document.querySelector('.numero');

let intentos = 10;

document.addEventListener('DOMContentLoaded', () => {
    reiniciarCartas();

    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => iniciaPartida(tablero));
    }
})

export const reiniciarCartas = () => {
    const appContent = document.querySelector('.app-content')

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
        img.id = `imagen__${i}`

        divImagenes.setAttribute('data-indice-id', i.toString())
        img.setAttribute('data-indice-id', i.toString())

        appContent?.appendChild(divImagenes);
        divImagenes?.appendChild(img);

        divImagenes.addEventListener('click', (event) => handleImageClick(event))
    }
}

const actualizarContador = () => {
    if (numeroIntentos) {
        numeroIntentos.textContent = intentos.toString()
    }
}

const contarIntentos = () => {
    intentos--;
    actualizarContador()
}

export const reiniciarContador = () => {
    intentos = 10
    actualizarContador()
}

export const mensajes = (mostrar: boolean = true, texto: string = '', color: string = ''): void => {
    const mensaje = document.querySelector('.mensaje') as HTMLElement
    if (mensaje) {
        if (mostrar) {
            mensaje.classList.remove('d-none')
            mensaje.textContent = texto;
            mensaje.style.color = color;
        } else {
            mensaje.classList.add('d-none');
            mensaje.textContent = texto;
        }

    }
}

const handleImageClick = (event: Event) => {
    if (event instanceof MouseEvent) {
        const targetElement = event.target as HTMLElement;
        const idElemento = targetElement.id;

        if (idElemento.includes('imagen')) {
            mensajes(true, 'Esta carta ya está volteada', 'red')
        } else {
            mensajes(false)
        }

        if (tablero.estadoPartida === "PartidaCompleta") {
            return;
        }

        if (intentos === 0) {
            return;
        }

        if (!isNaN(Number(idElemento))) {
            if (sePuedeVoltearLaCarta(tablero, Number(idElemento))) {
                targetElement.querySelector('img')?.classList.toggle('d-none');
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
                document.getElementById(`imagen__${tablero.indiceCartaVolteadaB}`)?.classList.add('d-none')
                contarIntentos()
            }

            if (intentos === 0) {
                mensajes(true, '❌ Lo siento, has perdido', 'red')
            }
        }
    }
}

export const voltearImagenes = (indiceA: number, indiceB: number) => {
    setTimeout(() => {
        document.getElementById(`imagen__${indiceA}`)?.classList.add('d-none')
        document.getElementById(`imagen__${indiceB}`)?.classList.add('d-none')
    }, 500);
}

