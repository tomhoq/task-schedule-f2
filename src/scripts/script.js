
import fs from 'fs/promises';
import { schedule } from './data';
import { dtuCalendar } from './data';

function readCsvFile() {
    
    const lines = schedule.split('\n');
    const data = [];
    let currentSection = '';

    lines.forEach(line => {
        const parts = line.split(',');

        if (parts[0].includes('week')) {
            currentSection = parts[0].trim();
        } else if (parts[0].toLowerCase().includes('week')) {
            const weekNumber = parseInt(parts[0].replace(/\D/g, ''), 10);
            const rooms = parts.slice(1).map(item => item.trim()).filter(item => item);
            data.push({ section: currentSection, week: weekNumber, rooms });
        }
    });

    return data;
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
    return dtuCalendar.some(period => {
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

    if (!isInActivePeriod(today)) {
        return null
    }

    for (let period of dtuCalendar) {
        let monday = getMondayStart(period.start);
        let periodWeeks = 0;
        let week = 0; // Reset week number at the start of each period

        while (periodWeeks < period.weeks) {
            if (today >= monday && today < new Date(monday.getTime() + 7 * 86400000)) {
                return week + 1; // Weeks start at 1
            }
            
            console.log(period.skip?.[0]);
            if ( monday >= period?.skip?.[0] && monday < period?.skip?.[1]) {
                monday = new Date(monday.getTime() + 7 * 86400000);
                console.log("skipping week due to holiday " + week);
                continue;
            }
            console.log("Date " + monday);
            console.log("skipping week " + week);
            periodWeeks++;
            week++;

            monday = new Date(monday.getTime() + 7 * 86400000);
        }
    }

    return null; // If date is outside active periods
}

export { getMondayStart, getWeekNumber, isInActivePeriod, getRoomsForWeek, readCsvFile};