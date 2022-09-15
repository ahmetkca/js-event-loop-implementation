import { runLoop, queueEvent } from "./src/core/event_loop2.js";

const main = () => {

  let start = new Date().getTime();
  queueEvent(() => console.log('First queueEvent call.'), 10000);
  queueEvent(() => console.log("Event 1 is queued."), 2000);
  queueEvent(() => console.log('Event 2 is queued.'), 1000);

  console.log("Entry to the program.");

  queueEvent(() => console.log("Event 3 is queued."), 3000);
  queueEvent(() => console.log("This line should be the last one to output to the console."), 500);

  queueEvent(() => {
    console.log("Top level queueEvent call. to be executed after 4000 ms.");
    queueEvent(() => {
      console.log("Nested queueEvent call. to be executed after 1000 ms but since it is nested, it will be queued after the top level queueEvent call. so it will be executed after 5000 ms.");
    }, 1000);
  }, 4000);

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
Top level queueEvent call. to be executed after 4000 ms.
Nested queueEvent call. to be executed after 1000 ms but since it is nested, it will be queued after the top level queueEvent call. so it will be executed after 5000 ms.
First queueEvent call.
Total time taken: ~10000 ms
*/
