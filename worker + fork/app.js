const { Worker } = require('worker_threads');
const { fork } = require('child_process');
const perf_hooks = require('perf_hooks');

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
    console.log(items.getEntries());
});

// process.env.UV_THREADPOOL_SIZE = 8;

performanceObserver.observe({entryTypes: ['measure', 'mark']});

const workerFunction = array => {
    return new Promise((resolve, reject) => {
        performance.mark('workerFunctionStart');
        const worker = new Worker(__dirname + '\\worker.js', { workerData: array });
        worker.on('message', (msg) => {
            performance.mark('workerFunctionEnd');
            performance.measure('workerFunction', 'workerFunctionStart', 'workerFunctionEnd');
            resolve(msg);
        });
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) {
                reject(new Error(`Error: ${code}`));
            }
        });
    })
}

const forkFunction = array => {
    return new Promise((resolve, reject) => {
        performance.mark('forkFunctionStart');
        const process = fork(__dirname + '\\fork.js');
        process.send(array);
        process.on('message', (msg) => {
            performance.mark('forkFunctionEnd');
            performance.measure('forkFunction', 'forkFunctionStart', 'forkFunctionEnd');
            resolve(msg);
        })
    })
}

const main = async () => {
    await workerFunction([25, 19, 48, 30]);
    await forkFunction([25, 19, 48, 30]);
}

main();