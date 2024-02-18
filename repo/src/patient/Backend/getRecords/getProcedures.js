export async function getProcedures(data) {
            if (data && data.metadata && data.metadata.procedures) {
                return await Promise.all(data.metadata.procedures.map(async (procedures) => ({
                    name: procedures.HCPCS || "",
                    date: procedures.date || "",
                    provider: (await getClinicalTables(procedures.NPI, "npi_org"))[0] || ""
                })));
            } else {
                console.log("No conditions data found for the patient.");
                return [];
            }
        } 

export default getProcedures;