import crypto from 'crypto';
let g_counter = 0;

const events = [];

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
      padTo2Digits(date.getMilliseconds())
    ].join(':')
  );
}

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

const main = () => {
  let start = new Date().getTime();
  queueEvent(() => console.log('First queueEvent call.'), 10000);
  queueEvent(() => console.log("Event 1 is queued."), 2000);
  queueEvent(() => console.log('Event 2 is queued.'), 1000);

  console.log("Entry to the program.");

  queueEvent(() => console.log("Event 3 is queued."), 3000);
  queueEvent(() => console.log("This line should be the last one to output to the console."), 500);

  runLoop(); 
  let end = new Date().getTime();
  console.log(`Total time taken: ${end - start} ms`);
}

main();

// Expected Output
/*
Entry to the program.
This line should be the last one to output to the console.
Event 2 is queued.
Event 1 is queued.
Event 3 is queued.
First queueEvent call.
Total time taken: ~10000 ms
*/
