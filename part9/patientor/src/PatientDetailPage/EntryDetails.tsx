import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };



export const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) =>{
    const [{ diagnoses }] = useStateValue();

    switch (entry.type){
        case "HealthCheck":
            return (
                <div key = {entry.date}>
                    <h3>{entry.date} <Icon name="checkmark" /></h3>
                    {entry.description} <br />
                    Rating: {entry.healthCheckRating}
                    <ul>
                        {entry.diagnosisCodes ? entry.diagnosisCodes.map( d => 
                        <li key={d}>{d} {diagnoses[d] ? diagnoses[d].name: ""}</li>) : <></>}
                    </ul>
                </div>
            );
        case "Hospital":
            return (
                <div key = {entry.date}>
                    <h3>{entry.date} <Icon name="hospital" /></h3>
                    {entry.description} <br />
                    Discharge: {entry.discharge.date}: {entry.discharge.criteria}
                    <ul>
                        {entry.diagnosisCodes ? entry.diagnosisCodes.map( d => 
                        <li key={d}>{d} {diagnoses[d] ? diagnoses[d].name: ""}</li>) : <></>}
                    </ul>
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div key = {entry.date}>
                    <h3>{entry.date} <Icon name="doctor" /></h3>
                    {entry.description} <br />
                    Employer: {entry.employerName} <br />
                    {entry.sickLeave ? `Sick leave: ${entry.sickLeave.startDate} until ${entry.sickLeave.endDate}` : ""}
                    <ul>
                        {entry.diagnosisCodes ? entry.diagnosisCodes.map( d => 
                        <li key={d}>{d} {diagnoses[d] ? diagnoses[d].name: ""}</li>) : <></>}
                    </ul>
                </div>
            );
        default:
            return assertNever(entry);
    }
};