import { arrayAnimales, tablero } from "./modelo";
import { iniciaPartida } from "./motor";

document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.querySelector('.app-content')

    if (appContent) {
        for (let i = 0; i < 12; i++) {
            const divImagenes = document.createElement('div');
            divImagenes.className = 'letter';

            const img = document.createElement('img');
            img.src = arrayAnimales[i % arrayAnimales.length].imagen;
            img.alt = '';
            img.className = 'img d-none';

            divImagenes.setAttribute('data-indice-id', i.toString())
            img.setAttribute('data-indice-id', i.toString())

            divImagenes.appendChild(img);
            appContent.appendChild(divImagenes);

            divImagenes.addEventListener('click', () => {
                img.classList.toggle('d-none')
            })
        }

        // importar el tablero
        // llamar a la function iniciaPartida y pasarle el tablero como parametro

        iniciaPartida(tablero)
        // llamar a la funcion iniciarPartida
    }
})