const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const fetchWeather = () => {
    const APIkey = 'dc8aac8756a561215610c184fe183385';
    const city = input.value;

    if (city == '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.remove('active');
            void weatherBox.offsetWidth;

            container.style.height = '555px';

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            setTimeout(() => {
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
            }, 100);
        });
};

search.addEventListener('click', fetchWeather);

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
