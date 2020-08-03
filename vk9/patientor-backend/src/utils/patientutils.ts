import { NewPatient, Gender } from '../types';
import express from 'express';


const isString = (field: unknown): boolean => {
    return typeof field === 'string' || field instanceof String;
};

const isGender = (field: unknown): boolean => {
    return Object.values(Gender).includes(field as Gender);
};

const parsePatient = (patient: NewPatient): boolean => {
    return Boolean(
        patient.gender && isString(patient.gender)
        && isGender(patient.gender)
        && patient.dateOfBirth && isString(patient.dateOfBirth)
        && patient.name && isString(patient.name)
        && patient.occupation && isString(patient.occupation)
        && patient.ssn && isString(patient.ssn)
    );
};

export const parsePatientFromReq = (req: express.Request): NewPatient => {
    const patient: NewPatient = req.body as NewPatient;
    if (!parsePatient(patient))
        throw new Error('Incorrect or missing field in Patient');
    return patient;
};
