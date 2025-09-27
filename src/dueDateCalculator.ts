import { END_HOUR } from "../utils/constantes";
import { isOfficeDay, isOfficeHour, minutesRemainingInDay, nextDay, toNextOfficeDay} from "../utils/shared";

/**
 * Calculates the due date by adding a number of working hours to a submission date
 * 
 * Rules
 * - Work days: Monday → Friday (see isOfficeDay).
 * - Work hours: [START_HOUR, END_HOUR) (see isOfficeHour), excluding end of day.
 * - The added hours automatically “skip” non-office periods (evenings, nights, weekends).
 * - If worksHours = 0, the submission date is returned as is.
 * 
 * 
 * @param submit - Submission date 
 * @param worksHours - Number of working hours to add (must be a positive integer).
 * @returns Th due date aligned with the work hours rules.
 */

export function calculateDueDate(submit: Date, worksHours: number): Date {
    
    if(worksHours < 0) 
        throw new Error("the workHours must be a positive integer");

    if(!isOfficeDay(submit) || !isOfficeHour(submit)){
        throw new Error("the submit date must be in a working day/hour (Monday to Friday[09:00 to 17:00])");
    }

    let remainingMinutes = Math.round(worksHours * 60);
    let currentDate = new Date(submit.getTime());

    if (remainingMinutes === 0) return currentDate;

    while(remainingMinutes > 0) {

       if(!isOfficeHour(currentDate)){
         currentDate = toNextOfficeDay(currentDate);
        
       }
       const canWork = Math.min(minutesRemainingInDay(currentDate), remainingMinutes);

       if(canWork > 0){
         currentDate.setTime(currentDate.getTime() + canWork * 60000);
         remainingMinutes-=canWork;
       }

       if(remainingMinutes > 0 && currentDate.getHours() === END_HOUR){
         currentDate = toNextOfficeDay(nextDay(currentDate));
        }

    }

    return currentDate;
}