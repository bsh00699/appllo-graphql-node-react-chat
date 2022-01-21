import { gql, useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';
import { useMessageState, useMessageDispatch } from '../../ctx/message'
import MessageDetails from './MessageDetails'
import './index.scss';
import { useWindowSize } from '../../utils/index'


const GET_MESSAGES = gql`
  query getMessage($from: String!) {
    getMessage(from: $from) {
      uuid content from to createdAt
    }
  }
`

const Messages = (props) => {
  const { width, height } = useWindowSize()
  const dispatch = useMessageDispatch()
  const { users, selectedUser, selectedUserMsg } = useMessageState()
  const [getMessage, { loading }] = useLazyQuery(GET_MESSAGES, {
    onCompleted: (res) => {
      dispatch({ type: 'SET_SELECTED_USER_MSG', payload: res.getMessage })
    },
    onError: (err) => {
      const content = JSON.stringify(err.graphQLErrors[0].extensions.error)
      message.error({
        content,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
  })

  useEffect(() => {
    if (selectedUser) {
      // get messages
      getMessage({
        variables: {
          from: selectedUser
        }
      })
    }
  }, [selectedUser])

  return (
    <div className='messages-content' style={{ width: `${Math.floor(width * 0.55)}px` }}>
      {
        loading
          ? <div>loading</div>
          : selectedUserMsg
            ? selectedUserMsg.map((message, index) => {
              const { content, uuid } = message
              return <MessageDetails key={uuid} message={message} />
            })
            : <div>Please select a friend</div>
      }
    </div>
  )
}

export default Messages