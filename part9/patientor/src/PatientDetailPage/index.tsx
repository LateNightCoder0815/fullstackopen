import React from "react";
import axios from "axios";
import { PatientDetail, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { addPatientDetail } from "../state/reducer";
import { Icon, Button } from "semantic-ui-react";
import { EntryDetails } from "./EntryDetails";
import AddEntryModal from "../AddPatientModal/AddEntry";

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetail }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedType, setType] = React.useState<string>("");
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (type: string): void => {
    setType(type);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: Omit<Entry, "id">) => {
    console.log(values);
    try {
      await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      fetchPatientList();
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    if (!patientDetail[id]){
      fetchPatientList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [id,patientDetail]); 

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        selectedType = {selectedType}
      />
      <Button onClick={() => openModal("Hospital")}>Add hospital entry</Button>
      <Button onClick={() => openModal("OccupationalHealthcare")}>Add occupational healthcare entry</Button>
      <Button onClick={() => openModal("HealthCheck")}>Add health check entry</Button>
    </div>
  );
};

export default PatientDetailPage;