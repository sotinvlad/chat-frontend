import React from 'react';
import Dialogs from '../../components/Dialogs/Dialogs';
import Message from '../../components/Message/Message';

import './Home.scss';


const Home = () => {

    return (
        <section className='home'>
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

                    ]}
                />

            <Message 
                avatar='https://sun9-43.userapi.com/s/v1/ig2/mgWIq-bl-taWp9l_DSAijduy8XYWx73es7xELgGV2dStOseDlNzpG2VhK5u9bL1HiHDp3EpsB8p8oQniuqZwfOah.jpg?size=100x100&quality=96&crop=182,322,1193,1193&ava=1' 
                date={new Date('Mon Oct 18 2021 16:37:54')}
                audio='https://notificationsounds.com//storage/sounds/file-sounds-1202-pick-me-up-2.mp3'
            />
            {/* <Message 
                avatar='https://yt3.ggpht.com/yti/APfAmoGx42Oi3uRR0yiJDhV8sZBeRDUi6cmDG01He3_4=s88-c-k-c0x00ffffff-no-rj-mo' 
                text='Неплохо поживает!' 
                date={new Date('Mon Oct 18 2021 16:47:54')}
                isMe={true}
                isReaded={true}
            />
           
            <Message 
                avatar='https://sun9-43.userapi.com/s/v1/ig2/mgWIq-bl-taWp9l_DSAijduy8XYWx73es7xELgGV2dStOseDlNzpG2VhK5u9bL1HiHDp3EpsB8p8oQniuqZwfOah.jpg?size=100x100&quality=96&crop=182,322,1193,1193&ava=1' 
                date={new Date('Mon Oct 18 2021 16:37:54')}
                attachments = {[
                    {
                        filename: 'image.jpg',
                        url: 'https://picsum.photos/200/200?random=1'
                    }
                ]}
            />

             <Message 
                avatar='https://sun9-43.userapi.com/s/v1/ig2/mgWIq-bl-taWp9l_DSAijduy8XYWx73es7xELgGV2dStOseDlNzpG2VhK5u9bL1HiHDp3EpsB8p8oQniuqZwfOah.jpg?size=100x100&quality=96&crop=182,322,1193,1193&ava=1' 
                isTyping
            /> */}
        </section>
    )
}

export default Home;
