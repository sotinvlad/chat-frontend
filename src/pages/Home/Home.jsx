import React from 'react';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';
import './Home.scss';
import '../../styles/layouts/chat.scss';
import ChatInput from '../../components/ChatInput/ChatInput';
import Dialogs from '../../containers/Dialogs';
import Messages from '../../containers/Messages';


const Home = () => {

    return (
        <section className='home'>
            <div className="chat">
                <div className="chat__sidebar">
                    <div className="chat__sidebar-header">
                        <div>
                            <TeamOutlined style={{ fontSize: '23px' }}/>
                            <span>Список диалогов</span>
                        </div>
                        <FormOutlined style={{ fontSize: '20px' }}/>
                    </div>
                    <div className="chat__sidebar-dialogs">
                        <Dialogs />
                    </div>

                </div>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <div className="chat__dialog-header-block"></div>
                        <div className="chat__dialog-header-status">
                            <span className="chat__dialog-header-status-fullname">Jack The Riper</span>
                            <span className="status status--online">онлайн</span>
                        </div>
                        <EllipsisOutlined style={{ fontSize: '26px' }} />

                    </div>
                    <div className="chat__dialog-messages">
                        <Messages />
                    </div>
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Home;
