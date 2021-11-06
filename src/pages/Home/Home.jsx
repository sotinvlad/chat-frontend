import React from 'react';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';
import './Home.scss';
import '../../styles/layouts/chat.scss';
import ChatInput from '../../components/ChatInput/ChatInput';
import Dialogs from '../../containers/Dialogs';
import Messages from '../../components/Messages/Messages';


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
                        <Dialogs
                            items={[

                                {
                                    _id: '3ra0b5144f03552463cfeea5bd1ff512',
                                    user: {
                                        fullname: 'Jack The Friend',
                                        avatar: '',
                                        isOnline: false,
                                        unreaded: 0,
                                    },
                                    lastMessage: 'Я тебе купил таблетку, так что можешь приходить и забирать!',
                                    isMe: true,
                                    isReaded: true,
                                    createdAt: new Date(2021, 10, 3, 11, 35),
                                },
                                {
                                    _id: 1,
                                    user: {
                                        fullname: 'Jack The Riper',
                                        avatar: 'https://sun9-43.userapi.com/s/v1/ig2/mgWIq-bl-taWp9l_DSAijduy8XYWx73es7xELgGV2dStOseDlNzpG2VhK5u9bL1HiHDp3EpsB8p8oQniuqZwfOah.jpg?size=100x100&quality=96&crop=182,322,1193,1193&ava=1',
                                        isOnline: true,
                                        unreaded: 3,
                                    },
                                    lastMessage: 'Hello, this is Jack, call me back later',
                                    isMe: false,
                                    createdAt: new Date(),
                                },
                                {
                                    "_id": "e782dc0c1e09bb65423df52299e82494",
                                    "user": {
                                        "fullname": "Wong Pittman",
                                        "avatar": null,
                                        "isOnline": false,
                                        "unreaded": 0
                                    },
                                    "lastMessage": "Nostrud do dolore sint nostrud. Lorem aliqua magna sunt magna tempor commodo excepteur minim magna ea in deserunt.",
                                    "isMe": false,
                                    "isReaded": true,
                                    "createdAt": "Tue Aug 14 2007 03:55:11 GMT+0400 (Moscow Summer Time)"
                                },
                                {
                                    "_id": "41b50011e686b6cc5bcbf3e79be6662b",
                                    "user": {
                                        "fullname": "Leah Byrd",
                                        "avatar": null,
                                        "isOnline": true,
                                        "unreaded": 0
                                    },
                                    "lastMessage": "Consequat esse qui labore aliqua. Sunt exercitation tempor ipsum dolor reprehenderit.",
                                    "isMe": false,
                                    "isReaded": false,
                                    "createdAt": "Sun Mar 21 1971 04:41:03 GMT+0300 (Moscow Standard Time)"
                                },
                                {
                                    "_id": "af4c6f0c9979b11ad5cd2ddd90d134c4",
                                    "user": {
                                        "fullname": "Mayer Nelson",
                                        "avatar": null,
                                        "isOnline": false,
                                        "unreaded": 0
                                    },
                                    "lastMessage": "Labore exercitation laboris quis laboris commodo dolor non esse. Amet pariatur voluptate quis aliqua id sint amet laborum consequat labore.",
                                    "isMe": false,
                                    "isReaded": true,
                                    "createdAt": "Wed Oct 06 1971 10:26:08 GMT+0300 (Moscow Standard Time)"
                                },
                                {
                                    "_id": "06b7f93ef6ad0b101bc1a1e6f71b94cd",
                                    "user": {
                                        "fullname": "Terra Barron",
                                        "avatar": null,
                                        "isOnline": true,
                                        "unreaded": 0
                                    },
                                    "lastMessage": "Nisi anim dolor quis mollit tempor est. Aliquip sit officia aute voluptate et ad pariatur voluptate occaecat.",
                                    "isMe": true,
                                    "isReaded": true,
                                    "createdAt": "Wed Feb 08 2006 19:59:49 GMT+0300 (Moscow Standard Time)"
                                },
                                {
                                    "_id": "u6hf7f93ef6ad0b101bc1a1e6f71b94cd",
                                    "user": {
                                        "fullname": "Rodriguez Paul",
                                        "avatar": null,
                                        "isOnline": true,
                                        "unreaded": 0
                                    },
                                    "lastMessage": "Deserunt dolore mollit tempor incididunt. Cupidatat laborum et aliqua elit nostrud consectetur incididunt nulla aliquip laborum veniam commodo.",
                                    "isMe": false,
                                    "isReaded": false,
                                    "createdAt": "Wed Jan 20 1993 18:01:43 GMT+0300 (Moscow Standard Time)"
                                }

                            ]} 

                        />
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
                        <Messages items={[]}/>
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
