import { formatSunString } from "./sunformatter";
import times from './times';

test("formats 90 minutes to sunset", () => {
  const now = new Date(Date.now());
  const sunrise = new Date(Date.now() - 6 * times.HOURS);
  const sunset = new Date(Date.now() + 90 * times.MINUTES);

  const formattedString = formatSunString({now, sunrise, sunset});

  expect(formattedString).toBe("90M To Sunset");
});

it("fomats 6 hours from now and after now", () => {
  const now = new Date(Date.now());
  const sunrise = new Date(Date.now() - 6 * times.HOURS);
  const sunset = new Date(Date.now() + 6 * times.HOURS);

  const formattedString = formatSunString({now, sunrise, sunset});

  expect(formattedString).toBe("6H To Sunset");
});
