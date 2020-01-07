import clock from "clock";
import document from "document";

import { getSunEventsForDate } from "./suncalc";
import { getPosition } from "./location";
import { formatSunString } from "./sunformatter";
import times from "./times";

clock.granularity = "seconds";

const dateDisplay = document.getElementById("date")!;
const timeText = document.getElementById("time")!;
const sunsetText = document.getElementById("timeuntilsunset")!;

// Global structure for caching sunrise & sunset
// Holds the next sunset & sunrise calculated. May be in the future or past when time rendering runs
type TimeCache = {
  sunset: Date;
  sunrise: Date;
  updatedAt: Date;
  currentlyUpdatingCache: boolean;
};

let cachedTimes: Partial<TimeCache> = {};
const CACHE_MAX_TIME = 3 * times.HOURS;

clock.ontick = tick => {
  // update clock && date
  dateDisplay.text = tick.date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
  timeText.text = tick.date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  // Update time to sun event either from cache or by recalculating
  updateSunsetText(sunsetText, tick.date);
};

// Updates the text with either a cached sunset value, or a new calculated one that is stored in cache
const updateSunsetText = (sunsetText: Element, time: Date) => {
  if (shouldUpdate({ now: time })) {
    updateSunset(sunsetText, time);
  } else {
    // Can safely update from cache
    sunsetText.text = formatSunString({
      now: time,
      sunset: cachedTimes.sunset!,
      sunrise: cachedTimes.sunrise!
    });
  }
};

// Return true if we need to recacluate sunset time based on location
const shouldUpdate = ({ now }: { now: Date }) => {
  if (cachedTimes.currentlyUpdatingCache) {
    return false;
  }

  if (!cachedTimes.updatedAt || !cachedTimes.sunrise || !cachedTimes.sunset) {
    return true;
  }

  if (now.valueOf() > cachedTimes.updatedAt.valueOf() + CACHE_MAX_TIME) {
    return true;
  }

  return false;
};

// Writes to cache, lock the cache while we are updating it
const updateSunset = async (sunsetText: Element, time: Date) => {
  cachedTimes.currentlyUpdatingCache = true;

  // Updating position could take a while.
  // There could be a delay between time and when this returns
  const position = await getPosition();
  if (!position) {
    // How could this have happened?!
    return;
  }

  const { latitude, longitude } = position.coords;
  const { sunrise, sunset } = getSunEventsForDate({
    latitude,
    longitude,
    date: time
  });

  cachedTimes.sunrise = sunrise;
  cachedTimes.sunset = sunset;
  cachedTimes.updatedAt = time;

  cachedTimes.currentlyUpdatingCache = false;
};
