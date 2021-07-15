# Algorithms

In this task we want to see how you would solve a few algorithmic problems. We know, these kind of tests are somewhat *meh*, but still they sometimes give useful insights into your problem solving skills. For all tasks in this block, try to write the functions as short and elegant as possible. Performance is not relevant here. Make sure linting is fine (`npm run lint` to check, `npm run lint-fix` to fix many linting errors automatically) and that tests are fine (`npm test`).

## nth fibonacci number

Implement the function in `src/nthFibonacciNumber.ts` so that the corresponding tests pass. The function should:

* Yield the nth fibonacci number if given a positive integer. For example:
    * `nthFibonacciNumber(1)` => `1`
    * `nthFibonacciNumber(2)` => `1`
    * `nthFibonacciNumber(3)` => `2`
    * `nthFibonacciNumber(12)` => `144`
* Throw an error if given an invalid input like a negative or non-integer number.

## is power of three

Implement the function in `src/isPowerOfThree.ts` so that the corresponding tests pass. The function should:

* Yield true if given a non-negative power of three, i.e. an integer that can be written as `3^n` for some non-negative integer `n`, for example `1, 3, 27, 81, ...`, else false.
