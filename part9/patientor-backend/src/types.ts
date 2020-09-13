// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
  }

export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
  }

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PatientsEntryNoSSN = Omit<PatientsEntry, 'ssn' | 'entries'>;

export type NewPatientsEntry = Omit<PatientsEntry, 'id'>;