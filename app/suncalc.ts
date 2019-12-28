import { SunTimes } from "./models";
import * as suncalc from 'suncalc';

export const locationToSunTimes = ({
  lat,
  long
}: {
  lat: number;
  long: number;
}): SunTimes => {
  return {
    sunrise: new Date(new Date().setHours(7, 0, 0, 0)),
    sunset: new Date(new Date().setHours(19, 0, 0, 0))
  };
};

/*
export const locationViaSunCalc  = ({
    lat, 
    long, 
    date
}) => {
    suncalc.
}
*/