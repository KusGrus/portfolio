let today;
let severaldays;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        alert("Geolocation is not supported!");
    }
}

function displayLocation(position) {
    today = new WeatherToday(
        position.coords.latitude,
        position.coords.longitude
    );
    severaldays = new WeatherSeveralDays(
        position.coords.latitude,
        position.coords.longitude
    );

    today.getInfo();
    severaldays.getInfo();
}

class Weather {
    static key = "77adcdc6a1083bbaf412f4de867b8bde";
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    async getInfo(url) {
        let response = await fetch(
            `https://${url}?lat=${this.latitude}&lon=${this.longitude}&appid=${Weather.key}`
        );
        let json = await response.json();
        return json
    }
}


class WeatherToday extends Weather {
    constructor(latitude, longitude) {
        super(latitude, longitude);
        this.type = "today";
    }
    async getInfo(){
        const url = `api.openweathermap.org/data/2.5/weather`;
        let json = await super.getInfo(url);
        console.log(json);
        
    }
}

class WeatherSeveralDays extends Weather {
    constructor(latitude, longitude) {
        super(latitude, longitude);
        this.type = "severaldays";
    }

    async getInfo(){
        const url = `api.openweathermap.org/data/2.5/onecall`;
        super.getInfo(url);
    }
}

window.onload = function () {
    getLocation();
};
