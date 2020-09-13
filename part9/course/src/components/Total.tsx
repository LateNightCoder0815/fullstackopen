import React from 'react';

interface TotalProps {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Total: React.FC<TotalProps> = ({ courseParts }) => (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  );

export default Total;