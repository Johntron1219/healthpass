const { fetchPtData } = require('./fetchptdata.js');
const testFetchPtData = async () => {
  const ptId = "0002";
  const path = "metadata.conditions";
  const result = await fetchPtData(ptId, path);
  console.log(result);
};

testFetchPtData();