//takes npi and returns name of provider
export async function translateNpiToName(npi) {
  const apiUrl = `https://clinicaltables.nlm.nih.gov/api/npi_org/v3/search?terms=${npi}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data); // Log the API response
      // Assuming the API response contains an array of results where the first item contains the name
      if (data[0][1][0]) {
        const name = data[0][1][0]; // Extract the first item from the inner array
        console.log(`Name for NPI ${npi}: ${name}`);
        return name;
      } else {
        console.error('No name found for NPI: ', npi);
        return npi;
      }
    })
    .catch(error => {
      console.error('Error fetching name for NPI: ', error);
      return "error"+npi;
    });
}

