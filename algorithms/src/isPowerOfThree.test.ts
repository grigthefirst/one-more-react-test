import { isPowerOfThree as fn } from './isPowerOfThree'

it('detects powers of three', () => {
  expect(fn(1)).toBe(true)
  expect(fn(3)).toBe(true)
  expect(fn(9)).toBe(true)
  expect(fn(27)).toBe(true)
  expect(fn(81)).toBe(true)
  expect(fn(Math.pow(3, 20))).toBe(true)
})

it('detects non powers of three', () => {
  expect(fn(-1)).toBe(false)
  expect(fn(0)).toBe(false)
  expect(fn(2)).toBe(false)
  expect(fn(2.9)).toBe(false)
  expect(fn(3.1)).toBe(false)
  expect(fn(8)).toBe(false)
  expect(fn(Math.pow(3, 20) - 1)).toBe(false)
})
