
const fs = require('fs');
const path = require('path');

const inputDirectory = './'; // Directory containing the input JSON files
const outputFile = './output.json'; // Output file path

// Read all JSON files in the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const combined = {};

  // Process each JSON file
  files.forEach((file) => {
    const filePath = path.join(inputDirectory, file);

    // Read the JSON file
    const fileData = fs.readFileSync(filePath, 'utf8');

    try {
      const jsonData = JSON.parse(fileData);

      // Use the file name (without extension) as the key
      const fileName = path.basename(file, '.json');
      combined[fileName] = jsonData;
    } catch (err) {
      console.error(`Error parsing ${file}:`, err);
    }
  });

  // Write the combined data to the output file
  fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2));
  console.log('Output file created successfully.');
});