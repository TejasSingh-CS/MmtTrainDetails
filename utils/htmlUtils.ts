export function generateHTMLTable(trainData) {
    let tableContent = `
      <html>
      <head>
          <title>Train Details</title>
          <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
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
              </tr>
    `;
  
    trainData.forEach((train, index) => {
      tableContent += `
          <tr>
              <td>${index + 1}</td>
              <td>${train.name}</td>
              <td>${train.number}</td>
              <td>${train.departure}</td>
              <td>${train.arrival}</td>
              <td>${train.departureTime}</td>
              <td>${train.arrivalTime}</td>
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
  