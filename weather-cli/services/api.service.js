import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const isResponseOk = async (response) => !!response.ok;

const validateResponse = async (response) => {
    if(await isResponseOk(response)) {
        return response.json();
    } else {
        const errorData = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
    }
}

export const getWeather = async () => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    if(!token) {
        throw new Error(`Token not found, try set the token using the -t [API_KEY]`);
    }
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.set('q', city);
    url.searchParams.set('appid', token);
    url.searchParams.set('units', 'metric');
    try {
        const response = await fetch(url);
        return await validateResponse(response)
    } catch(e) {
        throw e;
    }
};