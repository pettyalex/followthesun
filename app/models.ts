import times from './times';

export type SunTimes = { sunrise: Date; sunset: Date };

export const toMinutes = (ms: number) => {
    return ms / times.MINUTES;
}

export const toHours = (ms: number) => {
    return ms / times.HOURS
}
