import { nthFibonacciNumber as fn } from './nthFibonacciNumber'

it('calculates correct result', () => {
  expect(fn(1)).toBe(1)
  expect(fn(2)).toBe(1)
  expect(fn(3)).toBe(2)
  expect(fn(4)).toBe(3)
  expect(fn(5)).toBe(5)
  expect(fn(6)).toBe(8)
  expect(fn(7)).toBe(13)
  expect(fn(8)).toBe(21)
  expect(fn(9)).toBe(34)
  expect(fn(10)).toBe(55)
  expect(fn(11)).toBe(89)
  expect(fn(12)).toBe(144)
})

it('throws for invalid inputs', () => {
  expect(() => fn(0)).toThrowError()
  expect(() => fn(1.5)).toThrowError()
})
