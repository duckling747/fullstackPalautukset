import express from "express";
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";

const app = express();

const erroneousParametersJSON = { error: "parameters missing" },
  erroneousFormattingJSON = { error: "malformatted parameters" };


app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    const weight = req?.query?.weight;
    const height = req?.query?.height;
    if (!weight || !height) {
        res.status(400).json(erroneousParametersJSON);
    } else {
        const parsew = +weight,
          parseh = +height;
        if (isNaN(parsew) || isNaN(parseh)) {
            res.status(400).json(erroneousFormattingJSON);
        } else {
            res.json({
              weight,
              height,
              bmi: calculateBmi(parseh, parsew)
          });
        }
    }
});

app.use(express.json());

interface Bodystuff {
    target: number,
    daily_exercises: Array<number>
}


app.post("/exercises", (request, response) => {
    // Casting does not yet guarantee that the fields are numbers
    const body: Bodystuff = request.body as Bodystuff;

    // Do some typechecking etc. to make sure
    if (!body.target || !body.daily_exercises)
      response.json(erroneousParametersJSON);
    const { target, daily_exercises } = body;
    if (typeof target !== "number" || daily_exercises.constructor !== Array)
      response.json(erroneousFormattingJSON);
    for (const num of daily_exercises)
      if (typeof num !== "number") response.json(erroneousFormattingJSON);

    // exercise calculator already returns appropriate JSON
    response.json(
      calculateExercises(daily_exercises, target)
    );
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log("server running on port:", PORT);
});
