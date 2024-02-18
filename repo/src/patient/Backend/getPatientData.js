import { database } from '../../firebase'; // Adjust the path as necessary

const getPatientData = async (pt, path) => {
  const docRef = database.collection('patients').doc(pt);

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      const jsonData = doc.data();
      const value = getValueByPath(jsonData, path);
      return value;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.log('Error getting document:', error);
    return null;
  }
};

const getValueByPath = (object, path) => {
  const keys = path.split('.');
  let value = object;
  keys.forEach((key) => {
    if (value && key in value) {
      value = value[key];
    } else {
      value = null;
    }
  });
  return value;
};

export default getPatientData;
