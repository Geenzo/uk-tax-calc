const reducePersonalAllowance = (salary, allowance) => {
    if(salary >= 100000) {
        let amountAboveThreshold = salary - 100000
        let aboveThresholdPenaltyAmount = amountAboveThreshold / 2   
        let newAllowance = (allowance - aboveThresholdPenaltyAmount) < 0 ? 0 : allowance - aboveThresholdPenaltyAmount 
        return newAllowance  
    }
    return salary
}

const calculateNationalInsurance = (salary, nationalInsuranceBrackets) => {
    let nationalInsuranceBracketsUsed = nationalInsuranceBrackets.filter(brackets => {
        if(salary >= brackets.bracketMin) {
            brackets.taxableNIAmount = {}
            brackets.taxableNIAmount.amountOfNIInThisBracket = (salary - brackets.bracketMin) >= brackets.bracketMax ? brackets.bracketMax : salary - brackets.bracketMin 
            brackets.taxableNIAmount.amountNITaxedInThisBracket =  brackets.taxableNIAmount.amountOfNIInThisBracket * (brackets.NIPercentage / 100)
            return brackets
        }
    })
    
    let totalNationalInsuranceAmount = nationalInsuranceBracketsUsed.reduce((accumulator, NIAmount) => {
        let NIAmountForBracket = (NIAmount.taxableNIAmount ? NIAmount.taxableNIAmount.amountNITaxedInThisBracket : 0)
        return accumulator + NIAmountForBracket
    }, 0)

    let nationalInsuranceValues = {
        "bracketsUsed": nationalInsuranceBracketsUsed,
        "totalNIAmount": totalNationalInsuranceAmount
    }

    return nationalInsuranceValues
    
}

const calcTax = (taxBrackets, salary, taxYear) => {
    let currentTaxYearValues = taxBrackets.find(taxYears => taxYears.taxYear === taxYear)

    // total amount of taxable income after personal allowance
    let taxableIncome = salary - (salary >= 100000 ? reducePersonalAllowance(salary, currentTaxYearValues.allowance) : currentTaxYearValues.allowance)
    
    let bracketsUsed = currentTaxYearValues.taxBrackets.filter(brackets => {
        if(taxableIncome >= brackets.bracketMin) {
            brackets.taxableAmount = {}
            brackets.taxableAmount.amountOfTaxableIncomeInThisBracket = (taxableIncome - brackets.bracketMin) >= brackets.bracketMax ? brackets.bracketMax : taxableIncome - brackets.bracketMin 
            brackets.taxableAmount.amountTaxedInThisBracket =  brackets.taxableAmount.amountOfTaxableIncomeInThisBracket * (brackets.taxRate / 100)
            return brackets
        }
    })

    let nationalInsuranceAmount = calculateNationalInsurance(salary, currentTaxYearValues.nationalInsuranceBrackets) 
    
    console.log(salary)
    // console.log(allowance)
    console.log(taxableIncome)
    // console.log(totalIncomeTaxAmount)
    // console.log(bracketBreakdownOfTown)
    console.log(nationalInsuranceAmount)
    // console.log(totalTaxedNIAndIncome)
    // console.log(netWage)
}

let taxBrackets = [
    {
        "taxYear": "2018/2019",
        "allowance": 11850,
        "taxBrackets": [
            {
                "taxRate": 20,
                "bracketMin": 0,
                "bracketMax": 34500
            },
            {
                "taxRate": 40,
                "bracketMin": 34500,
                "bracketMax": 150000
            },
            {
                "taxRate": 45,
                "bracketMin": 150000,
                "bracketMax": 9999999999
            }
        ],
        "nationalInsuranceBrackets": [
            {
                "name": "Less than £8,424",
                "bracketMin": 0,
                "bracketMax": 8424,
                "NIPercentage": 0
            },
            {
                "name": "£8,424 - £46,350",
                "bracketMin": 8424,
                "bracketMax": 46350,
                "NIPercentage": 12
            },
            {
                "name": "More than £46,350",
                "bracketMin": 46350,
                "bracketMax": 9999999999,
                "NIPercentage": 2
            }
        ]
    }
]

let salary = 27000
let taxYear = "2018/2019"

calcTax(taxBrackets, salary, taxYear)