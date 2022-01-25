import { gql, useQuery } from '@apollo/client';
import React, { useCallback } from 'react';
import { Image, message } from 'antd';
import { useMessageState, useMessageDispatch } from '../../ctx/message'
import gravatar from '../../images/gravatar.png';
import './index.scss';

const GET_USER = gql`
  query getUsers {
    getUsers {
      username
      imageUrl
      createdAt
      latestMessage {
        uuid content from to createdAt
      }
    }
  }
`
const Users = (props) => {
  const dispatch = useMessageDispatch()
  const { users, selectedUser } = useMessageState()
  const { loading } = useQuery(GET_USER, {
    onCompleted: (res) => {
      dispatch({ type: 'SET_USERS', payload: res.getUsers })
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

  const handleSelectUser = useCallback((username, imageUrl) => {
    return () => {
      dispatch({
        type: 'SET_SELECTED_USER', payload: {
          username, imageUrl
        }
      })
    }
  }, [])

  let userList = null
  if (!users || loading) {
    userList = <div>loading...</div>
  } else if (users.length === 0) {
    userList = <div>no user joined</div>
  } else if (users.length > 0) {
    userList = users.map((user, index) => {
      const { username, imageUrl, latestMessage = null } = user
      const isSelected = selectedUser?.username === username
      return (
        <div className='user-block' key={username}
          style={isSelected ? { backgroundColor: '#f5f5f5' } : {}}
          onClick={handleSelectUser(username, imageUrl)}>
          <Image className='head-image' src={imageUrl || gravatar} width={50} height={50} style={{ objectFit: 'cover' }} />
          <div className='username-msg-tip'>
            <div className='username'>{username}</div>
            <div className='msg-tip'>
              {
                latestMessage ? latestMessage.content : ''
              }
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='users-content'>
      {userList}
    </div>
  )
}

export default Users