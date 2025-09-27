import { calculateDueDate } from "../src/dueDateCalculator";

function getDate(year: number, month: number, day: number, hours: number, minutes: number = 0): Date {
        return new Date(year, month -1 , day, hours, minutes, 0, 0);
    }
describe ("Due Date Calculator - Working Hours 9:00 to 17:00 (Monday->Friday)", () => {

    test("should throw error when workhours is negative",() =>{
        const submit = getDate(2025, 9, 22, 10, 0);
        expect(() => calculateDueDate(submit, -1)).toThrow("the workHours must be a positive integer");
    })
    
    test("submit on friday 17:00 should throw", () => {
        const submit = getDate(2025, 9, 26, 17, 0);
        expect(() => calculateDueDate(submit, 1)).toThrow("the submit date must be in a working day/hour (Monday to Friday[09:00 to 17:00])");
    });

    test("Submit on Monday 16:59 + 1 minute = Tuesday 09:00",() => {
        const submit = getDate(2025, 9, 22, 16,59);
        const result = calculateDueDate(submit, 2/60);
        expect(result).toEqual(getDate(2025, 9, 23, 9,1));

    });

    test("Submit on Monday 9:00 + 8 hours = Monday 17:00", () => {
        const submit = getDate(2025, 9, 22, 9,0);
        const result = calculateDueDate(submit, 8);
        expect(result).toEqual(getDate(2025, 9, 22, 17,0));
        
    });

    test("Submit on Tuesday 14:00 + 4 hours = Wednesday 10:00", () => {
        const submit = getDate(2025, 9, 23, 14,0);
        const result = calculateDueDate(submit, 4);
        expect(result).toEqual(getDate(2025, 9, 24, 10,0));
        
    });
  
    test("Submit on Friday 15:00 + 4 hours = Monday 11:00", () => {
        const submit = getDate(2025, 9, 26, 15,0);
        const result = calculateDueDate(submit, 4);
        expect(result).toEqual(getDate(2025, 9, 29, 11,0));
        
    });

    test("Submit on Tuesday 14:12 + 16 hours = Thursday 14:12", () => {
        const submit = getDate(2025, 9, 23, 14, 12);
        const result = calculateDueDate(submit, 16);
        expect(result).toEqual(getDate(2025, 9, 25, 14,12));
        
    });
    test("Submit on Tuesday 11:00 + 40 hours = Next Tuesday 11:00", () => {
        const submit = getDate(2025, 9, 23, 11, 0);
        const result = calculateDueDate(submit, 40);
        expect(result).toEqual(getDate(2025, 9, 30, 11,0));
        
    });
});