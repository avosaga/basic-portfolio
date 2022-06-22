import { getPriceBySymbol } from './service.js'

export class Stock {
    #symbol
    #purchaseDate
    #quantity

    constructor (symbol, purchaseDate = new Date(), quantity = 1) {
        this.#symbol = symbol
        this.#purchaseDate = purchaseDate
        this.#quantity = quantity
    }

    get purchaseDate () {
        return this.#purchaseDate
    }

    get quantity () {
        return this.#quantity
    }

    get symbol () {
        return this.#symbol
    }

    async getPrice (date = this.#purchaseDate) {
        return await getPriceBySymbol(this.#symbol, date)
    }
}
