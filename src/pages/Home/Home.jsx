/*
-Компонент отрисовывает чат, включая компонент со списком диалогов, компонент с сообщениями диалога, компонент с вводом сообщения
-Отрисовывает имя пользователя, с которым ведется диалог, его онлайн-статус
-Отрисовывает кнопку создания компонента, кнопку "три точки" со всплывающим меню
*/
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';

import './Home.scss';
import '../../styles/layouts/chat.scss';
import ChatInput from '../../components/ChatInput/ChatInput';
import Dialogs from '../../containers/Dialogs';
import Messages from '../../containers/Messages';
import dialogsAPI from '../../utils/api/dialogsAPI';
import getUserStatus from '../../utils/helpers/getUserStatus';
import ModalAddDialog from '../../components/ModalAddDialog/ModalAddDialog';
import dialogsActions from './../../redux/actions/dialogs';
import MessageReceivedSound from './../../assets/MessageReceivedSound.mp3';
import { Popover } from 'antd';
import PopoverOfHomePage from '../../components/PopoverOfHomePage/PopoverOfHomePage';

let dialogId = '';

const Home = ({ currentDialog, userData, updateDialog, socket }) => {
    dialogId = currentDialog._id;
    const MessageReceivedAudio = new Audio(MessageReceivedSound);
    MessageReceivedAudio.volume = 0.1;
    const getStatus = (id) => {
        dialogsAPI.getDialog(id)
        .then(data => {
            updateDialog(data.data);
            const [status, name] = getUserStatus(data.data, userData);
            let interlocutorName = document.getElementById('interlocutorName');
            let interlocutorStatus = document.getElementById('interlocutorStatus');
            if (interlocutorName){
                interlocutorName.innerHTML = name;
                interlocutorStatus.className = `status ${status === true ? 'status--online' : null}`;
                interlocutorStatus.innerHTML = `${status === true ? 'online' : 'offline'}`;
            }
        });
    }

    const [visible, setVisible] = React.useState(false);

    const toggleModal = () => {
        setVisible(v => !v);
      };

    useEffect(() => {
        if (dialogId)
            getStatus(dialogId);
    }, [currentDialog._id]);

    useEffect(() => {
        socket.on('SERVER:UPDATE_STATUS', () => {
            getStatus(dialogId);
        })
        socket.on('SERVER:SEND_MESSAGE', (data) => {
            if(data.user._id.toString() !== userData._id){
                console.log('sound beeping...')
                MessageReceivedAudio.play();
            }
        })
        return () => {
            socket.removeAllListeners('SERVER:UPDATE_STATUS');
            socket.removeAllListeners('SERVER:SEND_MESSAGE');
        }
    }, []);

    return (
        <section className='home'>
            <div className="chat">
                <div className="chat__sidebar">
                    <div className="chat__sidebar-header">
                        <div>
                            <TeamOutlined style={{ fontSize: '23px' }}/>
                            <span>Список диалогов</span>
                        </div>
                        <FormOutlined style={{ fontSize: '20px' }} onClick={toggleModal}/>
                        <ModalAddDialog visible={visible} toggleModal={toggleModal} userData={userData}/>
                    </div>
                    <div className="chat__sidebar-dialogs">
                        <Dialogs />
                    </div>
                </div>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <div className="chat__dialog-header-block"></div>
                        {currentDialog._id ?
                        <div className="chat__dialog-header-status">
                            <span className="chat__dialog-header-status-fullname" id='interlocutorName'></span>
                            <span className="status status--online" id='interlocutorStatus'></span> 
                        </div>: null
                        }
                        <Popover content={<PopoverOfHomePage/>} trigger='click'>
                            <EllipsisOutlined style={{ fontSize: '26px' }}/>
                        </Popover>
                    </div>
                    <div className="chat__dialog-messages">
                        <Messages />
                    </div>
                    {currentDialog._id ? 
                        <div className="chat__dialog-input">
                            <ChatInput />
                        </div> : null
                    }
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    currentDialog: state.dialogs.currentDialog,
    userData: state.user.data,
    socket: state.user.socket,
})

export default connect(mapStateToProps, { ...dialogsActions })(Home);
