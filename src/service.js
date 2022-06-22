import { isEmptyString, isDate } from './utils.js'

const symbolMap = new Map()

export function getPriceBySymbol (symbol = '', date = new Date()) {
    return new Promise((resolve, reject) => {
        if (isEmptyString(symbol)) {
            reject(new Error('symbol is empty'))
        }

        if (!isDate(date)) {
            reject(new Error('date is invalid, must be defined and instance of Date'))
        }

        const datePriceKey = date.toDateString()
        const datePriceMap = symbolMap.has(symbol) ? symbolMap.get(symbol) : new Map()

        let price
        if (datePriceMap.size > 0 && datePriceMap.has(datePriceKey)) {
            price = datePriceMap.get(datePriceKey)
        } else {
            price = Math.random() * 100
            datePriceMap.set(datePriceKey, price)
            symbolMap.set(symbol, datePriceMap)
        }

        resolve(price)
    })
}
