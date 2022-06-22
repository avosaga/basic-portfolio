import { Portfolio } from './portfolio'
import { Stock } from './stock'
import { getPriceBySymbol } from './service'

jest.mock('./service', () => ({
    getPriceBySymbol: jest.fn()
}))

describe('Portfolio', () => {
    it('should throw error if date range not provided', async () => {
        const portfolio = new Portfolio()

        await expect(
            portfolio.profit()
        ).rejects.toThrowError('date range not provided, object { from, to } has to be defined')
    })

    it('should return default values when no stocks are defined', async () => {
        const portfolio = new Portfolio()

        const { bookValue, annualizedReturn, bookProfit } = await portfolio.profit(
            new Date(2022, 0, 1),
            new Date(2022, 5, 1)
        )

        expect(bookValue).toBe(0)
        expect(bookProfit).toBe(0)
        expect(annualizedReturn).toEqual([])
    })

    it('should return calculated values when stocks are provided', async () => {
        const google = 'GOOGLE'
        const apple = 'APPLE'
        const tesla = 'TESLA'
        const googlePrice = 1
        const applePrice = 2
        const teslaPrice = 3

        getPriceBySymbol.mockImplementation((symbol) => {
            switch (symbol) {
            case google: return Promise.resolve(googlePrice)
            case apple: return Promise.resolve(applePrice)
            case tesla: return Promise.resolve(teslaPrice)
            }
        })
        const portfolio = new Portfolio()
        portfolio
            .add(new Stock(google, new Date(2022, 1, 1)))
            .add(new Stock(apple, new Date(2022, 2, 2)))
            .add(new Stock(tesla, new Date(2021, 11, 1)))

        const { bookValue, annualizedReturn, bookProfit } = await portfolio.profit(
            new Date(2021, 0, 1),
            new Date(2022, 5, 1)
        )

        expect(bookValue).toEqual(googlePrice + applePrice + teslaPrice)
        expect(bookProfit).toEqual(0)
        expect(annualizedReturn).toMatchSnapshot()
    })
})
