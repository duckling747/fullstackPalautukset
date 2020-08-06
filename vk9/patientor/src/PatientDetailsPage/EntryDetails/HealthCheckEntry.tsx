import React from 'react';
import { Segment, Icon, Header, Label } from 'semantic-ui-react';
import { HealthCheckEntry } from '../../types';

const healthCheckToSpunkIcon = (rating: number) => {
    switch (rating) {
        case 1:
        case 2:
        case 3:
            return <Icon name="thumbs down outline" size="big"></Icon>;
        case 0:
            return <Icon name="thumbs up outline" size="big"></Icon>;
        default:
            throw new Error(
                "rating is off the charts (in HealthCheckEntryComponent)");
    }
};

export const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <Segment as="div">
            <Icon name="stethoscope" size="huge"></Icon>
            <Header as="h3">{entry.date}</Header>
            <p>
                Specialist: {entry.specialist}
            </p>
            <Label>
                {entry.description}
            </Label>
            {healthCheckToSpunkIcon(entry.healthCheckRating)}
        </Segment>
    );
};
