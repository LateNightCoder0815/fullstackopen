import { calculateExercises } from "./modules/calculateExercises";

const parseArguments = (args: Array<string>): {target: number, daily: Array<number>} => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    if (!isNaN(Number(args[2]))) {
      return {
        target: Number(args[2]),
        daily: args.slice(3).map(d => Number(d))
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

try {
    const { target, daily } = parseArguments(process.argv);
    console.log(calculateExercises(daily, target));
} catch (e) {
    console.log('Error, something bad happened, message: ', e);
}