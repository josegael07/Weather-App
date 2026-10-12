import { getWeather, type City } from "./city";

let currentUnit: "celsius" | "fahrenheit" = "celsius";
let currentCity: City | undefined;


// displays
const nameDisplay = document.getElementById("city-name") as HTMLDivElement;
const todayDisplay = document.getElementById("today") as HTMLDivElement;
const feelingDisplay = document.getElementById("feeling") as HTMLDivElement;
const condsDisplay = document.getElementById("conditions") as HTMLDivElement;
const humidityDisplay = document.getElementById("humidity") as HTMLDivElement;
const precipDisplay = document.getElementById("precipitation") as HTMLDivElement;

// buttons
const enterBtn = document.getElementById("enter") as HTMLButtonElement;
const measureBtn = document.getElementById("toggle-measurement") as HTMLButtonElement;

// input
const cityInput = document.getElementById("cityName") as HTMLInputElement;

enterBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const inputedCity = cityInput.value.trim();
    console.log(inputedCity);

    if (!inputedCity) return;

    const city: City | undefined = await getWeather(inputedCity);

    if (!city) return;

    currentCity = city;
    displayWeather(city);

    nameDisplay.textContent = city.cityName;
    condsDisplay.textContent = city.conditions;
    humidityDisplay.textContent = `${city.humidity}%`;
    precipDisplay.textContent = `${city.precip} mm`;
});


measureBtn.addEventListener("click", () => {
    currentUnit = currentUnit === "celsius" ? "fahrenheit" : "celsius";

    if (currentCity) {
        displayWeather(currentCity);
    }
});

function displayWeather(city: City): void {
    let currentTemp: number= city.currentWeather;
    let feelsLikeTemp : number = +city.feelsLike;
    let unit = "°C";

    if (currentUnit === "fahrenheit") {
        currentTemp = conversion(currentTemp, "fahrenheit");
        feelsLikeTemp = conversion(feelsLikeTemp, "fahrenheit");
        unit = "°F";
    }

    todayDisplay.innerText = currentTemp + " " + unit;
    feelingDisplay.innerText = feelsLikeTemp + " " + unit;
}


function conversion(temp: number, type: string): number {
    if (type === "fahrenheit") {
        return (temp * 9) / 5 + 32;
    } else {
        return ((temp - 32) * 5) / 9;
    }
}

