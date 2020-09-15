import { State } from "./state";
import { Patient, PatientDetail, DiagnosesEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAIL";
      payload: PatientDetail;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: DiagnosesEntry[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DETAIL":
      return {
        ...state,
        patientDetail: {
          ...state.patientDetail,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diag) => ({ ...memo, [diag.code]: diag }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};


export const addPatientDetail = (payload: PatientDetail): Action => {
  return { type: "ADD_PATIENT_DETAIL" , payload };};

export const addPatient = (payload: Patient): Action => {
  return { type: "ADD_PATIENT" , payload };};

export const setPatientList = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST" , payload };};

export const setDiagnosesList = (payload: DiagnosesEntry[]): Action => {
  return { type: "SET_DIAGNOSES_LIST" , payload };};