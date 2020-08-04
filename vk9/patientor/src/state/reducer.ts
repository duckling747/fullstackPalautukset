import { State } from "./state";
import { Patient, Diagnose } from "../types";

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
      type: "SET_DIAGNOSES";
      payload: Diagnose[];
  };

export const setDiagnoses = (list: Array<Diagnose>): Action => {
  return {
    payload: list,
    type: "SET_DIAGNOSES"
  };
};

export const setPatientList = (list: Array<Patient>): Action => {
  return {
    payload: list,
    type: "SET_PATIENT_LIST"
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    payload: patient,
    type: "ADD_PATIENT"
  };
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
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
