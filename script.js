// Data Array to store logs
let vehicleLogs = [];
let vehicleIDCounter = 1; // Counter to generate unique Vehicle IDs

// Function to add log entry
document.getElementById('vehicleForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const vehicleNumber = `MEH${vehicleIDCounter.toString().padStart(4, '0')}`; // Auto-generated ID, e.g., MEH0001
  const enter_exit_status = document.getElementById('enterExitStatus').value;
  const vehicleType = document.getElementById('vehicleType').value.trim();
  const registration_number = document.getElementById('registrationNumber').value.trim();
  const timestamp = new Date().toLocaleString(); // Auto-generated timestamp
 
    // Check if data is being captured
    console.log('Captured Data:', {
      vehicleNumber, enter_exit_status, vehicleType, registration_number, timestamp
    });
  
  // Add entry to logs
  vehicleLogs.push({ vehicleNumber, enter_exit_status, vehicleType, registration_number, timestamp });
  
  // Increment vehicle ID counter for the next entry
  vehicleIDCounter++;
 
  // Clear form (no need to clear vehicle ID since it's auto-generated)
  document.getElementById('vehicleForm').reset();
  
  // Display log in table
  displayLog();
});

// fetch('/vehicle/entry', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(data)
// }).then(response => response.text()).then(() => {
//   alert('Vehicle logged successfully!')});

// Function to display log in table
function displayLog() {
  const tableBody = document.querySelector('#logTable tbody');
  tableBody.innerHTML = ''; // Clear existing table rows

// Log to ensure logs are correct
console.log('vehicleLogs:', vehicleLogs);
  
  vehicleLogs.forEach((log) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${log.vehicleNumber}</td>
    <td>${log.enter_exit_status}</td>
    <td>${log.vehicleType}</td>
    <td>${log.registration_number}</td>
    <td>${log.timestamp}</td>
  `
    tableBody.appendChild(row); // Append new row to table body
  });
}

// Function to download logs as CSV
document.getElementById('downloadBtn').addEventListener('click', function () {
  if (vehicleLogs.length === 0) {
    alert('No logs available to download.');
    return;
  }
  let csvContent = "data:text/csv;charset=utf-8,Vehicle ID,Enter/Exit Status,Vehicle Type,Registration Number,Timestamp\n";
  
  vehicleLogs.forEach(log => {
    csvContent += `${log.vehicleNumber},${log.enter_exit_status}, ${log.vehicleType},${log.registration_number},${log.timestamp},\n`;
  });
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'vehicle_logs.csv');
  document.body.appendChild(link); // Required for Firefox
  
  link.click();
  document.body.removeChild(link); // Clean up the DOM
});
