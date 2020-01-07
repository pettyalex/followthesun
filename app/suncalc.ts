import suncalc from "suncalc";

export const getSunEventsForDate = ({
  latitude,
  longitude,
  date
}: {
  latitude: number;
  longitude: number;
  date: Date;
}) => {
  return suncalc.getTimes(date, latitude, longitude);
};

/**
 * Example response from suncalc
 * 
 {
  solarNoon: 2020-01-07T12:07:04.975Z,
  nadir: 2020-01-07T00:07:04.975Z,
  sunrise: 2020-01-07T08:03:37.716Z,
  sunset: 2020-01-07T16:10:32.234Z,
  sunriseEnd: 2020-01-07T08:07:51.352Z,
  sunsetStart: 2020-01-07T16:06:18.598Z,
  dawn: 2020-01-07T07:24:36.296Z,
  dusk: 2020-01-07T16:49:33.654Z,
  nauticalDawn: 2020-01-07T06:42:27.111Z,
  nauticalDusk: 2020-01-07T17:31:42.839Z,
  nightEnd: 2020-01-07T06:02:23.239Z,
  night: 2020-01-07T18:11:46.710Z,
  goldenHourEnd: 2020-01-07T09:02:14.981Z,
  goldenHour: 2020-01-07T15:11:54.969Z
}
 */
