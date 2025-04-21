import React, { useEffect, useState } from 'react';
import { getMondayStart, getWeekNumber, isInActivePeriod, getRoomsForWeek } from './scripts/script'; // Adjust the import path as necessary
import './App.css'; // Import your CSS file
import { tasks } from './scripts/data';

function App() {

    const [date, setDate] = useState(new Date()); // Initialize date state

    const [info, setInfo] = useState({
        rooms: [],
        isActive: true,
        weekInterval: null,
        current: null
    });

    const displayTasks = () => {
        const weekNumber = getWeekNumber(date); // Get the current week number
        // Set the week interval (Start and End of the week)
        const startOfWeek = getMondayStart(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6); // Get the end of the week (7 days later)
        const isActive = isInActivePeriod(date);
        if (isActive && weekNumber !== null) {
            // Retrieve rooms for the current week
            const retrievedRooms = getRoomsForWeek(weekNumber, date); // Ensure this function returns the correct data
            setInfo({
                ...info,
                current: weekNumber,
                weekInterval: `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`,
                isActive: isActive,
                rooms: retrievedRooms
            }); // Set rooms from the retrieval function
        } else {
            setInfo({
                ...info,
                current: weekNumber,
                weekInterval: `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`,
                isActive: isActive,
                rooms: []
            }); // Set rooms to an empty array
        }
    };

    useEffect(() => {
        const today = new Date(); // Get the current date
        setDate(today); // Set the date state
        displayTasks();
    }, []);

    const previousWeek = () => {
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 7); // Go back one week
        setDate(prevDate); // Update the date state
        displayTasks(); // Call displayTasks to update the tasks
    }
    const nextWeek = () => {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 7); // Go forward one week
        setDate(nextDate); // Update the date state
        displayTasks(); // Call displayTasks to update the tasks
    }

    return (
        <div id="main">
            <div className="container"> {/* Main container for centering */}
                <h1>Week {info.current ? `${info.current}` : 'N/A'}</h1>
                <h2>{info.weekInterval || 'N/A'}</h2>
                <h1>Tasks for Current Week</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Assigned Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.rooms.length > 0 ? (
                            info.rooms.map((room, index) => (
                                <tr key={index}>
                                    <td>{tasks[index]}</td>
                                    <td>{room}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">It's probably a holiday and there are no rooms assigned for this week.</td>
                                <td colSpan="2">If not please contact Tomaz</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <button onClick={previousWeek}>Previous Week</button>
                <button onClick={nextWeek}>Next Week</button>
            </div>
            <a href="https://github.com/tomhoq/task-schedule-f2">Source code</a>
        </div>
        
    );
}

export default App;
