import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'

import { App } from './App'

it('works', () => {
  render(<App />)
  expect(screen.queryByText('TODO')).toBeNull()
})
