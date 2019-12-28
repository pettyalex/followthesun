import clock from "clock";
import document from "document";

import { locationToSunTimes } from "./suncalc";
import { getPosition } from "./location";

console.log("hello world typescript");

clock.granularity = "seconds";

const HOURS = 1000 * 60 * 60;
const timeText = document.getElementById("time");
const sunsetText = document.getElementById("timeuntilsunset");
let cachedTime: null | Date;

if (!timeText) {
  throw new Error("time text doesnt exist");
}

if (!sunsetText) {
  throw new Error("sunset text doesnt exist");
}

clock.ontick = tick => {
    cachedTime = tick.date;
  // update clock && date
  timeText.text = `${tick.date.getHours()}:${tick.date.getMinutes()}`;
  //   console.log(`it's ${tick.date}`);
  // update time to sunset
  sunsetText.text = formattedTimeUntilSunset(tick.date);
};

// const updateSunset = () => {
//     const position = getPosition(updateSunset);
//     if (!position) {
//         return;
//     }

//     sunsetText.text = 
// };

const timeUntilSunset = (time: Date) => {
  return (
    locationToSunTimes({ lat: 1, long: 1 }).sunset.valueOf() - time.valueOf()
  );
};

const formattedTimeUntilSunset = (time: Date) => {
  const msToSunset = timeUntilSunset(time);
  // console.log(`seconds to sunset is ${msToSunset / 1000}`)
  // console.log(`time is ${time}`)
  // console.log(`sunset is ${locationToSunTimes({lat: 1, long: 1}).sunset}`)
  return `${(msToSunset / 1000 / 60).toFixed()} minutes`;
};
