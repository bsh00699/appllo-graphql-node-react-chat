import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthState } from './auth'

const DynamicRouter = (props) => {
  const { component, authenticated, guest } = props
  const { user } = useAuthState()
  if (authenticated && !user) {
    return <Redirect to='/login' />
  } else if (guest && user) {
    return <Redirect to='/' />
  } else {
    return <Route component={component} {...props} />
  }
}

export default DynamicRouter