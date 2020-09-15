import express from 'express';
import patientService from '../services/patientService';
import toNewPersonEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/:id/entries' , (req, res) => {
  try{
    const newEntry = toNewEntry(req.body, "new");
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/', (req, res) => {
  try {
    const newPersonEntry = toNewPersonEntry(req.body);
    const addedEntry = patientService.addPatient(newPersonEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;