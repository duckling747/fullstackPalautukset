import React from 'react';
import { OccupationalHealthcareEntryComponent } from './OccupationalHealthcareEntry';
import { HealthCheckEntryComponent } from './HealthCheckEntry';
import { HospitalEntryComponent } from './HospitalEntry';
import { Entry } from '../../types';
import { useStateValue } from '../../state';
import { List, Header } from 'semantic-ui-react';


const assertNever = (entry: never): never => {
    throw new Error(
        `No exist handler, entry type: ${JSON.stringify(entry)}`
    );
};

const DetailSelector: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntryComponent entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    const [{ diagnoses }] = useStateValue();
    
    const diagnosesIsNotPopulated = Object.values(diagnoses).length <= 0;

    if (diagnosesIsNotPopulated) return null;

    const diags
      = entry.diagnosisCodes?.length
      ?
      <>
        <Header as="h4">Diagnoses</Header>
        <List bulleted divided>
            {entry.diagnosisCodes.map((c, i) =>
              <List.Item key={i}>{c} {diagnoses[c].name}</List.Item>
            )}
        </List>
      </>
      : null;
    return (
        <div>
            <DetailSelector entry={entry} />
            <strong>
              {diags}
            </strong>
        </div>
    );
};

export default EntryDetails;
