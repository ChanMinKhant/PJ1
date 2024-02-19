const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

// Load the Excel file
const workbook = xlsx.readFile(
  path.resolve(__dirname, 'studentsDatabase.xlsx'),
);

// Assuming your data is in the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(sheet);

// Save the JSON data to a file
fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2));

console.log('Conversion completed. JSON data saved to output.json');
