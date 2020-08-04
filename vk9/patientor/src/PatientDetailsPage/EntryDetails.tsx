import React from 'react';
import { Entry } from '../types';

import HospitalEntry from './EntryDetails';
import HealthCheckEntry from './EntryDetails';
import OccupationalHealthcareEntry from './EntryDetails';


const assertNever = (entry: never): never => {
    throw new Error(
        `No exist handler, entry type: ${JSON.stringify(entry)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
