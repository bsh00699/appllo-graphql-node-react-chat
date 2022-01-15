import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useWindowSize } from '../../utils/index'
import './index.scss';
import Background from '../../images/chat.jpg';

const LOGIN_USER = gql`
  query login($username: String! $password: String!) {
    login(username: $username password: $password) {
      username
      email
      createdAt
      token
    }
  }
`

const Login = (props) => {
  const windowSize = useWindowSize()
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (res) => {
      const { token } = res.login
      // localStorage
      localStorage.setItem('token', token)
      props.history.push('/')
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
  });

  const onFinish = (values) => {
    loginUser({
      variables: {
        ...values
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login-app'
      style={{
        height: windowSize.height,
        width: windowSize.width,
        backgroundImage: `url(${Background})`
      }}
    >
      <div className='user-input-content'>
        <div className='form-block'>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input style={{ width: 280 }} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password style={{ width: 280 }} />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox><span style={{ color: '#fafafa' }}>Remember me</span></Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" style={{ width: 280 }}>
                {loading ? 'Loading...' : 'Login'}
              </Button>
              <div className='tip'>
                If you don't have an account <Link to='/register'>
                  <span className='link'>Register now!</span>
                </Link>
              </div>
              <div></div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}


export default Login;