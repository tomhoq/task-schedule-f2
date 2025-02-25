import React, { useEffect, useState } from 'react';
import { getMondayStart, getWeekNumber, isInActivePeriod, getRoomsForWeek } from '../script'; // Adjust the import path as necessary
import './App.css'; // Import your CSS file

function App() {
    const [info, setInfo] = useState({
        rooms: [],
        tasks: [
            "Glass (25 kr)",
            "Cardboard + Plastic (25 kr)",
            "Paper + Metal (25 kr)",
            "Kitchen cloths (25 kr)",
            "Shopping"
        ],
        isActive: true,
        weekInterval: null,
        current: null
    });

    const displayTasks = () => {
        const today = new Date(); // Get the current date
        const weekNumber = getWeekNumber(today); // Get the current week number
        // Set the week interval (Start and End of the week)
        const startOfWeek = getMondayStart(today);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6); // Get the end of the week (7 days later)
        const isActive = isInActivePeriod(today);
        console.log(isActive);
        if (isActive && weekNumber !== null) {
            // Retrieve rooms for the current week
            const retrievedRooms = getRoomsForWeek(weekNumber, today); // Ensure this function returns the correct data
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
        displayTasks();
    }, []);

    return (
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
                                <td>{info.tasks[index]}</td>
                                <td>{room}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No active rooms for the current week.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
