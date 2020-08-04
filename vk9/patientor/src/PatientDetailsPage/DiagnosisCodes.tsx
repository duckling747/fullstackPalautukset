import React from 'react';
import { useStateValue } from '../state';

const DiagnosisCodes:
    React.FC<{ codes: Array<string> }>
        = ({ codes }) => {

    const [{ diagnoses }] = useStateValue();

    const diagnosesNotPopulated = Object.values(diagnoses).length <= 0;

    if (!codes || diagnosesNotPopulated) return null;

    return (
        <ul>
        {
        codes.map((diag, i) => 
          <li key={i+20000}>
            {diag} {diagnoses[diag].name}
          </li>)
        }
        </ul>
    );
};

export default DiagnosisCodes;
