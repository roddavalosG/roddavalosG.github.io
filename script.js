// Obtener ratings de IMDb para cada serie
const series = [
    { name: "Breaking Bad", apiName: "Breaking+Bad" },
    { name: "Better Call Saul", apiName: "Better+Call+Saul" },
    { name: "Bojack Horseman", apiName: "Bojack+Horseman" },
    { name: "Avatar: La Leyenda de Aang", apiName: "Avatar+The+Last+Airbender" },
    { name: "The Boys", apiName: "The+Boys" },
    { name: "The Office", apiName: "The+Office" },
    { name: "Rick y Morty", apiName: "Rick+and+Morty" },
    { name: "Community", apiName: "Community" },
    { name: "Brooklyn Nine-Nine", apiName: "Brooklyn+Nine-Nine" },
    { name: "Parks and Recreation", apiName: "Parks+and+Recreation" }
];

const apiKey = "335f7e80"; // Reemplaza con tu API Key de OMDb

series.forEach(serie => {
    fetch(`https://www.omdbapi.com/?t=${serie.apiName}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const listItem = Array.from(document.querySelectorAll("li")).find(item =>
                item.textContent.includes(serie.name)
            );
            if (listItem) {
                listItem.innerHTML += ` - IMDb: ${data.imdbRating}/10`;
            }
        })
        .catch(err => console.error(`Error fetching data for ${serie.name}: ${err.message}`));
});

// Configuración de las calificaciones interactivas con persistencia
document.querySelectorAll('.rating').forEach(starContainer => {
    const ratingId = starContainer.dataset.id; // Identificador único de la serie

    // Cargar calificación guardada (si existe)
    const savedRating = localStorage.getItem(`rating-${ratingId}`);
    if (savedRating) {
        starContainer.textContent = '★'.repeat(savedRating) + '☆'.repeat(5 - savedRating);
    }

    starContainer.addEventListener('click', () => {
        const newRating = prompt("Califica del 1 al 5:"); // Solicita calificación
        if (newRating >= 1 && newRating <= 5) {
            // Guardar calificación en LocalStorage
            localStorage.setItem(`rating-${ratingId}`, newRating);
            // Actualizar la interfaz
            starContainer.textContent = '★'.repeat(newRating) + '☆'.repeat(5 - newRating);
            console.log(`Guardando calificación para ${ratingId}: ${newRating}`);
        } else {
            alert("Por favor, ingresa un número entre 1 y 5.");
        }
    });
});

// Configuración de botones like/dislike con persistencia
document.querySelectorAll('.like-button, .dislike-button').forEach(button => {
    const ratingId = button.dataset.id; // Identificador único de la serie
    const feedbackType = button.classList.contains('like-button') ? 'like' : 'dislike';

    // Cargar feedback guardado (si existe)
    const savedFeedback = localStorage.getItem(`feedback-${ratingId}`);
    if (savedFeedback) {
        if (savedFeedback === 'like') {
            document.querySelector(`[data-id="${ratingId}"].like-button`).disabled = true;
        } else if (savedFeedback === 'dislike') {
            document.querySelector(`[data-id="${ratingId}"].dislike-button`).disabled = true;
        }
    }

    button.addEventListener('click', () => {
        // Guardar feedback en LocalStorage
        localStorage.setItem(`feedback-${ratingId}`, feedbackType);
        console.log(`Feedback para ${ratingId}: ${feedbackType}`);

        // Deshabilitar ambos botones
        document.querySelector(`[data-id="${ratingId}"].like-button`).disabled = true;
        document.querySelector(`[data-id="${ratingId}"].dislike-button`).disabled = true;
    });
});

// Configuración del carrusel con Swiper.js
const swiper = new Swiper('.swiper-container', {
    loop: true, // Hace que el carrusel sea infinito
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 8000, // Cambia automáticamente cada 8 segundos
    },
});
