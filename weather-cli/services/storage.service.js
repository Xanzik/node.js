import { homedir } from 'os';
import { join, basename } from 'path';
import { promises } from 'fs';
import {printError, printSuccess} from "./log.service.js";

const filePath = join(homedir(), 'weather-data.json');

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};

const readJsonFile = async (filePath) => {
    let data = {};
    if(await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    return data;
};

const saveKeyValue = async (key, value) => {
    const data = await readJsonFile(filePath);
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
    const data = await readJsonFile(filePath);
    return data[key];
};

export const saveToken = async (token) => {
    if(!token.length) {
        printError("Token not provided.");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved successfully.');
    } catch (e) {
        printError(e.message);
    }
};

export const saveCity = async (city) => {
    if(!city.length) {
        printError("Token city not provided.");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved successfully.');
    } catch (e) {
        printError(e.message);
    }
}
