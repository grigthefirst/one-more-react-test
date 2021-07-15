import { css } from 'emotion'
import React from 'react'

export interface LoginScreenProps {
  onAccessToken: (accessToken: string) => void
}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  return <div className={rootStyle}>TODO</div>
}

const rootStyle = css`
  border: 1px solid black;
`
