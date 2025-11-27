#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.service.js";
import { saveCity, saveToken } from "./services/storage.service.js";
import { getForecast } from "./services/weather.service.js";

const initCLI = async () => {
    const args = getArgs(process.argv);
    if(args.h) {
        printHelp();
        return;
    }
    if(args.s) {
        await saveCity(args.s);
    }
    if(args.t) {
        await saveToken(args.t);
    }
    await getForecast();
}

initCLI();