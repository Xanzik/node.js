import chalk from 'chalk';
import dedent from "dedent-js";

export const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ' + ' ' + error));
};

export const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + `${message? ' ' + message : ''}`);
};

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Without parameters - to display help
        -s [CITY] to set the city
        -h to display help
        -t [API_KEY] to set the token
        `
    );
};