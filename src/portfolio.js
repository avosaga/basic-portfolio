import { isDate } from './utils.js'

export class Portfolio {
    #stocks = []

    add(stock) {
        this.#stocks.push(stock)
        return this
    }

    async profit (from, to) {
        if (!isDate(from) || !isDate(to)) {
            throw new Error('date range not provided, object { from, to } has to be defined')
        }

        const annualizedReturn = []
        let bookValue = 0
        let bookProfit = 0

        for (const stock of this.#stocks) {
            if (stock.purchaseDate >= from && stock.purchaseDate <= to) {
                const quantity = stock.quantity
                const currentPrice = await stock.getPrice(to)
                const purchasePrice = await stock.getPrice()
                const profit = currentPrice - purchasePrice

                annualizedReturn.push({
                    symbol: stock.symbol,
                    currentPrice,
                    purchasePrice,
                    profit,
                    quantity
                })

                bookValue += purchasePrice * quantity
                bookProfit += profit * quantity
            }
        }

        return {
            bookValue,
            bookProfit,
            annualizedReturn
        }
    }
}
