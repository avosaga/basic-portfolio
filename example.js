import { Portfolio, Stock } from './dist/index.js'

async function example () {
    const portfolio = new Portfolio()
    portfolio
        .add(new Stock('GOOGLE', new Date(2022, 1, 1)))
        .add(new Stock('TESLA', new Date(2022, 2, 2), 10))
        .add(new Stock('APPLE', new Date(2021, 11, 1)))

    const from = new Date(2021, 0, 1)
    const to = new Date(2022, 3, 1)
    const { bookProfit, annualizedReturn, bookValue } = await portfolio.profit(from, to)

    console.log(`Date Rage: ${from.toDateString()} - ${to.toDateString()}`)
    console.log('Book Value:', bookValue)
    console.log('Book Profit:', bookProfit)
    console.table(annualizedReturn)
}

example()
