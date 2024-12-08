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
    { name: "South Park", apiName: "South+Park" }
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

