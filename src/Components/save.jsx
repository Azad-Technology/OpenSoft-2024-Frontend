export function saveJsonFile(data, fileName) {
    const dataStr = JSON.stringify(data, null, 2); // Convert the JSON object to a string with indentation
    const blob = new Blob([dataStr], { type: 'application/json' }); // Create a Blob object with the JSON data
    const url = URL.createObjectURL(blob); // Create a temporary URL for the Blob
  
    const a = document.createElement('a'); // Create a temporary anchor element
    a.href = url; // Set the anchor's href to the temporary URL
    a.download = fileName; // Set the desired file name
  
    document.body.appendChild(a); // Append the anchor to the document's body
    a.click(); // Trigger the click event to initiate the download
    document.body.removeChild(a); // Remove the temporary anchor from the document
  
    URL.revokeObjectURL(url); // Release the temporary URL object
  }