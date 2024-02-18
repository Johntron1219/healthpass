// Function to retrieve provider name by NPI
export default async function getClinicalTables(npi, field) {
    // const baseUrl = "https://npiregistry.cms.hhs.gov/api/";
    // const endpoint = "retrieveNPIRegistry";
    // const params = new URLSearchParams({ number: npi });

    try {
        const response = await fetch(`http://clinicaltables.nlm.nih.gov/api/${field}/v3/search?terms=${npi}`);
        const data = await response.json();
        // console.log();

        // // Assuming the API returns the name in the "basic" field
        // const providerName = data.results[0].basic.name;
        return data[3][0];
    } catch (error) {
        return null;
    }
};