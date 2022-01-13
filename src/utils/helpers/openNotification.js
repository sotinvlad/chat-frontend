import { notification } from "antd"


const openNotification = (type = 'info', message) => {
    notification[type]({
      message: 'Уведомление',
      description: message,
      duration: 1
    });
  };

export default openNotification;