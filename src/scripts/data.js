export const schedule = 
        `January 3-week,Glass (25 kr),Cardboard + Plastic (25 kr),Paper + Metal (25 kr),Kitchen cloths (25 kr),Shopping
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

export const dtuCalendar =
    [
        { start: new Date("2025-01-06"), end: new Date("2025-01-26"), weeks: 3 }, // January 3 weeks
        { start: new Date("2025-02-03"), end: new Date("2025-05-12"), weeks: 13, skip: [new Date("2025-04-14"), new Date("2025-04-21")] }, // Spring 13 weeks (skip Easter)
        { start: new Date("2025-06-04"), end: new Date("2025-06-28"), weeks: 3 }, // June 3 weeks
        { start: new Date("2025-09-01"), end: new Date("2025-12-05"), weeks: 13, skip: [new Date("2025-10-12"), new Date("2025-10-17")] } // Fall 13 weeks (skip Autumn holiday)
    ];

export const tasks =
    [
        "Glass (25 kr)",
        "Cardboard + Plastic (25 kr)",
        "Paper + Metal (25 kr)",
        "Kitchen cloths (25 kr)",
        "Shopping"
    ];