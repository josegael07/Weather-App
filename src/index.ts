import "./styles.css";

const API_KEY: string = "2YBV9DZJKJFKGAWHL3J7CX6X5";
const city: string = "Austin,TX";
const API_LINK: string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`;

async function getWeather(){
    try {
        const response = await fetch(API_LINK);

        // Check for no error
        if (!response.ok) {
            // Type of error
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        // Actual data
        const data = await response.json();
        
        // This is the data you will display on your screen
        console.log("Current Temp:", data.currentConditions.temp);
        console.log("Conditions:", data.currentConditions.conditions);
        console.log("15-Day Forecast:", data.days);


    } catch (e) {
        console.error("Could not fetch weather data:", e);
    }

}