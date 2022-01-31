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
      localStorage.setItem('selectedUser', JSON.stringify(action.payload))
      return {
        ...state,
        selectedUser: action.payload
      }
    case 'SET_SELECTED_USER_MSG':
      return {
        ...state,
        selectedUserMsg: action.payload
      }
    case 'ADD_MESSAGE':
      const { message, selectedUser } = action.payload
      const prevMsgList = state.selectedUserMsg
      const users = state.users
      // 1.update selected user latestMessage
      // 2.update selectedUserMsg
      const usersTemp = users.reduce((prev, curr) => {
        let { username, imageUrl, latestMessage } = curr
        if (selectedUser === username) latestMessage = message
        return [
          ...prev,
          { username, imageUrl, latestMessage }
        ]
      }, [])
      return {
        ...state,
        selectedUserMsg: [message, ...prevMsgList],
        users: usersTemp
      }
    default:
      throw new Error(`unknown action type: ${action.type}`)
  }
}

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    users: [],
    selectedUser: JSON.parse(localStorage.getItem('selectedUser')) || null,
    selectedUserMsg: []
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