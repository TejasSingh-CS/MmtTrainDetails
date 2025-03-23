import credentials from '../utils/credentials.json';

export interface ClassDetails {
    classType: string;
    availability: string;
}

export interface TrainDetails {
    name: string | null;
    number: string | null;
    departure: string | null;
    arrival: string | null;
    departureTime: string | null;
    arrivalTime: string | null;
    classes: ClassDetails[];
}

export function generateHTMLTable(
    trainData: TrainDetails[],
    fromCity: string,
    toCity: string,
    travelDate: string
) {
    let tableContent = `
        <html>
        <head>
            <title>Train Details from ${fromCity} to ${toCity} - ${travelDate}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f7f6;
                    color: #333;
                    text-align: center;
                    padding: 20px;
                }
                h2 {
                    color: #2c3e50;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                table {
                    width: 90%;
                    margin: auto;
                    border-collapse: collapse;
                    background: white;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                }
                th, td {
                    padding: 12px;
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background: #34495e;
                    color: white;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background: #f8f8f8;
                }
                tr:hover {
                    background: #ecf0f1;
                    cursor: pointer;
                }
                .class-group {
                    display: inline-block;
                    padding: 6px 10px;
                    margin: 3px;
                    border-radius: 4px;
                    background: #dff9fb;
                    color: #0984e3;
                    font-weight: bold;
                    font-size: 14px;
                }
                .availability {
                    display: inline-block;
                    padding: 6px 10px;
                    margin: 3px;
                    border-radius: 4px;
                    background: #f1c40f;
                    color: #fff;
                    font-weight: bold;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <h2>Train Details from ${fromCity} to ${toCity} - ${travelDate}</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>Train Name</th>
                    <th>Train Number</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Class</th>
                    <th>Availability</th>
                </tr>
    `;

    trainData.forEach((train, index) => {
        const classTypes = train.classes.map(c => 
            `<span class="class-group">${c.classType}</span>`
        ).join('');

        const availability = train.classes.map(c => 
            `<span class="availability">${c.availability}</span>`
        ).join('');

        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${train.name}</td>
                <td>${train.number}</td>
                <td>${train.departure}</td>
                <td>${train.arrival}</td>
                <td>${train.departureTime}</td>
                <td>${train.arrivalTime}</td>
                <td>${classTypes}</td>
                <td>${availability}</td>
            </tr>
        `;
    });

    tableContent += `
            </table>
        </body>
        </html>
    `;
    return tableContent;
}