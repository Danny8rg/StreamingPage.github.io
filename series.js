import { series } from "./model.js";

const main = document.getElementById('boxSeries');
const buscador = document.getElementById('input');
const boton = document.getElementById('submit');

const openModalBtn = document.querySelectorAll('.btn');
const trailer = document.getElementById('trailer');
const modal = document.getElementById('videoModal');
const closeModal = modal.querySelector('.close');

const createTarget = (MovieName, srcimg, descriptiontext, categoria, videoUrl) => {
    const target = document.createElement('div');
    target.className = 'movie-card';

    const title = document.createElement('p');
    title.className = 'titulo';
    title.textContent = MovieName;

    const img = document.createElement('img');
    img.className = 'img-movie';
    img.src = srcimg;
    img.alt = 'imagen de la carátula';

    const description = document.createElement('p');
    description.className = 'info';
    description.textContent = descriptiontext;

    const category = document.createElement('p');
    category.className = 'info1';
    category.textContent = categoria;

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Ver trailer';

    btn.addEventListener('click', () => {
        trailer.src = videoUrl;
        modal.style.display = 'block';
    });

    target.appendChild(title);
    target.appendChild(img);
    target.appendChild(description);
    target.appendChild(category);
    target.appendChild(btn);

    main.appendChild(target);
};

for (const movie of series) {
    createTarget(movie.title, movie.Imageurl, movie.description, movie.category, movie.videoUrl);
}

const stopVideo = () => {
    trailer.src = '';
    modal.style.display = 'none';
};

closeModal.addEventListener('click', () => {
    stopVideo();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        stopVideo();
    }
});

const filtrar = () => {
    stopVideo();
    modal.style.display = 'none';
    main.innerHTML = '';

    const busqueda = buscador.value.toLowerCase();
    for (const movie of series) {
        const nombre = movie.title.toLowerCase();
        if (nombre.indexOf(busqueda) !== -1) {
            createTarget(movie.title, movie.Imageurl, movie.description, movie.category, movie.videoUrl);
        }
    }

    if (!main.firstChild) {
        const notFound = document.createElement('p');
        notFound.textContent = 'Película no encontrada...';
        main.appendChild(notFound);
    }
};

boton.addEventListener('click', filtrar);