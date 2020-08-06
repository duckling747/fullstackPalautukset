import { NewPatient, Gender, HealthCheckEntry, Entry, HospitalEntry,
    OccupationalHealthCareEntry,
    Diagnose, HealthCheckRating
} from '../types';
import express from 'express';


const isString = (field: unknown): boolean => {
    return typeof field === 'string' || field instanceof String;
};

const isGender = (field: unknown): boolean => {
    return Object.values(Gender).includes(field as Gender);
};

const isHealthCheckRating = (field: unknown): boolean => {
    return Object.values(HealthCheckRating).includes(field as HealthCheckRating);
};

const isNumber = (field: unknown): boolean => {
    return typeof field === 'number' || field instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parsePatient = (patient: NewPatient): boolean => {
    return Boolean(
        patient.gender && isString(patient.gender)
        && isGender(patient.gender)
        && patient.dateOfBirth && isString(patient.dateOfBirth)
        && isDate(patient.dateOfBirth)
        && patient.name && isString(patient.name)
        && patient.occupation && isString(patient.occupation)
        && patient.ssn && isString(patient.ssn)
    );
};

const parseDiagnosisCodes = (codes: unknown): boolean => {
    return Array.isArray(codes) && codes.every(item => {
        const diag = item as Diagnose;
        return (
            diag.code && isString(diag.code)
            && diag.name && isString(diag.name)
            && (diag.latin ? (isString(diag.latin)) : true)
        );
    });
};

const parseHealthCheck = (entry: HealthCheckEntry): boolean => {
    return Boolean(
        (entry.healthCheckRating || entry.healthCheckRating === 0)
        && isNumber(entry.healthCheckRating)
        && isHealthCheckRating(entry.healthCheckRating)
    );
};

const parseHospital = (entry: HospitalEntry): boolean => {
    return Boolean(
        entry.discharge ? (
            entry.discharge.criteria && isString(entry.discharge.criteria)
            && entry.discharge.date && isString(entry.discharge.date)
        ) : false
    );
};

const parseOccupational = (entry: OccupationalHealthCareEntry): boolean => {
    return Boolean(
        entry.employerName && isString(entry.employerName)
        && (entry.sickLeave ? (
            entry.sickLeave.startDate && isString(entry.sickLeave.startDate)
            && entry.sickLeave.endDate && isString(entry.sickLeave.endDate)
        ) : true)
    );
};

const parseEntry = (entry: Entry): boolean => {
    if (!(
        entry.date && isString(entry.date)
        && isDate(entry.date)
        && entry.description && isString(entry.description)
        && entry.specialist && isString(entry.specialist)
        && entry.type && isString(entry.type)
        && (entry.diagnosisCodes ? (
            parseDiagnosisCodes(entry.diagnosisCodes)
        ) : true)
    )) return false;
    switch (entry.type) {
        case "HealthCheck": return parseHealthCheck(entry);
        case "Hospital": return parseHospital(entry);
        case "OccupationalHealthcare": return parseOccupational(entry);
        default: return false;
    }
};

export const parsePatientFromReq = (req: express.Request): NewPatient => {
    const patient: NewPatient = req.body as NewPatient;
    if (!parsePatient(patient))
        throw new Error('Incorrect or missing field in Patient');
    return patient;
};

export const parseEntryFromReq = (req: express.Request): Entry => {
    const entry: Entry = req.body as Entry;
    if (!parseEntry(entry))
        throw new Error('Incorrect or missing field in Entry');
    return entry;
};