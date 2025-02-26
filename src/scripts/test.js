import { getMondayStart, getWeekNumber, isInActivePeriod } from "./script.js";

test("getMondayStart should return the correct Monday for given dates", () => {
    expect(getMondayStart(new Date("2025-01-08"))).toEqual(new Date("2025-01-06")); // Wed → Mon
    expect(getMondayStart(new Date("2025-01-06"))).toEqual(new Date("2025-01-06")); // Already Monday
    expect(getMondayStart(new Date("2025-06-08"))).toEqual(new Date("2025-06-02")); // Sunday → previous Monday
});

test("isInActivePeriod should correctly determine if a date is in an active period", () => {
    expect(isInActivePeriod(new Date("2025-01-06"))).toBe(true); // Inside period
    expect(isInActivePeriod(new Date("2025-04-15"))).toBe(false); // Inside Easter break
    expect(isInActivePeriod(new Date("2025-10-15"))).toBe(false); // Inside Autumn break
    expect(isInActivePeriod(new Date("2025-07-10"))).toBe(false); // Outside all periods
});

test("getWeekNumber should correctly calculate week numbers for each period", () => {
    // January period (3 weeks)
    expect(getWeekNumber(new Date("2025-01-06"))).toBe(1);
    expect(getWeekNumber(new Date("2025-01-13"))).toBe(2);
    expect(getWeekNumber(new Date("2025-01-20"))).toBe(3);

    // Spring period (13 weeks, skipping Easter break from 2025-04-14 to 2025-04-21)
    expect(getWeekNumber(new Date("2025-02-03"))).toBe(1);
    expect(getWeekNumber(new Date("2025-02-10"))).toBe(2);
    expect(getWeekNumber(new Date("2025-02-17"))).toBe(3);
    expect(getWeekNumber(new Date("2025-02-24"))).toBe(4);
    expect(getWeekNumber(new Date("2025-03-03"))).toBe(5);
    expect(getWeekNumber(new Date("2025-03-10"))).toBe(6);
    expect(getWeekNumber(new Date("2025-03-17"))).toBe(7);
    expect(getWeekNumber(new Date("2025-03-24"))).toBe(8);
    expect(getWeekNumber(new Date("2025-03-31"))).toBe(9);
    expect(getWeekNumber(new Date("2025-04-07"))).toBe(10);
    
    // Skip Easter break (April 14 - April 21)
    expect(getWeekNumber(new Date("2025-04-14"))).toBe(null);
    expect(getWeekNumber(new Date("2025-04-21"))).toBe(null);

    // After Easter
    expect(getWeekNumber(new Date("2025-04-22"))).toBe(11);
    expect(getWeekNumber(new Date("2025-04-28"))).toBe(12);
    expect(getWeekNumber(new Date("2025-05-05"))).toBe(13);

    // June period (3 weeks)
    expect(getWeekNumber(new Date("2025-06-04"))).toBe(1);
    expect(getWeekNumber(new Date("2025-06-11"))).toBe(2);
    expect(getWeekNumber(new Date("2025-06-18"))).toBe(3);

    // Fall period (13 weeks, skipping autumn break from 2025-10-13 to 2025-10-17)
    expect(getWeekNumber(new Date("2025-09-01"))).toBe(1);
    expect(getWeekNumber(new Date("2025-09-08"))).toBe(2);
    expect(getWeekNumber(new Date("2025-09-15"))).toBe(3);
    expect(getWeekNumber(new Date("2025-09-22"))).toBe(4);
    expect(getWeekNumber(new Date("2025-09-29"))).toBe(5);
    expect(getWeekNumber(new Date("2025-10-06"))).toBe(6);

    // Skip autumn break (October 13 - October 17)
    expect(getWeekNumber(new Date("2025-10-13"))).toBe(null);
    expect(getWeekNumber(new Date("2025-10-14"))).toBe(null);
    expect(getWeekNumber(new Date("2025-10-15"))).toBe(null);
    expect(getWeekNumber(new Date("2025-10-16"))).toBe(null);
    expect(getWeekNumber(new Date("2025-10-17"))).toBe(null);

    // After autumn break
    expect(getWeekNumber(new Date("2025-10-20"))).toBe(7);
    expect(getWeekNumber(new Date("2025-10-27"))).toBe(8);
    expect(getWeekNumber(new Date("2025-11-03"))).toBe(9);
    expect(getWeekNumber(new Date("2025-11-10"))).toBe(10);
    expect(getWeekNumber(new Date("2025-11-17"))).toBe(11);
    expect(getWeekNumber(new Date("2025-11-24"))).toBe(12);
    expect(getWeekNumber(new Date("2025-12-01"))).toBe(13);
});


