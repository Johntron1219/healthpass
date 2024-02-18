export async function getMedications(data) {
    if (data && data.metadata && data.metadata.medications) {
        return await Promise.all(data.metadata.medications.map(async (medications) => ({
            name: medications.NDC || "",
            dosage: medications.dose || "",
            provider: (await getClinicalTables(medications.NPI, "npi_org"))[0] || ""
        })));
    } else {
        console.log("No conditions data found for the patient.");
        return [];
    }
}
export default getMedications;