import { geolocation, PositionError } from "geolocation";
import times from "./times";

// No timeout is set, so this may take a very long time to resolve or reject
export const getPosition = () =>
  new Promise((resolve: (value: Position) => void, reject) => {
    geolocation.getCurrentPosition(
      (position: Position) => resolve(position),
      (error: PositionError) => reject(error),
      {
        enableHighAccuracy: false,
        maximumAge: 3 * times.HOURS
      }
    );
  });
