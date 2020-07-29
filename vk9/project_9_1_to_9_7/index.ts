import express from "express";
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    const weight = req?.query?.weight;
    const height = req?.query?.height;
    const errormessagejson = { error: "malformatted params" };
    if (!weight || !height) {
        res.status(400).json(errormessagejson);
    } else {
        const parsew = +weight,
          parseh = +height;
        if (isNaN(parsew) || isNaN(parseh)) {
            res.status(400).json(errormessagejson);
        } else {
            res.json({
              weight,
              height,
              bmi: calculateBmi(parseh, parsew)
          });
        }
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log("server running on port:", PORT);
});
