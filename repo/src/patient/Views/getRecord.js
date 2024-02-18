import getImmunizations from "../../../repo/src/patient/getRecords/getImmunizations";
import getProcedures from "../../../repo/src/patient/getRecords/getProcedures";

function getRecord(input) {
    let message;
    switch (input) {
      case 'conditions': 
        ret = getConditions();
        break;
      case 'allergies':
        ret = getAllergies();
        break;
      case 'procedures':
        ret = getProcedures();
        break;
      case 'labRecords':
        ret =  getlabRecords();
        break;
      case 'immunizations':
        ret = getImmunizations();
        break;
    }
    return ret;
  }