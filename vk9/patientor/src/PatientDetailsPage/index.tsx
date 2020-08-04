import React, { useEffect } from 'react';
import { Patient, Diagnose } from '../types';
import { Icon, Header } from 'semantic-ui-react';
import { useStateValue, Action, addPatient, setDiagnoses } from '../state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import Entries from './Entries';

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
          <Header as="h3">entries</Header>
          <Entries entries={patient.entries} />
        </>
    );
};

export default PatientDetailPage;