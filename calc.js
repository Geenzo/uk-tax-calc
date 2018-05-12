const reducePersonalAllowance = (salary, allowance) => {
    if(salary >= 100000) {
        let amountAboveThreshold = salary - 100000
        let aboveThresholdPenaltyAmount = amountAboveThreshold / 2   
        let newAllowance = (allowance - aboveThresholdPenaltyAmount) < 0 ? 0 : allowance - aboveThresholdPenaltyAmount 
        return newAllowance  
    }
    return salary
}

const calcTax = (taxBrackets, salary, taxYear) => {
    let currentTaxYearValues = taxBrackets.find(taxYears => taxYears.taxYear === taxYear)
    
    // total amount of taxable income after personal allowance
    let taxableIncome = salary - (salary >= 100000 ? reducePersonalAllowance(salary, currentTaxYearValues.allowance) : currentTaxYearValues.allowance)
    
    console.log(taxableIncome)
    
    let bracketsUsed = currentTaxYearValues.taxBrackets.filter(brackets => {
        if(taxableIncome >= brackets.bracketMin) {
            brackets.taxableAmount = {}
            brackets.taxableAmount.amountOfTaxableIncomeInThisBracket = (taxableIncome - brackets.bracketMin) >= brackets.bracketMax ? brackets.bracketMax : taxableIncome - brackets.bracketMin 
            brackets.taxableAmount.amountTaxedInThisBracket =  brackets.taxableAmount.amountOfTaxableIncomeInThisBracket * (brackets.taxRate / 100)
            return brackets
        }
    })

    console.log(bracketsUsed)
    
    console.log(salary)
    
    console.log('logging')
    
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
        ]
    }
]

let salary = 160000
let taxYear = "2018/2019"

calcTax(taxBrackets, salary, taxYear)