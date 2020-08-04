import React from 'react';

const DiagnosisCodes:
    React.FC<{ codes: Array<string> }>
        = ({ codes }) => {

    if (!codes) return null;

    return (
        <ul>
        {
        codes.map((diag, i) => 
          <li key={i+20000}>
            {diag} {diag}
          </li>)
        }
        </ul>
    );
};

export default DiagnosisCodes;
