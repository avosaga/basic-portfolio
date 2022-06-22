import { Stock } from './stock'
import { getPriceBySymbol } from './service'

jest.mock('./service')

describe('Stock', () => {
    it('should return default date and quantity', () => {
        const stock = new Stock('APPLE')

        expect(stock.quantity).toEqual(1)
        expect(stock.purchaseDate.toDateString()).toEqual(new Date().toDateString())
    })

    it('should return price by using default date', () => {
        const stock = new Stock('APPLE')

        stock.getPrice()

        expect(getPriceBySymbol).toHaveBeenCalledWith(stock.symbol, stock.purchaseDate)
    })

    it('should return price by passing date', () => {
        const today = new Date()
        const stock = new Stock('APPLE')

        stock.getPrice(today)

        expect(getPriceBySymbol).toHaveBeenCalledWith(stock.symbol, today)
    })
})
