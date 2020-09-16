import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import AddEntryFormOccupationalHealthcare from './AddEntryFormOccupationalHealthcare';
import { Entry } from '../types';
import AddEntryFormHealthCheck from './AddEntryFormHealthCheck';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Entry, "id">) => void;
  error?: string;
  selectedType: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, selectedType }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {selectedType === "Hospital" && <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />}
      {selectedType === "OccupationalHealthcare" && <AddEntryFormOccupationalHealthcare onSubmit={onSubmit} onCancel={onClose} />}
      {selectedType === "HealthCheck" && <AddEntryFormHealthCheck onSubmit={onSubmit} onCancel={onClose} />}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
