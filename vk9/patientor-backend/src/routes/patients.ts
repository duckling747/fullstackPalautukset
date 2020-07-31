import express from 'express';
import patientService from '../services/patientService';

import { NewPatient, Patient } from '../types';
import { getPatient } from '../utils';


const router = express.Router();

router.get('', (_req, res) => {
    res.json(patientService.getPatients());
});

router.post('', (req, res) => {
    const newPatient: NewPatient = getPatient(req);
    const patient: Patient = patientService.addPatient(newPatient);
    res.json(patient);
});

export default router;
