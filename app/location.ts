import { geolocation } from "geolocation";

import times from "./times";

let cachedPosition: Position | null = null;

export const getPosition = (
  updatePosition: (location: Position) => void
) => () => {
  if (cachedPosition) {
    return cachedPosition;
  }

  // Register an event handler for when the position updates
  geolocation.getCurrentPosition(
    pos => {
      cachedPosition = pos;
      updatePosition(cachedPosition);
    },
    undefined,
    { maximumAge: 6 * times.HOURS }
  );
};
