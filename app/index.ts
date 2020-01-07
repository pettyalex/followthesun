import clock from "clock";
import document from "document";

import { locationToSunTimes } from "./suncalc";
import { getPosition } from "./location";
import { formatSunString } from "./sunformatter";
import times from './times';

clock.granularity = "seconds";

const timeText = document.getElementById("time");
const sunsetText = document.getElementById("timeuntilsunset");

if (!timeText) {
  throw new Error("time text doesnt exist");
}

if (!sunsetText) {
  throw new Error("sunset text doesnt exist");
}

let cachedTime: null | Date;
// Global structure for caching sunrise & sunset
let cachedTimes: {
    sunset: null | Date,
    sunrise: null | Date,
    updatedAt: null | Date
} = {
    sunset: null,
    sunrise: null,
    updatedAt: null
}
const CACHE_MAX_TIME = 6 * times.HOURS;

clock.ontick = tick => {
  // update clock && date
  timeText.text = `${tick.date.getHours()}:${tick.date.getMinutes()}`;
  //   console.log(`it's ${tick.date}`);
  // update time to sunset
  updateSunsetText(sunsetText, tick.date);
};

// Return true if we need to recacluate sunset time based on location
const shouldUpdate = ({now, updatedAt}: {now: Date, updatedAt: Date | null}) => {
    if (cachedTimes.sunrise === null || cachedTimes.sunset === null) {
        return true;
    }
    if (updatedAt === null) {return true;}
    if (now.valueOf() > (updatedAt.valueOf() + CACHE_MAX_TIME)) {
        return true;
    }


    return false;

}

// Updates the text with either a cached sunset value, or a new calculated one that is stored in cache
const updateSunsetText = (sunsetText: Element, time: Date) => {
    if (shouldUpdate({now: time, updatedAt: cachedTimes.updatedAt})) {
        updateSunset(sunsetText, time);
    } else {
        // Can safely update from cache
        sunsetText.text = formatSunString({now: time, sunset: cachedTimes.sunset, sunrise: cachedTimes.sunrise})

    }
}

const updateSunset = (sunsetText: Element, time: Date) => {
    const position = getPosition(updateSunset);
    if (!position) {
        return;
    }

    sunsetText.text = 
};

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
