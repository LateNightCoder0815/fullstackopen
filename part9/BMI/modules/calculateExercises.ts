interface CalculateOutput {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string    
}

export const calculateExercises = (daily: Array<number>, target: number): CalculateOutput => {
    const average: number = daily.reduce((acc,cur) => cur + acc) / daily.length;
    let rating: number; 
    let ratingDescription: string; 

    switch (true){
        case (average - target < -0.5):
            rating = 0;
            ratingDescription = 'try harder';
            break;
        case (average - target < 0):
            rating = 2;
            ratingDescription = 'not too bad but could be better';
            break;
        default:
            rating = 3;
            ratingDescription = 'well done';
            break;            
    }
         
    return {
        periodLength: daily.length,
        trainingDays: daily.filter(d => d !== 0).length,
        target,
        average,
        success: average >= target,
        rating,
        ratingDescription
    };
};