export const isUndefined = (value) => typeof value === 'undefined'
export const isNull = (value) => value === null
export const isUndefinedOrNull = (value) => isUndefined(value) || isNull(value)
export const isString = (value) => typeof value === 'string'
export const isEmptyString = (value) => isString(value) && value.length === 0
export const isDate = (value) => !isUndefinedOrNull(value) && value instanceof Date
