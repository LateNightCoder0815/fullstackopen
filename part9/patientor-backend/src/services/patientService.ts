import patientsData from '../../data/patients.json';
import { PatientsEntry, PatientsEntryNoSSN, NewPatientsEntry } from '../types';

const patients: Array<PatientsEntry> = patientsData as Array<PatientsEntry>;

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

export default {
  getEntries,
  addPatient,
  getPatient
};