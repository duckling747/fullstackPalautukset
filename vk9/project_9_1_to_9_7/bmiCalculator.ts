

// Map retains insertion order
const textMode = new Map<number, string>();
textMode.set(40, "Obese Class III (Very severely obese) ");
textMode.set(35, "Obese Class II (Severely obese) ");
textMode.set(30, "Obese Class I (Moderately obese) ");
textMode.set(25, "Overweight");
textMode.set(18.5, "Normal (healthy weight) ");
textMode.set(16, "Underweight");
textMode.set(15, "Severely underweight ");
textMode.set(Number.MIN_VALUE, "Very severely underweight");


export const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = mass / (height*10**(-2))**2;
    for (const [key, value] of textMode)
        if (bmi >= key) return value;
    throw new Error("Weird error: bmi is less than Number.MIN_VALUE!");
};

if (!module.parent) {

    const argv = process.argv.slice(2).map(Number);
    
    const emessage = "give me a number! (bad args)";

    for (const input of argv)
        if (isNaN(input)) throw new Error(emessage);

    console.log(calculateBmi(argv[0], argv[1]));
}
