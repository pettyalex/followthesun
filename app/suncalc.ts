export const locationToSunTimes = ({ lat, long }: { lat: number; long: number }) => {
    return {
      sunrise: new Date().setHours(7, 0, 0, 0),
      sunset: new Date().setHours(19, 0, 0, 0)
    };
  };