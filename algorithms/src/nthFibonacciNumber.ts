export function nthFibonacciNumber(n: number): number {
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error('Invalid parameter')
  } else if (n === 1) {
    return 1
  }

  let previous = 0
  let current = 1

  for (let i = 2; i <= n; i++) {
    const newCurrent = previous + current
    previous = current
    current = newCurrent
  }

  return current
}
