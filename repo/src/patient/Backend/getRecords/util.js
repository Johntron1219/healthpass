// Function to retrieve provider name by NPI
async function getProviderNameByNPI(npi) {
    // const baseUrl = "https://npiregistry.cms.hhs.gov/api/";
    // const endpoint = "retrieveNPIRegistry";
    // const params = new URLSearchParams({ number: npi });

    try {
        const response = await fetch(`http://clinicaltables.nlm.nih.gov/api/npi_org/v3/search?terms=${npi}`);
        const data = await response.json();
        // console.log();

        // // Assuming the API returns the name in the "basic" field
        // const providerName = data.results[0].basic.name;
        return data[3][0][0];
    } catch (error) {
        return null;
    }
}


export {getProviderNameByNPI};