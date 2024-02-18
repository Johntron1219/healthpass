export async function getImmunizations(data) {
            if (data && data.metadata && data.metadata.immunizations) {
                return Promise.all(data.metadata.immunizations.map(async (immunizations) => ({
                    name: immunizations.HCPCS || "",
                    dosage: immunizations.date || "",
                    provider: (await getClinicalTables(immunizations.NPI, "npi_org"))[0] || ""
                })));
            } else {
                console.log("No conditions data found for the patient.");
                return [];
            }
        }
export default getImmunizations;