import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home/index'
import Login from './pages/Login/index'
import Register from './pages/Register/index'
import ApolloProvider from './ApolloProvider'
import './App.scss';

const App = () => {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}


export default App;