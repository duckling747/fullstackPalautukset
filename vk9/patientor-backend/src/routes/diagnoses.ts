import express from 'express';
import diagnoses from '../../data/diagnoses';

import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

const router = express.Router();

router.get('', (_req, res) => {
    res.json(getDiagnoses());
});

export default router;
