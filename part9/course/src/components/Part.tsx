import React from 'react';
import { CoursePart } from '../types'

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part: React.FC<{CoursePart : CoursePart}> = ( { CoursePart } ) => {
    switch (CoursePart.name) {
        case "Fundamentals":
            return (<p>
                {CoursePart.name} 
                {CoursePart.exerciseCount} 
                {CoursePart.description}
                </p>);
        case "Using props to pass data":
            return (<p>
                {CoursePart.name} 
                {CoursePart.exerciseCount} 
                {CoursePart.groupProjectCount}
                </p>);    
        case "Deeper type usage":
            return (<p>
                {CoursePart.name} 
                {CoursePart.exerciseCount} 
                {CoursePart.description} 
                {CoursePart.exerciseSubmissionLink}
                </p>);
        case "MyClass":
            return (<p>
                {CoursePart.name} 
                {CoursePart.exerciseCount} 
                {CoursePart.description} 
                {String(CoursePart.superHero)}
                </p>);
        default:
            return assertNever(CoursePart);
    }
}

export default Part;