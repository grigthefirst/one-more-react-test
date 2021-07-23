import { useEffect, useState } from 'react'

export type AsyncDataResult<T> = { type: 'loading' } | { type: 'success'; value: T } | { type: 'error'; error: any }

export function useAsyncData<T>(fn: () => Promise<T>, deps: React.DependencyList): AsyncDataResult<T> {
  const [result, setResult] = useState<AsyncDataResult<T>>({ type: 'loading' })
  useEffect(() => {
    if (result.type !== 'loading') {
      setResult({ type: 'loading' })
    }
    fn()
      .then(data => {
        setResult({ type: 'success', value: data })
      })
      .catch(err => {
        setResult({ type: 'error', error: err })
      })
  }, deps)
  return result
}
