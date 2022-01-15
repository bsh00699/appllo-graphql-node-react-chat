import { message } from 'antd';

const ErrorMsg = (props) => {
  const { errorInfo } = props
  const content = JSON.stringify(errorInfo)
  return message.error({
    content,
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  })
}

export default ErrorMsg
