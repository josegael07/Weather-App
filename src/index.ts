import { getWeather, type City } from "./city";

let city: Promise<City | undefined> = getWeather("Austin, TX");