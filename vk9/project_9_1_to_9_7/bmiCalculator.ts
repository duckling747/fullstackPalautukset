

// Map retains insertion order
const textMode = new Map<number, string>()
textMode.set(40, "Obese Class III (Very severely obese) ")
textMode.set(35, "Obese Class II (Severely obese) ")
textMode.set(30, "Obese Class I (Moderately obese) ")
textMode.set(25, "Overweight")
textMode.set(18.5, "Normal (healthy weight) ")
textMode.set(16, "Underweight")
textMode.set(15, "Severely underweight ")
textMode.set(Number.MIN_VALUE, "Very severely underweight")



const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = mass / (height*10**(-2))**2
    for (let [key, value] of textMode)
        if (bmi >= key) return value
}

console.log(calculateBmi(180, 74))

