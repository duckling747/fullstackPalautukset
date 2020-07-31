import patientData from '../../data/patients';
import { Patient, NewPatient } from '../types';

import { v4 as uuid } from 'uuid';

const getPatients = (): Array<Omit<Patient, 'ssn'>> => {
    return patientData
        .map(({ id, name, dateOfBirth, occupation, gender }) => ({
            id,
            name,
            gender,
            dateOfBirth,
            occupation
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

export default {
    getPatients,
    addPatient
};
