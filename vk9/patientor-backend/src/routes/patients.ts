import express from 'express';
import patientService from '../services/patientService';

import { NewPatient, Patient } from '../types';
import { parsePatientFromReq, parseEntryFromReq } from '../utils';
import { Entry } from '../types/Entry';


const router = express.Router();

router.get('', (_req, res) => {
    res.json(patientService.getPatients());
});

router.post('', (req, res) => {
    try {
        const newPatient: NewPatient = parsePatientFromReq(req);
        const patient: Patient = patientService.addPatient(newPatient);
        res.json(patient);
    } catch (e) {
        res.status(400).json({ error: "Parsing/validation error (check input)" });
    }
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

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry: Entry = parseEntryFromReq(req);
        const entry: Entry | undefined = patientService.addEntry(
            newEntry,
            req.params.id
        );
        if (!entry) {
            res.status(404).json({ error: "specified id not found" });
        }
        res.json(entry);
    } catch (e) {
        res.status(400).json({ error: "Parsing/validation error (check input)" });
    }
    
});

export default router;
