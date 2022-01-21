import { Tooltip } from 'antd';
import React from 'react';
import moment from 'moment'
import { useAuthState } from '../../utils/auth'

const sendStyle = {
  backgroundColor: '#1890ff40',
  marginLeft: '10%' // left space
}
const recipientStyle = {
  backgroundColor: '#ffffff',
  marginRight: '10%' // right space
}
const sendFlexDir = {
  justifyContent: 'flex-end'
}
const recipientFlexDir = {
  justifyContent: 'flex-start'
}

const MessageDetails = (props) => {
  const { user } = useAuthState()
  console.log('user==', user);
  const { message } = props
  const { from, content, createdAt } = message
  const sendUser = user.username === from
  console.log('message', message);

  return (
    <div className='msg-details' style={
      sendUser ? { ...sendFlexDir } : { ...recipientFlexDir }
    }>
      {/* <Tooltip placement={sendUser ? 'topRight' : 'topLeft'} title={moment(createdAt).format('h:mm')}> */}
      <div className='msg-row' style={
        sendUser ? { ...sendStyle } : { ...recipientStyle }
      }>
        {content}
      </div>
      {/* </Tooltip> */}
    </div>
  )
}

export default MessageDetails