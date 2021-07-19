import { css } from 'emotion'
import React, { useState } from 'react'

import { login } from '../../api'
import { baseStyle, colors, paddings } from '../commonStyles'

export interface LoginScreenProps {
  onAccessToken: (accessToken: string) => void
}

export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!userName || !password) {
      //TODO create separate error messages or maybe different ux for form validation
      setError('Please fill username and password')
      return
    }
    const token = await login(userName, password)
    if (token) {
      props.onAccessToken(token)
    } else {
      setError('Invalid credentials')
      return
    }
  }
  //TODO add loading state ux
  return (
    <form
      className={css([rootStyle, baseStyle])}
      onSubmit={event => {
        handleSubmit()
        event.preventDefault()
      }}>
      {error && <div className={errorStyle}>{error}</div>}
      <label className={labelStyle}>
        <b>Username:</b>
        <input
          className={inputStyle}
          type="text"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />
      </label>
      <label className={labelStyle}>
        <b>Password:</b>
        <input
          className={inputStyle}
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <input className={submitStyle} type="submit" value="Login" />
    </form>
  )
}

const rootStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: ${paddings.l};
  box-sizing: border-box;
  justify-content: space-between;
`
const errorStyle = css`
  background-color: ${colors.Error};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${paddings.m};
  box-sizing: border-box;
  margin: ${paddings.m} 0;
`

const labelStyle = css`
  margin: ${paddings.m} 0;
`
const inputStyle = css`
  width: 100%;
  padding: ${paddings.s};
  box-sizing: border-box;
  margin: ${paddings.xs} 0;
`

const submitStyle = css`
  width: 100%;
  background-color: ${colors.Button};
  color: ${colors.White};
  padding: ${paddings.m};
  box-sizing: border-box;
  border: 0;
  margin: ${paddings.m} 0;
  cursor: pointer;
`
