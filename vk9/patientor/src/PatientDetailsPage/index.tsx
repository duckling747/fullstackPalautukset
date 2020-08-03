import React from 'react';
import { Patient } from '../types';
import { Icon, Header } from 'semantic-ui-react';
import { useStateValue, Action } from '../state';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

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
        dispatch({ type: "ADD_PATIENT", payload: newPatient });
      } catch (e) {
        console.error(e);
      }
    };

const PatientDetailPage: React.FC = () => {

    const [{ patients }, dispatch] = useStateValue();

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
        </>
    );
};

export default PatientDetailPage;