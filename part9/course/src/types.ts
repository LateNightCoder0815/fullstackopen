// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase{
    description: string;
}

interface CoursePartOne extends CoursePartBaseDescription {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface OwnCoursePart extends CoursePartBaseDescription {
    name: "MyClass";
    superHero: boolean;
}
    
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | OwnCoursePart;