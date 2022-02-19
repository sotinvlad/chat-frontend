import { notification } from "antd"


const openNotification = (type = 'info', message, duration = 1) => {
    notification[type]({
      message: 'Уведомление',
      description: message,
      duration: duration
    });
  };

export default openNotification;