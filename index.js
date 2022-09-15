const events = [];

const runLoop = () => {
  while (events.length > 0) {
    let func = events.shift();

    func();
  }
}

const queueEvent = (func) => {
  events.push(func);
}

queueEvent(() => console.log("Event 1 is queued."));
queueEvent(() => console.log('Event 2 is queued.'));

console.log("Entry to program.");

queueEvent(() => console.log("Event 3 is queued."));
queueEvent(() => console.log("This line should be the last one to output to the console."));

runLoop();
