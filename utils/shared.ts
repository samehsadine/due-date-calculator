import { HOURS_PER_DAY, START_HOUR, END_HOUR } from "./constantes";

/**
 * Checks if the given date falls on a weekend(Saturday or Sunday).
 * @param date - Date object to check
 * @returns true if the date is Saturday(6) or Sunday(0), false otherwise
 */
export function isWeekend(date: Date): boolean{
    const day = date.getDay();
    return day === 0 || day === 6;
}

/**
 * Checks if the date corresponds to a working day (Monday to Friday).
 * @param date - Date object to check
 * @returns true if the date is working day Monday to Friday, false otherwise.
 */
export function isOfficeDay(date: Date): boolean{
    return !isWeekend(date);
}

/**
 * Cheks if a given time is within the deffined office hours (9:00 to 17:00).
 * Office hours incluse of START_HOUR and exclusive of END_HOUR.
 * @param date - Date object to check
 * @returns true if the time is within office hours, false otherwise.
 */
export function isOfficeHour(date: Date): boolean{

    if(isWeekend(date)) return false;
    const minutes = date.getHours() * 60 + date.getMinutes();
    return minutes >= START_HOUR * 60 &&  minutes < END_HOUR * 60;
}

/**
 * Calculates the number of minutes remaining in the workday from the given hour until the end of office hours END_HOUR.

 * @param date -Subject Departure date.
 * @returns number of minutes remaining before the end of the business day.
 */
export function minutesRemainingInDay(date: Date): number{

    let outDate = new Date(date.getTime());
    outDate.setHours(END_HOUR, 0, 0, 0);
    return Math.max(0, Math.round((outDate.getTime() - date.getTime()) / 60000));

}

/**
 * Returns a new date corresponding to the next day (or +N days).
 * @param date - Initial date.
 * @param days - Number of days to add (1 by default).
 * @returns a new Date advanced by the specified number of days.
 */
export function nextDay(date: Date, days: number = 1): Date{
    let outDate = new Date(date.getTime());
    outDate.setDate(date.getDate() + days);
    return outDate;

}

/**
 * Advances the given date to the next business day, at the start time (START_HOUR).
 * If the date is already in a working day but outside office hours, it is adjusted to START_HOUR on the same day.
 * @param date - Initial date.
 * @returns Date set to the start of the next working day.
 */
export function toNextOfficeDay(date: Date): Date{
    let outDate = new Date(date.getTime());
    outDate.setHours(START_HOUR, 0, 0, 0);

    while(!isOfficeDay(outDate)){
        outDate = nextDay(outDate);
    }
    return  outDate
}



