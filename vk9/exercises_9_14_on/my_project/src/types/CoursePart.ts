interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface Descriptable extends CoursePartBase {
    description: string;
}
  
interface CoursePartOne extends Descriptable {
    name: "Fundamentals";
}
  
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}
  
interface CoursePartThree extends Descriptable {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface TypescriptPart extends Descriptable {
    name: "Typescript fundaments";
    fun: boolean;
}

  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree 
    | TypescriptPart;

