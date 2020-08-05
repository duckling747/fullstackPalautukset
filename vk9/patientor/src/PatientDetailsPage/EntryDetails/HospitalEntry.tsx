import React from 'react';
import { Segment, Icon, Header, Label } from 'semantic-ui-react';
import { HospitalEntry } from '../../types';

export const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

    return (
        <Segment as="div">
            <Icon name="hospital" size="huge"></Icon>
            <Header as="h3">
              {entry.date}
            </Header>
            <p>
                Specialist: {entry.specialist}
            </p>
            <p>
                Discharge date: {entry.discharge.date}
            </p>
            <p>
                Discharge criteria: {entry.discharge.criteria}
            </p>
            <Label>
                {entry.description}
            </Label>
        </Segment>
    );
};

