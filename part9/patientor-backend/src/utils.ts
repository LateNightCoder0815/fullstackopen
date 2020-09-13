/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientsEntry, Gender } from './types';

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

const parseGender = (visibility: any): Gender => {
  if (!visibility || !isGender(visibility)) {
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

export default toNewPersonEntry;