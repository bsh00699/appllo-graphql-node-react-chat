import React, { createContext, useReducer, useContext } from 'react'
import jwtDecode from 'jwt-decode'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

let user = null
const token = localStorage.getItem('token')
if (token) {
  const decodeToken = jwtDecode(token)
  const { username, exp } = decodeToken
  const expiresAt = new Date(exp * 1000)
  console.log('expiresAt', expiresAt);
  if (new Date() > expiresAt) {
    localStorage.removeItem('token')
  } else {
    user = decodeToken
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {
        ...state,
        user: null
      }
    default:
      throw new Error(`unknown action type: ${action.type}`)
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user // default get localStorage.getItem('token')
  })
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

const useAuthState = () => useContext(AuthStateContext)
const useAuthDispatch = () => useContext(AuthDispatchContext)

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch
}