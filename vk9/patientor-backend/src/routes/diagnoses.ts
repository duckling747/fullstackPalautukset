import express from 'express';
import diagnosisService from '../services/diagnosisService';

import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnosisService.getDiagnoses();
};

const router = express.Router();

router.get('', (_req, res) => {
    res.json(getDiagnoses());
});

export default router;
