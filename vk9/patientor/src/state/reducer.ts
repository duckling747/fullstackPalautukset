import { State } from "./state";
import { Patient, Diagnose, Entry } from "../types";

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
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      entry: Entry,
      id: string
    }
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

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    payload: {
      entry,
      id
    },
    type: "ADD_ENTRY"
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
    case "ADD_ENTRY":{
      if (!state.patients[action.payload.id].entries)
        state.patients[action.payload.id].entries = [];
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: state.patients[action.payload.id].entries?.concat(action.payload.entry)
          }
        }
      };
    }
    default:
      return state;
  }
};
