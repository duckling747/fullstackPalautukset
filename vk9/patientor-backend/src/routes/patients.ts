import express from 'express';
import patientService from '../services/patientService';

import { NewPatient, Patient } from '../types';
import { parsePatientFromReq } from '../utils';


const router = express.Router();

router.get('', (_req, res) => {
    res.json(patientService.getPatients());
});

router.post('', (req, res) => {
    const newPatient: NewPatient = parsePatientFromReq(req);
    const patient: Patient = patientService.addPatient(newPatient);
    res.json(patient);
});

router.get('/:id', (req, res) => {
    const foundPatient = patientService.getPatientById(
        req.params.id
    );
    if (!foundPatient) {
        res.status(404).json({ error: "specified id not found" });
    }
    res.json(foundPatient);
});

export default router;
