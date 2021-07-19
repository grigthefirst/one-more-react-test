import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { LoginScreen } from './screens/LoginScreen'
import { PostDetailsScreen } from './screens/PostDetailsScreen'
import { PostListScreen } from './screens/PostListScreen'

export const App: React.FC = () => {
  const [accessToken, setAccessToken] = React.useState<string | undefined>(undefined)
  if (accessToken) {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <PostListScreen accessToken={accessToken} />} />
          <Route path="/post/:postId" exact render={() => <PostDetailsScreen accessToken={accessToken} />} />
        </Switch>
      </HashRouter>
    )
  } else {
    return <LoginScreen onAccessToken={setAccessToken} />
  }
}
