import "./styles.css";

const API_KEY: string = "2YBV9DZJKJFKGAWHL3J7CX6X5";


type DayForecasts = {
    date: string;
    high: number;
    low: number;
    conditions: string;
    precip: number;
    humidity: number;
}

export type City = {
    cityName: string;
    currentWeather: number;
    feelsLike: string;
    conditions: string;
    precip: number;
    humidity: number;
    days: DayForecasts[];
}


async function getWeather(location: string): Promise<City | undefined> {
    try {
        const API_LINK: string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;
        const response = await fetch(API_LINK);

        // Check for no error
        if (!response.ok) {
            // Type of error
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        // Actual data
        const data = await response.json();

        return processWeather(data);

    } catch (e) {
        console.error("Could not fetch weather data:", e);
    }

}

function processWeather(weatherData: any): City {
    if (weatherData === undefined) {
        throw new Error("No data found.");
    }

    const forecasts = weatherData.days.map((day: any) => ({
        date: day.datetime,
        high: day.tempmax,
        low: day.tempmin,
        conditions: day.conditions,
        precip: day.precip,
        humidity: day.humidity
    }));

    const city: City = {
        cityName: weatherData.resolvedAddress,
        currentWeather: weatherData.currentConditions.temp,
        feelsLike: weatherData.currentConditions.feelsLike,
        conditions: weatherData.currentConditions.conditions,
        precip: weatherData.currentConditions.feelsLike,
        humidity: weatherData.currentConditions.humidity,
        days: forecasts
    };

    // This is the data you will display on your screen
    console.log("Current Temp:", weatherData.currentConditions.temp);
    console.log("Conditions:", weatherData.currentConditions.conditions);
    console.log("15-Day Forecast:", forecasts);

    return city;
}

export { getWeather };
