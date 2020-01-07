import { toMinutes, toHours } from "./models";
import times from "./times";

export const formatSunString = ({
  now,
  sunset,
  sunrise
}: {
  now: Date;
  sunset: Date;
  sunrise: Date;
}) => {
  // Return a human-readable string indicating how long until the next sunset or sunrise
  const millisecondsToSunset = sunset.valueOf() - now.valueOf();
  if (millisecondsToSunset > 0) {
    if (millisecondsToSunset < 2 * times.HOURS) {
      return `${toMinutes(millisecondsToSunset)}M To Sunset`;
    } else {
      return `${toHours(millisecondsToSunset)}H To Sunset`;
    }
  } else {
    return `${toMinutes(millisecondsToSunset)}M Since Sunset`;
  }
};

export default formatSunString;
