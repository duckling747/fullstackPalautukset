import express from 'express';
import patients from '../../data/patients';

import { Patient } from '../types';

const getPatients = (): Array<Omit<Patient, 'ssn'>> => {
    return patients
        .map(({id, name, dateOfBirth, occupation, gender}) => ({
            id,
            name,
            gender,
            dateOfBirth,
            occupation
        }));
};

const router = express.Router();

router.get('', (_req, res) => {
    res.json(getPatients());
});

export default router;
