import { getPriceBySymbol } from './service'

describe('Service', () => {
    describe('getPriceBySymbol', () => {
        it('should throw error if symbol is invalid', async () => {
            await expect(
                getPriceBySymbol('')
            ).rejects.toThrowError('symbol is empty')
        })

        it('should throw error if date is invalid', async () => {
            const notADateObject = {}
            await expect(
                getPriceBySymbol('GOOGLE', notADateObject)
            ).rejects.toThrowError('date is invalid, must be defined and instance of Date')
        })

        it('should return price as number', async () => {
            await expect(getPriceBySymbol('TESLA')).resolves.toEqual(expect.any(Number))
        })

        it('should return same price for the same symbol and date', async () => {
            const today = new Date()
            const todayPrice = await getPriceBySymbol('RBC', today)
            const sameTodayPrice = await getPriceBySymbol('RBC', today)

            expect(todayPrice).toBe(sameTodayPrice)
        })
    })
})
