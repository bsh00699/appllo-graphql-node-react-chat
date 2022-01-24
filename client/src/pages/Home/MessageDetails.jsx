import { Tooltip, Image } from 'antd';
import React from 'react';
// import moment from 'moment'
import { useMessageState } from '../../ctx/message'
import { useAuthState } from '../../utils/auth'
import gravatar from '../../images/gravatar.png';



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

const UserImage = (props) => {
  const { imageUrl } = props
  return (
    <div className='user-image'>
      <Image className='img' src={imageUrl} width={30} height={30} style={{ objectFit: 'cover' }} />
    </div>
  )
}

const MessageDetails = (props) => {
  const { user } = useAuthState()
  const { selectedUser } = useMessageState()
  const { message } = props
  const { from, content, createdAt } = message
  const sendUser = user.username === from

  return (
    <div className='msg-details' style={
      sendUser ? { ...sendFlexDir } : { ...recipientFlexDir }
    }>
      {/* <Tooltip placement={sendUser ? 'topRight' : 'topLeft'} title={moment(createdAt).format('h:mm')}> */}
      { !sendUser ? <UserImage imageUrl={selectedUser?.imageUrl} /> : null}
      <div className='msg-row' style={
        sendUser ? { ...sendStyle } : { ...recipientStyle }
      }>
        {content}
      </div>
      { sendUser ? <UserImage imageUrl={user.imageUrl || gravatar} /> : null}
      {/* </Tooltip> */}
    </div>
  )
}

export default MessageDetails