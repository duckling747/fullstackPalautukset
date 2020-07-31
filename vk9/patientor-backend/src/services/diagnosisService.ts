import diagnosisData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnosisData;
};

export default {
    getDiagnoses
};
