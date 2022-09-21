import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { createFromIconfontCN, EditOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Input, message, Popover, Upload } from 'antd';
import { useMessageState, useMessageDispatch } from '../../ctx/message'
import { useAuthDispatch } from '../../utils/auth'
import MessageDetails from './MessageDetails'
import './index.scss';
import { useWindowSize } from '../../utils/index'

const { TextArea } = Input;

const GET_MESSAGES = gql`
  query getMessage($from: String!) {
    getMessage(from: $from) {
      uuid content from to createdAt
    }
  }
`

const SEND_MESSAGES = gql`
  mutation sendMessage($to: String! $content: String!) {
    sendMessage(to: $to content: $content) {
      uuid content from to createdAt
    }
  }
`

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})


const SettingOpt = () => {
  const dispatch = useAuthDispatch()

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    window.location.href = '/login'
  }, [])

  const props = {
    name: 'file',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div className='logout' onClick={logout}>
        <IconFont type="icon-tuichu" style={{ marginRight: 5 }} />
        退出登录
      </div>
      <div className='edit-head-img'>
        <Upload {...props}>
          <EditOutlined style={{ marginRight: 5 }} />
          编辑头像
        </Upload>
      </div>
    </div>
  )
}

const SettingIcon = () => {
  return (
    <>
      <IconFont type="icon-tuichu" style={{ color: '#5d5d5d', cursor: 'pointer' }} />
      {/* <FormOutlined style={{ color: '#5d5d5d', marginTop: 25 }} /> */}
    </>
  )
}

const Messages = (props) => {
  const { width, height } = useWindowSize()
  const dispatch = useMessageDispatch()
  const { users, selectedUser, selectedUserMsg } = useMessageState()
  const [content, setContent] = useState('')
  const inputRef = React.useRef(null);

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

  const [sendMessage, { loading: sendMsgLoading }] = useMutation(SEND_MESSAGES, {
    onCompleted: (res) => {
      // Depends on publish subscribe，cancel here
      // dispatch({ type: 'ADD_MESSAGE', payload: res.sendMessage })
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

  useEffect(() => {
    if (selectedUser) {
      getMessage({
        variables: {
          from: selectedUser.username
        }
      })
    }
  }, [selectedUser])

  const handleFocus = useCallback(() => {
    if (content.trim()) return
    if (inputRef && inputRef.current?.focus) {
      inputRef.current.focus({
        cursor: 'start'
      });
    }
  }, [inputRef, content])

  const handOnChangeMessage = useCallback(({ target: { value } }) => {
    setContent(value)
  }, [])

  const handleSendMessage = useCallback(() => {
    if (content.trim() === '' || !selectedUser?.username) {
      setContent('')
      return
    }
    setContent('')
    sendMessage({
      variables: {
        to: selectedUser?.username,
        content,
      }
    })
  }, [selectedUser, content])

  return (
    <div className='messages-content' style={{ width: `${Math.floor(width * 0.55)}px` }}>
      <div className='header'>
        <div className='username'>{selectedUser?.username}</div>
        <Popover content={<SettingOpt />}
          title="" trigger="click" placement="bottomRight"
          style={{ width: 100 }}
        >
          <div className='setting'>...</div>
        </Popover>
      </div>
      <div className='msg-display-area'>
        {
          loading
            ? <div>loading</div>
            : selectedUserMsg
              ? selectedUserMsg.map((message) => {
                const { uuid } = message
                return <MessageDetails key={uuid} message={message} />
              })
              : <div className='select-user-tip'>请选择一个好友</div>
        }
      </div>
      <div className='input-msg' onClick={handleFocus}>
        <TextArea
          ref={inputRef}
          bordered={false}
          value={content}
          onChange={handOnChangeMessage}
          placeholder='请输入消息'
          autoSize={{ minRows: 5, maxRows: 5 }}
          onPressEnter={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default Messages