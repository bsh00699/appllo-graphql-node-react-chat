import { gql, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import { message } from 'antd';
import { useWindowSize } from '../../utils/index'
import { useMessageDispatch } from '../../ctx/message'
import { useAuthState } from '../../utils/auth'
import Users from './Users'
import Messages from './Messages'

import './index.scss';
import Background from '../../images/home.webp';

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid content from to createdAt
    }
  }
`

const Home = () => {
  const { width, height } = useWindowSize()
  const dispatch = useMessageDispatch()
  const { user: loginUser } = useAuthState()
  const { data: msgData, error: msgErr } = useSubscription(NEW_MESSAGE)

  useEffect(() => {
    if (msgData) {
      const message = msgData.newMessage
      const { to, from } = message
      const targetUser = to === loginUser.username ? from : to
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          message,
          selectedUser: targetUser,
        }
      })
    }
    if (msgErr) {
      const content = JSON.stringify(msgErr)
      message.error({
        content,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
  }, [msgData, msgErr])
  return (
    <div className='home-app'
      style={{
        height,
        width,
        backgroundImage: `url(${Background})`
      }}
    >
      <div className='chat-box'>
        <Users />
        <Messages />
      </div>
    </div>
  )
}

export default Home