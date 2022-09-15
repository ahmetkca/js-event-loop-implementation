import { formatDate } from "../utils/formatDate.js";

class Event {
    constructor(id, cb, time) {
        this.id = id;
        this.cb = cb;
        this.time = time;
    }
}

class EventQueue extends Set {
    constructor() {
        super();
        this.eventIds = new Set();
    }

    add(elem) {
        if (elem instanceof Event && !this.eventIds.has(elem.id)) {
            super.add(elem);
            this.eventIds.add(elem.id);
        }
    }

    has(elem) {
        if (elem instanceof Event) {
            return this.eventIds.has(elem.id);
        }
    }
}

const events = new EventQueue();
let g_id = 0;

const runLoop = () => {
    let currentTime = new Date().getTime();
    while (events.size > 0) {
        currentTime = new Date().getTime();
        for (let event of events) {
            currentTime = new Date().getTime();
            if (currentTime >= event.time) {
                console.log(`Event#${event.id} Executed at ${formatDate(new Date(currentTime))}`);
                event.cb();
                events.delete(event);
            }
        }
    }
}

const queueEvent = (func, runAfter) => {
    let event = new Event(g_id++, func, new Date().getTime() + runAfter);
    console.log(`Event#${event.id}  event queued at ${formatDate(new Date(new Date().getTime()))} with function to execute after ${runAfter}`);
    events.add(event);
}

export { queueEvent, runLoop };