import loadedPatients from '../../data/patients';
import { PatientsEntry, PatientsEntryNoSSN, NewPatientsEntry, Entry } from '../types';

let patients = loadedPatients;

const getEntries = (): Array<PatientsEntryNoSSN> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
      id, 
      name, 
      dateOfBirth, 
      gender, 
      occupation 
    }));
};

const getPatient = (id:string) : PatientsEntry | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = ( entry: NewPatientsEntry ): PatientsEntry => {
  const newPatientEntry = {
    id: "new",
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};


const addEntry = ( entry: Entry, patientID: string ) : PatientsEntry | undefined => {
  const myPatient = getPatient(patientID);
  if (myPatient){
    myPatient.entries.push(entry);
    patients = patients.map(p => p.id === patientID ? myPatient : p);
  }
  
  return myPatient;
};



export default {
  getEntries,
  addPatient,
  getPatient,
  addEntry
};