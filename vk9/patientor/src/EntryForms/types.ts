import {
    HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry
} from "../types";


export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

export type OccupationalEntryFormValues = Omit<OccupationalHealthCareEntry, "id">;

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

export type EntryFormValues
    = HospitalEntryFormValues
    | OccupationalEntryFormValues
    | HealthCheckEntryFormValues;

export enum formSwitch {
    "hospital", "occupational", "healthCheck"
}

interface BaseProps {
    modalOpen: boolean;
    onClose: () => void;
    error?: string;
}

export interface HospitalEntryProps extends BaseProps {
    onSubmit: (values: HospitalEntryFormValues) => void;
}

export interface OccupationalEntryProps extends BaseProps {
    onSubmit: (values: OccupationalEntryFormValues) => void;
}

export interface HealthCheckEntryProps extends BaseProps {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
}

interface ModalType {
    type: formSwitch
}

export type EntryProps
    = (HospitalEntryProps
    | OccupationalEntryProps
    | HealthCheckEntryProps
    )
    & ModalType;
