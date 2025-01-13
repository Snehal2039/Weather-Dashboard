document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');
  const suggestions = document.getElementById('suggestions');

  console.log('searchBar:', searchBar); // Should log the input element or null
  console.log('searchButton:', searchButton); // Should log the button element or null
  console.log('suggestions:', suggestions); // Should log the datalist element or null

  if (!searchBar || !searchButton || !suggestions) {
    console.error('Required DOM elements are missing.');
    return;
  }

  const weatherAPI = 'http://localhost:3000/weather';
  let searchHistory = [];

  async function fetchWeather(city) {
    try {
      const response = await fetch(`${weatherAPI}?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        document.getElementById('city-name').textContent = data.city;
        document.getElementById('temperature').textContent = `${data.temperature}°C`;
        document.getElementById('condition').textContent = data.condition;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('wind-speed').textContent = `${data.windSpeed} m/s`;

        if (!searchHistory.includes(city)) {
          searchHistory.push(city);
        }
      } else {
        alert(data.error || 'Error fetching weather data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching weather data');
    }
  }

  function updateSuggestions() {
    suggestions.innerHTML = '';
    searchHistory.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      suggestions.appendChild(option);
    });
  }

  searchButton.addEventListener('click', () => {
    const city = searchBar.value.trim();
    if (city) {
      fetchWeather(city);
      updateSuggestions();
    } else {
      alert('Please enter a city name');
    }
  });

  window.onload = updateSuggestions;
});
