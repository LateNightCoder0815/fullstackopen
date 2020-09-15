import React from "react";
import axios from "axios";
import { PatientDetail } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { addPatientDetail } from "../state/reducer";
import { Icon } from "semantic-ui-react";
import { EntryDetails } from "./EntryDetails";

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetail }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientDetailFromApi } = await axios.get<PatientDetail>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatientDetail(patientDetailFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patientDetail[id]){
      fetchPatientList();
    }
  }, [id,dispatch,patientDetail]);

  if (!patientDetail[id]){
    return (<></>);
  }
  const genderIcon = patientDetail[id].gender === "male" ? "mars" : "venus";
  return (
    <div className="App">
      <h1>{patientDetail[id].name} <Icon name={genderIcon} /></h1>
      <div>ssn: {patientDetail[id].ssn}</div>
      <div>occupation: {patientDetail[id].occupation}</div>
      <h2>entries</h2>
      {patientDetail[id].entries.map(e => 
       <div key = {e.id}> <EntryDetails entry={e} /> </div>
      )}
    </div>
  );
};

export default PatientDetailPage;