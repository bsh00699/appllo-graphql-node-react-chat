import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Input, Image, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import { useWindowSize } from '../../utils/index'
import { useAuthDispatch } from '../../utils/auth'
import Users from './Users'
import Messages from './Messages'

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

  return (
    <div className='home-app'
      style={{
        height: windowSize.height,
        width: windowSize.width,
        backgroundImage: `url(${Background})`
      }}
    >
      <div className='chat-box'>
        <Users />
        <Messages />
        {/* <div className='messages-content'>
          {

          }
        </div> */}
      </div>
    </div>
  )
}

export default Home