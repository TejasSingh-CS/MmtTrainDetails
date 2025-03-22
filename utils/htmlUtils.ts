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

export function generateHTMLTable(trainData: TrainDetails[]) {
    let tableContent = `
        <html>
        <head>
            <title>Train Details</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .class-group { margin: 4px 0; padding: 4px; background: #f8f8f8; }
            </style>
        </head>
        <body>
            <h2>Train Details</h2>
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
        // Combine classes into single cell content
        const classTypes = train.classes.map(c => 
            `<div class="class-group">${c.classType}</div>`
        ).join('');

        const availability = train.classes.map(c => 
            `<div class="class-group">${c.availability}</div>`
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