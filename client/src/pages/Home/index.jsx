import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import { useAuthDispatch } from '../../utils/auth'

const GET_USER = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`

const Home = () => {
  const { loading, data, error } = useQuery(GET_USER)
  // TODO
  if (error) {
    console.log('err', error);
  }
  if (data) {
    console.log('getUsers', data);
  }

  let userList
  if (!data || loading) {
    userList = <div>loading...</div>
  } else if (data.getUsers.length === 0) {
    userList = <div>no user joined</div>
  } else if (data.getUsers.length > 0) {
    userList = data.getUsers.map(({ username }) => {
      return (
        <div key={username}>
          {username}
        </div>
      )
    })
  }

  return (
    <div>
      {userList}
    </div>
  )
}

export default Home