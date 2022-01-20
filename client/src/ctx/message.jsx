import React, { createContext, useReducer, useContext } from 'react'

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      }
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload
      }
    case 'SET_SELECTED_USER_MSG':
      return {
        ...state,
        selectedUserMsg: action.payload
      }
    default:
      throw new Error(`unknown action type: ${action.type}`)
  }
}

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    users: null
  })
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

const useMessageState = () => useContext(MessageStateContext)
const useMessageDispatch = () => useContext(MessageDispatchContext)

export {
  MessageProvider,
  useMessageState,
  useMessageDispatch
}