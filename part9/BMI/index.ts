/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from 'express';
import { calculateBmi } from "./modules/calculateBmi";
import { calculateExercises } from './modules/calculateExercises';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try{
        if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))) {
            const weight = Number(req.query.weight);
            const height = Number(req.query.height);
            res.send({
                weight,
                height,
                bmi: calculateBmi(height, weight)
            });
        }else{
            res.send({error: "malformatted parameters"});
        }
    }catch(e) {
        res.send({error: "error encountered"});
    }  
  });

  app.post('/exercises', (req, res) => {
    const target = req.body.target;
    const daily_exercises = req.body.daily_exercises;
    
    if (!target || !daily_exercises){ 
      res.send({error: "parameters missing"});
    }else{
      try{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          if (!isNaN(Number(target)) && daily_exercises.filter((e: string)  => isNaN(Number(e))).length === 0) {
              res.send(calculateExercises(req.body.daily_exercises, req.body.target));
          }else{
              res.send({error: "malformatted parameters"});
          }
      }catch(e) {
          res.send({error: "error encountered"});
      }
    }  
  });
  
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});