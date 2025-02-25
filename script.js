
import fs from 'fs/promises';

// Function to read CSV and build the schedule
function readCsvFile() {
    const data = `January 3-week,Glass (25 kr),Cardboard + Plastic (25 kr),Paper + Metal (25 kr),Kitchen cloths (25 kr),Shopping
        Week 1,Room 1,Room 2,Room 3,Room 4,Room 6 + 12
        Week 2,Room 2,Room 3,Room 4,Room 6,Room 7 + 13
        Week 3,Room 3,Room 4,Room 6,Room 7,Room 8 + 1
        13-week Spring,,,,,
        Week 1,Room 1,Room 2,Room 3,Room 4,Room 6 +12
        Week 2,Room 2,Room 3,Room 4,Room 6,Room 7 + 13
        Week 3,Room 3,Room 4,Room 6,Room 7,Room 8 + 1
        Week 4,Room 4,Room 6,Room 7,Room 8,Room 9 + 2
        Week 5,Room 6,Room 7,Room 8,Room 9,Room 10 + 3
        Week 6,Room 7,Room 8,Room 9,Room 10,Room 11 + 4
        Week 7,Room 8,Room 9,Room 10,Room 11,Room 12 + 6
        Week 8,Room 9,Room 10,Room 11,Room 12,Room 13 + 7
        Week 9,Room 10,Room 11,Room 12,Room 13,Room 1 + 8
        Week 10,Room 11,Room 12,Room 13,Room 1,Room 2 + 9
        Week 11,Room 12,Room 13,Room 1,Room 2,Room 3 + 10
        Week 12,Room 13,Room 1,Room 2,Room 3,Room 4 + 11
        Week 13,Room 1,Room 2,Room 3,Room 4,Room 6 + 12
        June 3-week,,,,,
        Week 1,Room 1,Room 2,Room 3,Room 4,Room 6 +12
        Week 2,Room 2,Room 3,Room 4,Room 6,Room 7 + 13
        Week 3,Room 3,Room 4,Room 6,Room 7,Room 8 + 1
        13-week Fall,,,,,
        Week 1,Room 1,Room 2,Room 3,Room 4,Room 6 + 12
        Week 2,Room 2,Room 3,Room 4,Room 6,Room 7 + 13
        Week 3,Room 3,Room 4,Room 6,Room 7,Room 8 +1
        Week 4,Room 4,Room 6,Room 7,Room 8,Room 9 +2
        Week 5,Room 6,Room 7,Room 8,Room 9,Room 10 +3
        Week 6,Room 7,Room 8,Room 9,Room 10,Room 11 + 4
        Week 7,Room 8,Room 9,Room 10,Room 11,Room 12 + 6
        Week 8,Room 9,Room 10,Room 11,Room 12,Room 13 + 7
        Week 9,Room 10,Room 11,Room 12,Room 13,Room 1+8
        Week 10,Room 11,Room 12,Room 13,Room 1,Room 2+9
        Week 11,Room 12,Room 13,Room 1,Room 2,Room 3+10
        Week 12,Room 13,Room 1,Room 2,Room 3,Room 4+11
        Week 13,Room 1,Room 2,Room 3,Room 4,Room 6+12
        `;

    const lines = data.split('\n');
    const schedule = [];
    let currentSection = '';

    lines.forEach(line => {
        const parts = line.split(',');

        if (parts[0].includes('week')) {
            currentSection = parts[0].trim();
        } else if (parts[0].toLowerCase().includes('week')) {
            const weekNumber = parseInt(parts[0].replace(/\D/g, ''), 10);
            const rooms = parts.slice(1).map(item => item.trim()).filter(item => item);
            schedule.push({ section: currentSection, week: weekNumber, rooms });
        }
    });

    return schedule;
};

// Function to get tasks for a specific week
const getRoomsForWeek = (weekNumber, date) => {
    if (!date || !(date instanceof Date)) {
        throw new Error("Invalid date provided");
    }

    const schedule= readCsvFile();
    const tasksForWeek = schedule.filter(task => task.week === weekNumber);    
    if (tasksForWeek.length === 0) {
        return `No tasks found for week ${weekNumber}.`;
    }

    //divide by seasons
    if (date.getMonth() === 0 ) {
        return tasksForWeek.filter(task => task.section.includes('January'))[0].rooms;
    } else if (date.getMonth() >= 1 && date.getMonth() <= 4) {
        return tasksForWeek.filter(task => task.section.includes('Spring'))[0].rooms;
    } else if (date.getMonth() === 5) { 
        return tasksForWeek.filter(task => task.section.includes('June'))[0].rooms;
    } else if (date.getMonth() >= 8 && date.getMonth() <= 11) {
        return tasksForWeek.filter(task => task.section.includes('Fall'))[0].rooms;
    }

    return tasksForWeek;
};

// Function to get the Monday of the current week
function getMondayStart(date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    let newDate = new Date(date);
    return new Date(newDate.setDate(diff));
}

// Function to check if a date is inside a valid period
function isInActivePeriod(date) {
    const activePeriods = [
        { start: new Date("2025-01-06"), end: new Date("2025-01-24") }, // January 3 weeks
        { start: new Date("2025-02-03"), end: new Date("2025-05-12"), skip: [new Date("2025-04-14"), new Date("2025-04-21")] }, // Spring 13 weeks (skip Easter)
        { start: new Date("2025-06-04"), end: new Date("2025-06-26") }, // June 3 weeks
        { start: new Date("2025-09-01"), end: new Date("2025-12-05"), skip: [new Date("2025-10-12"), new Date("2025-10-17")] } // Fall 13 weeks (skip Autumn holiday)
    ];

    return activePeriods.some(period => {
        if (date>= period.start && date <= period.end && period.skip) {
            return date < period.skip[0] || date > period.skip[1];
        } else if (date >= period.start && date <= period.end) {
            return true;
        } else {
            return false;
        }
    });
}

// Function to get the week number within active periods
function getWeekNumber(today) {
    const activePeriods = [
        { start: new Date("2025-01-06"), weeks: 3 },
        { start: new Date("2025-02-03"), weeks: 13, skip: { start: new Date("2025-04-14"), end: new Date("2025-04-21") } },
        { start: new Date("2025-06-04"), weeks: 3 },
        { start: new Date("2025-09-01"), weeks: 13, skip: { start: new Date("2025-10-13"), end: new Date("2025-10-17") } }
    ];

    if (!isInActivePeriod(today)) {
        return null
    }

    for (let period of activePeriods) {
        let monday = getMondayStart(period.start);
        let periodWeeks = 0;
        let week = 0; // Reset week number at the start of each period

        while (periodWeeks < period.weeks) {
            if (today >= monday && today < new Date(monday.getTime() + 7 * 86400000)) {
                return week + 1; // Weeks start at 1
            }

            if ( monday >= period?.skip?.start && monday < period?.skip?.end) {
                monday = new Date(monday.getTime() + 7 * 86400000);
                continue;
            }
            periodWeeks++;
            week++;
            

            monday = new Date(monday.getTime() + 7 * 86400000);
        }
    }

    return null; // If date is outside active periods
}

export { getMondayStart, getWeekNumber, isInActivePeriod, getRoomsForWeek, readCsvFile};