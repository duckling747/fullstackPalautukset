import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import {
  EntryProps, HospitalEntryProps, OccupationalEntryProps, formSwitch, HealthCheckEntryProps
} from "./types";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalEntryForm from "./AddOccupationalEntryForm";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";

  
const AddHospitalEntryModal: React.FC<HospitalEntryProps>
  = ({ modalOpen, onClose, onSubmit, error }: HospitalEntryProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new hospital entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

  const AddOccupationalEntryModal: React.FC<OccupationalEntryProps>
    = ({ modalOpen, onClose, onSubmit, error }: OccupationalEntryProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new occupational healthcare entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

  const AddHealthCheckEntryModal: React.FC<HealthCheckEntryProps>
    = ({ modalOpen, onClose, onSubmit, error }: HealthCheckEntryProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new health check entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

const assertNever = (entry: never): never => {
  throw new Error(
      `Such form no exist: ${JSON.stringify(entry)}`
  );
};

const EntryModal: React.FC<EntryProps>
  = (props: EntryProps) => {
    switch (props.type) {
        case formSwitch.hospital:
          return <AddHospitalEntryModal {...props as HospitalEntryProps} />;
        case formSwitch.occupational:
          return <AddOccupationalEntryModal {...props as OccupationalEntryProps} />;
        case formSwitch.healthCheck:
          return <AddHealthCheckEntryModal {...props as HealthCheckEntryProps} />;
        default:
          return assertNever(props.type);
    }
};

export default EntryModal;
