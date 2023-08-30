import confetti from 'canvas-confetti';
import { cartas, Tablero, tablero } from "./modelo";
import { barajarCartas, contarIntentos, esPartidaCompleta, intentos, parejaEncontrada, parejaNoEncontrada, reiniciarContador, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta } from "./motor";

document.addEventListener('DOMContentLoaded', () => {
    const btnIniciar = document.getElementById('btn-iniciar');
    reiniciarCartas();

    if (btnIniciar && btnIniciar instanceof HTMLButtonElement) {
        btnIniciar.addEventListener('click', () => iniciaPartida(tablero));
    } else {
        throw new Error("No existe el botón");
    }
})

export const reiniciarCartas = () => {
    const appContent = document.querySelector('.app-content')
    if (appContent && appContent instanceof HTMLDivElement) {
        while (appContent.firstChild) {
            appContent.removeChild(appContent.firstChild);
        }
    } else {
        throw new Error("El elemento no es un div");
    }

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

        appContent.appendChild(divImagenes);
        divImagenes.appendChild(img);

        divImagenes.addEventListener('click', (event) => handleImageClick(event))
    }
}

export const mostrarValorIntentos = () => {
    const numeroIntentos = document.querySelector('.numero');
    if (numeroIntentos && numeroIntentos instanceof HTMLSpanElement) {
        numeroIntentos.textContent = intentos.toString()
    } else {
        throw new Error('El elemento no es un span')
    }
}

export const mensajes = (mostrar: boolean = true, texto: string = '', color: string = ''): void => {
    const mensaje = document.querySelector('.mensaje')
    if (mensaje && mensaje instanceof HTMLParagraphElement) {
        if (mostrar) {
            mensaje.style.visibility = 'visible';
            mensaje.style.color = color;
        } else {
            mensaje.style.visibility = 'hidden';
        }
        mensaje.textContent = texto;
    } else {
        throw new Error('El elemento no es un parrafo')
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

const voltearImagen = (targetElement: HTMLElement, idElemento: string) => {
    if (sePuedeVoltearLaCarta(tablero, Number(idElemento))) {
        const elementoImagen = targetElement.querySelector('img')
        if (elementoImagen && elementoImagen instanceof HTMLImageElement) {
            elementoImagen.classList.toggle('d-none');
        } else {
            throw new Error('El elemento no es una imagen')
        }
        voltearLaCarta(tablero, Number(idElemento));
    }
}

const partidaTerminada = () => {
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

const procesarParejaCartas = () => {
    if (tablero.indiceCartaVolteadaA !== undefined && tablero.indiceCartaVolteadaB !== undefined) {
        if (sonPareja(tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB, tablero)) {
            parejaEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB)
            partidaTerminada()
        } else {
            voltearImagenes(tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB);
            parejaNoEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB)
            contarIntentos()
            mostrarValorIntentos()
        }
    } else {
        throw new Error('Alguno de los índices está indefinido')
    }
}

const validartarjeta = (tablero: Tablero, targetElement: HTMLElement, idElemento: string) => {
    if (!isNaN(Number(idElemento))) {
        voltearImagen(targetElement, idElemento);

        if (tablero.indiceCartaVolteadaA === undefined || tablero.indiceCartaVolteadaB === undefined) {
            return;
        }
        procesarParejaCartas();
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
    } else {
        throw new Error('No es un evento')
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

const reiniciarTablero = () => {
    reiniciarCartas();
    reiniciarContador();
    mensajes(false)
    mostrarValorIntentos()
};

const iniciaPartida = (tablero: Tablero): void => {
    tablero.estadoPartida = 'CeroCartasLevantadas';
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    const cartasBarajadas = barajarCartas(cartas);
    tablero.cartas = [...cartasBarajadas];
    tablero.cartas.forEach(carta => {
        carta.encontrada = false;
        carta.estaVuelta = false;
    })
    reiniciarTablero()
}


