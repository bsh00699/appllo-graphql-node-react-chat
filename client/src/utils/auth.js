import React, { createContext, useReducer, useContext } from 'react'
import jwtDecode from 'jwt-decode'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

let user = null
const token = localStorage.getItem('token')
const gravatar = localStorage.getItem('gravatar')
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
if (gravatar) {
  user.imageUrl = gravatar
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { token, imageUrl } = action.payload
      localStorage.setItem('token', token)
      localStorage.setItem('gravatar', imageUrl)
      const userTemp = jwtDecode(token)
      userTemp.imageUrl = imageUrl
      return {
        ...state,
        user: userTemp
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      localStorage.removeItem('gravatar')
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