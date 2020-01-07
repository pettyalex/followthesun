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
  // Return an empty string if it's a long time after sunset
  const millisecondsToSunset = sunset.valueOf() - now.valueOf();
  if (millisecondsToSunset > 0) {
    if (millisecondsToSunset < 2 * times.HOURS) {
      return `${toMinutes(millisecondsToSunset)}M Left`;
    } else {
      return `${toHours(millisecondsToSunset)}H Left`;
    }
  } else {
    return `${toMinutes(millisecondsToSunset)}M Since Sunset`;
  }
};

export default formatSunString;
