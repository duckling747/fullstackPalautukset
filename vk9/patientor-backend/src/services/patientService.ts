import patientData from '../../data/patients';
import { Patient, NewPatient, PublicPatient, Entry } from '../types';

import { v4 as uuid } from 'uuid';

const getPatients = (): Array<PublicPatient> => {
    return patientData
        .map(({ id, name, dateOfBirth, occupation, gender, entries }) => ({
            id,
            name,
            gender,
            dateOfBirth,
            occupation,
            entries
        }));
};

const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    const addedPatient = {
        ...patient,
        id
    };
    patientData.push(addedPatient);
    return addedPatient;
};

const getPatientById = (id: string): Patient | undefined => {
    return patientData.find(p => p.id === id);
};

const addEntry = (entry: Entry, id: string): Entry | undefined => {
    const patient
        = patientData.find(p => p.id === id);
    if (!patient) return undefined;
    const idEnt: string = uuid();
    const addedEntry = {
        ...entry,
        id: idEnt
    };
    patient.entries.push(addedEntry);
    return entry;
};

export default {
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};
