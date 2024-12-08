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

// Configuración de las calificaciones interactivas
document.querySelectorAll('.rating').forEach(starContainer => {
    starContainer.addEventListener('click', () => {
        const ratingId = starContainer.dataset.id; // Identificador único de la serie
        const newRating = prompt("Califica del 1 al 5:"); // Solicita calificación
        if (newRating >= 1 && newRating <= 5) {
            // Actualiza la interfaz con la nueva calificación
            starContainer.textContent = '★'.repeat(newRating) + '☆'.repeat(5 - newRating);
            console.log(`Guardando calificación para ${ratingId}: ${newRating}`);
            // Aquí podrías almacenar la calificación en un archivo JSON o en un backend
        } else {
            alert("Por favor, ingresa un número entre 1 y 5.");
        }
    });
});

// Configuración de botones like/dislike
document.querySelectorAll('.like-button, .dislike-button').forEach(button => {
    button.addEventListener('click', () => {
        const ratingId = button.dataset.id; // Identificador único de la serie
        const feedback = button.classList.contains('like-button') ? 'Like' : 'Dislike';
        console.log(`Feedback para ${ratingId}: ${feedback}`);
        // Aquí podrías almacenar el feedback en un archivo JSON o en un backend
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
        delay: 8000, // Cambia automáticamente cada 3 segundos
    },
});
