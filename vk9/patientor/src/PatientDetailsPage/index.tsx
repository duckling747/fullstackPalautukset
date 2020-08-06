import React, { useEffect, CSSProperties } from 'react';
import { Patient, Diagnose, Entry } from '../types';
import { Icon, Header, Button, ButtonGroup, Popup } from 'semantic-ui-react';
import { useStateValue, Action, addPatient, setDiagnoses, addEntry } from '../state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import Entries from './Entries';
import EntryModal from '../EntryForms';
import { EntryFormValues, formSwitch } from '../EntryForms/types';

const iconsNames = (gender: string) => {
    switch (gender) {
        case "male": return "mars";
        case "female": return "venus";
        case "other": return "genderless";
        default: throw new Error("gender fault");
    }
};

const fetchPatientById 
    = async (id: string, dispatch: React.Dispatch<Action>) => {
      try {
        const { data: newPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatient(newPatient));
      } catch (e) {
        console.error(e);
      }
    };

const fetchDiagnosisMappings = async (dispatch: React.Dispatch<Action>) => {
  try {
    const { data: diagnoses } = await axios.get<Diagnose[]>(
      `${apiBaseUrl}/diagnoses`
    );
    dispatch(setDiagnoses(diagnoses));
  } catch (e) {
    console.log(e);
  }
};

const PatientDetailPage: React.FC = () => {

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const [error, setError] = React.useState<string | undefined>();

    const [modalType, setModalType] = React.useState<formSwitch>(formSwitch.hospital);

    const openModal = (): void => {
      setModalOpen(true);
    };

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const [{ patients, diagnoses }, dispatch] = useStateValue();

    const diagnosesPopulated = Object.values(diagnoses).length > 0;

    useEffect(() => {
      if (diagnosesPopulated) return;
      fetchDiagnosisMappings(dispatch)
        .catch(err => console.log(err));
    }, [dispatch, diagnosesPopulated]);

    const { id } = useParams<{ id: string }>();

    const patient: Patient | undefined
        = Object.values(patients).find(p => p.id === id);

    if (!patient) {
      fetchPatientById(id, dispatch)
        .catch(err => {
           console.log(err);
      });
      return null;
    }

    const ssnRow
        = patient.ssn
        ? <p>ssn: {patient.ssn}</p>
        : null;

    const dateOfBirthRow
        = patient.dateOfBirth
        ? <p>date of birth: {patient.dateOfBirth}</p>
        : null;
    
    const bAddHospitalEntryHandler = () => {
      setModalType(formSwitch.hospital);
      openModal();
    };

    const bAddOccupationalEntryHandler = () => {
      setModalType(formSwitch.occupational);
      openModal();
    };

    const bAddHealthCheckEntryHandler = () => {
      setModalType(formSwitch.healthCheck);
      openModal();
    };

    const bAddStyle: CSSProperties = {
      margin: "20px",
      display: "flex"
    };

    const submitNewEntry = async (values: EntryFormValues) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: entry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        dispatch(addEntry(entry, patient.id));
        closeModal();
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.error(e.response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setError(e.response.data.error);
      }
    };

    return (
        <>
          <Header as="h2">{patient.name}</Header>
          <p>
            gender: <Icon name={iconsNames(patient.gender)} size="huge"></Icon>
          </p>
          {ssnRow}
          <p>
            occupation: {patient.occupation}
          </p>
          {dateOfBirthRow}
          <Header as="h3">
            Entries
          </Header>
          <Entries entries={patient.entries} />
          <EntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            type={modalType}
          />
          <ButtonGroup style={bAddStyle}>
            <Popup content="Add a new hospital entry"
              trigger={
                <Button
                  color="blue"
                  icon="hospital"
                  size="large"
                  onClick={bAddHospitalEntryHandler}
                />
              }
              position="top center"
            />
            <Popup content="Add a new occupational healthcare entry"
              trigger={
                <Button
                  color="blue"
                  icon="configure"
                  size="large"
                  onClick={bAddOccupationalEntryHandler}
                />
              }
              position="top center"
            />
            <Popup content="Add a new health check entry"
              trigger={
                <Button
                  color="blue"
                  icon="stethoscope"
                  size="large"
                  onClick={bAddHealthCheckEntryHandler}
                />
              }
              position="top center"
            />
          </ButtonGroup>
        </>
    );
};

export default PatientDetailPage;