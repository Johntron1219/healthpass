export async function getAllergies(pt) {
            if (data && data.metadata && data.metadata.allergies) {
                return await Promise.all(data.metadata.allergies.map(async (allergies) => ({
                    name: allergies.allergen || "",
                    provider: (await getClinicalTables(allergies.NPI, "npi_org"))[0] || "",
                    severity: allergies.reaction || ""
                })));
            } else {
                console.log("No conditions data found for the patient.");
                return [];
            }
        }
export default getAllergies;