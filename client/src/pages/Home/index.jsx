import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { Input, Image, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import { useWindowSize } from '../../utils/index'
import { useAuthDispatch } from '../../utils/auth'
import Users from './Users'
import Messages from './Messages'

import './index.scss';
import Background from '../../images/home.webp';


const Home = () => {
  const { width, height } = useWindowSize()
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