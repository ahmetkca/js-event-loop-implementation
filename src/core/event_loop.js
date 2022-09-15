import crypto from 'crypto';
import { formatDate } from '../utils/formatDate.js';

let g_counter = 0;

const events = [];

const runLoop = () => {
    while (events.length > 0) {
        let [id, func, execAt] = events.shift();

        let currentTime = new Date().getTime();
        let start = currentTime;

        while (currentTime <= execAt) {
            currentTime = new Date().getTime();
        }

        (() => {
            let end = new Date().getTime();
            console.log(`Event#${id} Executed at ${formatDate(new Date(currentTime))} - ${end - start} ms`);
            func();
            console.log(`Event#${id} execution completed`);
        })();
    }
}

const queueEvent = (func, execAfter) => {
    // let id = crypto.randomUUID()
    let id = g_counter++;
    console.log(`Event#${id}  event queued at ${formatDate(new Date(new Date().getTime()))} with function to execute after ${execAfter}`);
    events.push([id, func, new Date().getTime() + execAfter]);
    events.sort((a, b) => a[2] - b[2]);
}

export { queueEvent, runLoop };