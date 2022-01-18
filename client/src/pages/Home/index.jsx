import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Input, Image, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import { useWindowSize } from '../../utils/index'
import { useAuthDispatch } from '../../utils/auth'
import './index.scss';
import Background from '../../images/home.webp';

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
const GET_MESSAGES = gql`
  query getMessage($from: String!) {
    getMessage(from: $from) {
      uuid content from to createdAt
    }
  }
`

const Home = () => {
  const windowSize = useWindowSize()
  const { loading, data, error } = useQuery(GET_USER)
  const [getMessage, { loading: msgLoading, data: msgData, error: msgErr }] = useLazyQuery(GET_MESSAGES)
  const [selectedUser, setSelectedUser] = useState(null)

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
  const handleSelectUser = useCallback((username) => {
    return () => {
      setSelectedUser(username)
    }
  }, [])

  // TODO
  if (error) {
    console.log('err', error);
  }
  if (data) {
    console.log('getUsers', data);
  }

  if (msgErr) {
    console.log('msgErr', msgErr);
  }
  if (msgData) {
    console.log('getMessage', msgData);
  }

  let userList = null
  if (!data || loading) {
    userList = <div>loading...</div>
  } else if (data.getUsers.length === 0) {
    userList = <div>no user joined</div>
  } else if (data.getUsers.length > 0) {
    userList = data.getUsers.map((user, index) => {
      const { username, imageUrl, latestMessage = null } = user
      return (
        <div className='user-block' key={index} onClick={handleSelectUser(username)}>
          <Image className='head-image' src={imageUrl} width={50} height={50} style={{ objectFit: 'cover' }} />
          <div className=''>
            <p>{username}</p>
            <p>
              {
                latestMessage ? latestMessage.content : ''
              }
            </p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='home-app'
      style={{
        height: windowSize.height,
        width: windowSize.width,
        backgroundImage: `url(${Background})`
      }}
    >
      <div className='chat-box'>
        <div className='users-content'>
          {userList}
        </div>
        <div className='messages-content'>

        </div>
      </div>
    </div>
  )
}

export default Home