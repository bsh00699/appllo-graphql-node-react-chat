import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import Home from './pages/Home/index'
import Login from './pages/Login/index'
import Register from './pages/Register/index'
import ApolloProvider from './ApolloProvider'
import { AuthProvider } from './utils/auth'
import { MessageProvider } from './ctx/message'
import DynamicRoute from './utils/dynamicRoute'
import './App.scss';

const App = () => {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Switch>
              <DynamicRoute path='/' component={Home} exact authenticated />
              <DynamicRoute path='/register' component={Register} guest />
              <DynamicRoute path='/login' component={Login} guest />
            </Switch>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}


export default App;