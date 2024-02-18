import { getClinicalTables } from "./util";

export async function getLabRecords(data) {
            if (data && data.metadata && data.metadata.labrecords) {
                // console.log( await getClinicalTables(data.metadata.labrecords[0].HCPCS, "hcpcs") )
                return await Promise.all(data.metadata.labrecords.map(async (labrecords) => {
                    let data = (await getClinicalTables(labrecords.HCPCS, "hcpcs"));
                    return  {
                        name: data ? data[1] : labrecords.HCPCS,
                        provider: (await getClinicalTables(labrecords.NPI, "npi_org"))[0] || "",
                        date: labrecords.date || "", 
                        value: labrecords.value || ""
                    }
                }));
            } else {
                console.log("No conditions data found for the patient.");
                return [];
            }
}
export default getLabRecords;