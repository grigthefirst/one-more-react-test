import { useEffect, useState } from 'react'

export type AsyncDataResult<T> = { type: 'loading' } | { type: 'success'; value: T } | { type: 'error'; error: any }

export function useAsyncData<T>(fn: () => Promise<T>, deps: React.DependencyList): AsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fn()
      .then(result => {
        setData(result)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, deps)
  if (!loading && data !== null) {
    return {
      type: 'success',
      value: data,
    }
  } else if (error) {
    return {
      type: 'error',
      error: error,
    }
  } else {
    return {
      type: 'loading',
    }
  }
}
