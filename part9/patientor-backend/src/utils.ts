/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientsEntry, Gender,  
  BaseEntry, HospitalEntry, HealthCheckEntry, 
  OccupationalHealthcareEntry, 
  HealthCheckRating,
  Entry} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date`);
  }
  return date;
};

const parseString = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name`);
  }

  return name;
};


const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseGender = (visibility: any): Gender => {
  if (!visibility || !isGender(visibility)) {
      throw new Error('Incorrect or missing visibility: ');
  }
  return visibility;
};


const parseHealthCheckRating = (visibility: any): HealthCheckRating => {
  if (!visibility || !isHealthCheckRating(visibility)) {
      throw new Error('Incorrect or missing visibility: ');
  }
  return visibility;
};


const toNewPersonEntry = (object: any): NewPatientsEntry => {
  const newEntry: NewPatientsEntry = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    occupation: parseString(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };

  return newEntry;
};


export const toNewEntry = (object: any, id: string): Entry => {
  const newEntry: BaseEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    id
  };

  if(object.diagnosisCodes instanceof Array){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    newEntry.diagnosisCodes = object.diagnosisCodes;
  }

  switch(object.type){
    case "Hospital":
      const resultHospital: HospitalEntry = {...newEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria)
        }
      };
      return resultHospital;

    case "HealthCheck":
      const resultHealthCheck: HealthCheckEntry = {...newEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return resultHealthCheck;

    case "OccupationalHealthcare":
      const resultOccupationalHealthcareEntry: OccupationalHealthcareEntry = {...newEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName)
      };
      if (object.sickLeave){
        resultOccupationalHealthcareEntry.sickLeave = {
          startDate: parseDate(object.startDate),
          endDate: parseDate(object.endDate)
        };
      }
      return resultOccupationalHealthcareEntry;

    default:
      throw new Error('Wrong type');
  }

};

export default toNewPersonEntry;