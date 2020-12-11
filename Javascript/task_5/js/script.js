let today;
const door = document.querySelector(".check");
const details = document.querySelector(".details");

door.addEventListener("change", function () {
    details.classList.toggle("open");
});

//Создает главный элемент
function createMainWeather(obj) {
    let current = document.createElement("div");
    current.classList.add("current");
    current.innerHTML = `
        <div class="current__title">
            <h2>${obj.location}</h2>
        </div>
        <div class="current__temp">
            <img src="http://openweathermap.org/img/wn/${
                obj.current.icon
            }@2x.png" alt="icon" />
            <span>${obj.current.temp} °C</span>
        </div>
        <div class="current__type">${obj.current.main}</div>
        <div class="current__date">
            <span>${dateForamt(obj.current.dt, "hh:mm MM DD")}</span>
            <a href="#">Wrong data?</a>
        </div>
        <div class="current__info">
            <table>
                <tbody>
                    <tbody>
                        <tr>
                            <th>Wind</th>
                            <th>${obj.current.wind.speed} m/s, ${
        obj.current.wind.deg
    } deg</th>
                        </tr>
                        <tr>
                            <td>Cloudiness</td>
                            <td>${obj.current.description}</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>${obj.current.pressure} hPa</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>${obj.current.humidity}%</td>
                        </tr>
                        <tr>
                            <td>Sunrise</td>
                            <td>${obj.current.sunrise}</td>
                        </tr>
                        <tr>
                            <td>Sunset</td>
                            <td>${obj.current.sunset}</td>
                        </tr>
                        <tr>
                            <td>Geo coords</td>
                            <td><a href="#">[${obj.latitude.toFixed(
                                2
                            )}   ${obj.longitude.toFixed(2)}]</a></td>
                        </tr>
                    </tbody>
                </tbody>
            </table>
        </div>
    `;
    let element = document.querySelector(".weather");
    element.prepend(current);
}

//Создаем дополнительные элементы
function createAddWeather(obj) {
    let additional = document.createElement("div");
    additional.classList.add("block");
    additional.innerHTML = `
        <div class="block__date">${dateForamt(obj.dt, "DD MM ww")}</div>
        <div class="block__temp">
            <img src="http://openweathermap.org/img/wn/${
                obj.icon
            }@2x.png" alt="icon" />
            <span>${Math.round(obj.temp)} °C</span>
        </div>
        <div class="block__info">
            <div class="item">
                <span>Wind: ${obj.wind.speed} m/s</span>
            </div>
            <div class="item">
                <span>Cloudiness: ${obj.description}</span>
            </div>
            <div class="item">
                <span>Pressure: ${obj.pressure} hPa</span>
            </div>
            <div class="item">
                <span>Humidity: ${obj.humidity}%</span>
            </div>
        </div>
    `;
    let element = document.querySelector(".weather");
    element.append(additional);
}

//Создаем детальное описание каждого дня
function createDetailWeather(obj) {
    let fragment = document.createDocumentFragment();
    let main = document.querySelector(".details");
    let currentDay = new Date().getDate();
    let first = createDay(obj[0]);
    fragment.appendChild(first);
    obj.forEach((item, index) => {
        if (index % 4 == 0) {
            let itemDate = dateForamt(item.dt, "DD");
            if (itemDate == currentDay) {
                let last = fragment.lastChild;
                let element = createRow(obj[index]);
                last.append(element);
            } else {
                currentDay++;
                let element = createDay(obj[index]);
                fragment.append(element);
            }
        }
    });
    main.append(fragment);
}

//Создаем общий блок по дням
function createDay(obj) {
    let day = document.createElement("div");
    day.classList.add("day");
    day.innerHTML = `<div class="day__header">${dateForamt(
        obj.dt,
        "ww MM DD yyyy"
    )}</div>`;
    return day;
}

//Создаем блок втечении дня
function createRow(obj) {
    let row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `
        <div class="row__time">
            <span>${dateForamt(obj.dt, "hh:mm")}</span>
            <img src="http://openweathermap.org/img/wn/${
                obj.icon
            }@2x.png" alt="icon" />
        </div>
        <div class="row__body">
            <div class="line temp">
                <div>${Math.round(obj.temp)} °C</div>
                <div>${obj.description}</div>
            </div>
            <div class="line">
                <div>${obj.wind.speed} m/s</div>
                <div>${obj.humidity}: 11 %</div>
                <div>${obj.pressure} hPa</div>
            </div>
        </div>
    `;
    return row;
}

//Проверяем доступен ли навигатор
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        alert("Geolocation is not supported!");
    }
}

//Если навигатор доступен получаем данные
function displayLocation(position) {
    today = new Weather(position.coords.latitude, position.coords.longitude);
    today.getInfo();
}

//Класс для хранения информации о погоде
class Weather {
    static key = "77adcdc6a1083bbaf412f4de867b8bde";
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    async getInfo() {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&appid=${Weather.key}`
        );
        let json = await response.json();
        this.current = parseDay(json.current);
        this.forecast = parseSomeDays(json.daily);
        this.detail = parseSomeDays(json.hourly);
        this.location = json.timezone;
        createMainWeather(this);
        createDetailWeather(this.detail);
        for (let i = 1; i < 7; i++) {
            createAddWeather(this.forecast[i]);
        }
    }
}

//Парсим один день
function parseDay(obj) {
    let weather = {};
    weather.wind = {};
    //Блок weather
    weather.id = obj.weather[0].id;
    weather.main = obj.weather[0].main;
    weather.description = upper(obj.weather[0].description);
    weather.icon = obj.weather[0].icon;
    //Основной блок
    weather.temp = toCelsius(
        obj.temp instanceof Object ? +avg(obj.temp) : obj.temp
    );
    weather.humidity = obj.humidity;
    weather.pressure = obj.pressure;
    weather.clouds = obj.clouds;
    weather.sunrise = obj.sunrise
        ? dateForamt(obj.sunrise, "hh:mm")
        : undefined;
    weather.sunset = obj.sunset ? dateForamt(obj.sunset, "hh:mm") : undefined;
    weather.dt = obj.dt;
    //Блок wind
    weather.wind.speed = obj.wind_speed;
    weather.wind.deg = obj.wind_deg;
    return weather;
}

//Парсим несколькод ней
function parseSomeDays(obj) {
    let forecast = [];
    for (let value of Object.values(obj)) {
        forecast.push(parseDay(value));
    }
    return forecast;
}

//Находим среднюю температуру
function avg(obj) {
    let sum = Object.values(obj).reduce((prev, current) => {
        return prev + current;
    }, 0);
    return (sum / Object.values(obj).length).toFixed(2);
}

//Секунды в часы
function secondsToHours(s) {
    let date = new Date(s * 1000);
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return `${hours}:${minutes}`;
}

//Форматирование даты по формату
function dateForamt(s, format) {
    let date = new Date(s * 1000);
    let month = date.toLocaleString("en", { month: "short" });
    let monthFull = date.toLocaleString("en", { month: "long" });
    let year = date.getFullYear();
    let week = date.toLocaleString("en", { weekday: "long" });
    let day = date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let result = String(format)
        .replace("MMM", monthFull)
        .replace("MM", month)
        .replace("yyyy", year)
        .replace("ww", week)
        .replace("DD", day)
        .replace("hh", hours)
        .replace("mm", minutes);
    return result;
}

//Первая буква заглавная
function upper(str) {
    return str[0].toUpperCase() + str.slice(1);
}

//Перевод K->C
function toCelsius(kelvin) {
    return kelvin - 273.15;
}

window.onload = function () {
    getLocation();
};
