import { gql, useMutation } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../utils/index'
import './index.scss';
import Background from '../../images/chat.jpg';


const REGISTER_USER = gql`
  mutation register($username: String! $email: String! $password: String! $confirmPassword: String!) {
    register(username: $username email: $email password: $password confirmPassword: $confirmPassword) {
      username
      email
      createdAt
    }
  }
`

const Register = (props) => {
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, res) => props.history.push('/login'),
    onError: (err) => {
      const content = JSON.stringify(err.graphQLErrors[0].extensions.error)
      message.error({
        content,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    },
  });

  const windowSize = useWindowSize()
  const onFinish = (values) => {
    registerUser({
      variables: {
        ...values
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='register-app'
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input style={{ width: 280 }} />
            </Form.Item>
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
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password style={{ width: 280 }} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" style={{ width: 280 }}>
                {loading ? 'Loading...' : 'Register'}
              </Button>
              <div className='tip'>
                If you have an account <Link to='/login'><span className='link'>Login now!</span></Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register;