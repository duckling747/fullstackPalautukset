import React from 'react';
import { Segment, Icon, Header, Label } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../../types';

export const OccupationalHealthcareEntryComponent: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
    const sickLeave
    = entry.sickLeave
    ? <p>
        On sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
    </p>
    : null;

    return (
        <Segment as="div">
            <Icon name="configure" size="huge"></Icon>
            <Header as="h3">{entry.date}</Header>
            <p>
                Specialist: {entry.specialist}
            </p>
            <p>
                Employer: {entry.employerName}
            </p>
            {sickLeave}
            <Label as="p">{entry.description}</Label>
        </Segment>
    );

};

