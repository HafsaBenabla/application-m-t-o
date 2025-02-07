// URL de l'API météo
const API_URL = 'https://goweather.herokuapp.com/weather';

// Récupération des éléments HTML
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const windSpeedElement = document.getElementById('wind-speed');

// Fonction pour obtenir les données météo
async function getWeatherData(city) {
    try {
        // Faire la requête à l'API
        const response = await fetch(`${API_URL}/${city}`);
        
        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error('Ville non trouvée');
        }

        // Convertir la réponse en JSON
        const data = await response.json();
        
        // Mettre à jour l'interface
        updateUI(data, city);
    } catch (error) {
        // Afficher l'erreur
        alert('Erreur : ' + error.message);
    }
}

// Fonction pour mettre à jour l'interface
function updateUI(data, city) {
    // Afficher le nom de la ville
    cityElement.textContent = city;

    // Afficher la température (enlever le "°C" de la réponse)
    const temp = data.temperature.replace('°C', '');
    temperatureElement.textContent = temp;

    // Afficher la description
    descriptionElement.textContent = data.description || 'Information non disponible';

    // Afficher la vitesse du vent (enlever "km/h" de la réponse)
    const wind = data.wind.replace('km/h', '').trim();
    windSpeedElement.textContent = wind;
}

// Quand on clique sur le bouton rechercher
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

// Quand on appuie sur Entrée dans la recherche
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Charger Paris au démarrage
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData('Paris');
});