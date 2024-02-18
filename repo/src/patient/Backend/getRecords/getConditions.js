import { getClinicalTables } from "./util";

export async function getConditions(data) {
    if (data && data.metadata && data.metadata.conditions) {
                const conditions = await Promise.all(data.metadata.conditions.map(async condition => {
                    try {
                        const providerName = (await getClinicalTables(condition.NPI, "npi_org"))[0];
                        console.log("Provider Name:", providerName);
                        return {
                            name: condition.ICD10 || "",
                            provider: providerName || "",
                            date: condition.diagnosisdate || ""
                        };
                    } catch (error) {
                        console.error("Error:", error);
                        return null;
                    }
                }));
                return conditions.filter(condition => condition !== null);
            } else {
                console.log("No conditions data found for the patient.");
                return [];
            }}
export default getConditions;