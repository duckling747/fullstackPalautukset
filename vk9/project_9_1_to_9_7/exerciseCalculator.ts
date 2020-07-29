
const avg = (values: Array<number>): number => {
    let sum = 0
    for (let i = 0; i < values.length; ++i)
        sum += values[i]
    return sum / values.length
}

const countTrainingDays = (values: Array<number>): number => {
    let trainingdays = 0
    for (let i = 0; i < values.length; ++i)
        if (values[i]) ++trainingdays
    return trainingdays
}

const rateMe = (avg: number, target: number): number => {
    if (avg >= target - 0.01) {
        return 3
    } else if (avg >= target - 0.1) {
        return 2
    } else {
        return 1
    }
}

const textRate = (rating: number): string => {
    switch (rating) {
        case 3: return "excellent, keep going"
        case 2: return "not too bad but could be better"
        case 1: return "no good, try harder"
        default: throw new Error("invalid rating arg")
    }
}

interface exerciseSummary {
    days: number,
    trainingDays: number,
    target: number,
    avg: number,
    targetReached: boolean,
    grade: number,
    explanation: string
}

const calculateExercises = (dailyHours: Array<number>, target: number):
  exerciseSummary => {
    const average = avg(dailyHours)
    const rating = rateMe(average, target)
    return {
        days: dailyHours.length,
        trainingDays: countTrainingDays(dailyHours),
        target: target,
        avg: average,
        targetReached: average >= target,
        grade: rating,
        explanation: textRate(rating)
    }
}

const [target, ...dailyHours] = process.argv.slice(2).map(Number)

const errormessage = "give me a number! (bad args)"

if (isNaN(target)) throw new Error(errormessage)
for (let input of dailyHours) if (isNaN(input))
    throw new Error(errormessage)

console.log(calculateExercises(dailyHours, target))
