import dedent from 'dedent-js';
import { getWeather } from "./api.service.js";
import {printError, printSuccess} from "./log.service.js";
import { getWeatherIcon } from "../helpers/icons.js";
import { getWindDirection } from "../helpers/wind.js";

const printWeather = (data) => {
    const {
        name,
        sys: { country },
        weather: [{ description, icon }],
        main: { temp, feels_like, humidity, pressure },
        wind: { speed, deg, gust } = {},
        clouds: { all: clouds },
    } = data;

    const emoji = getWeatherIcon(icon);
    const direction = getWindDirection(deg);
    const pressureMmHg = Math.round(pressure * 0.75006);
    printSuccess();
    console.log(dedent`
    Current weather in ${name}, ${country}
    ${description.charAt(0).toUpperCase() + description.slice(1)} ${emoji}
    Temperature:     ${temp > 0 ? '+' : ''}${temp.toFixed(1)}°C
    Feels like:      ${feels_like > 0 ? '+' : ''}${feels_like.toFixed(1)}°C
    Humidity:        ${humidity}%
    Pressure:        ${pressureMmHg} mmHg
    Wind:            ${speed.toFixed(1)} m/s ${direction}${gust ? `, gusts ${gust.toFixed(1)} m/s` : ''}
    Cloud cover:     ${clouds}%
  `);
};

export const getForecast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather);
    } catch (e) {
        printError(e.message);
    }
}
