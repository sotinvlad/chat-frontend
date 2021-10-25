import React from 'react';
import Message from '../../components/Message/Message';

import './Home.scss';


const Home = () => {

    return (
        <section className='home'>
            <Message 
                avatar='https://sun9-43.userapi.com/s/v1/ig2/mgWIq-bl-taWp9l_DSAijduy8XYWx73es7xELgGV2dStOseDlNzpG2VhK5u9bL1HiHDp3EpsB8p8oQniuqZwfOah.jpg?size=100x100&quality=96&crop=182,322,1193,1193&ava=1' 
                text='Добрый вечер! Как поживает диспетчер? Добрый вечер! Как поживает диспетчер?' 
                date={new Date('Mon Oct 18 2021 16:37:54')}
                attachments = {[
                    {
                        filename: 'image.jpg',
                        url: 'https://picsum.photos/200/200?random=1'
                    },
                    {
                        filename: 'image.jpg',
                        url: 'https://picsum.photos/200/200?random=2'
                    },
                    {
                        filename: 'image.jpg',
                        url: 'https://picsum.photos/200/200?random=3'
                    }
                ]}
            />
            <Message 
                avatar='https://yt3.ggpht.com/yti/APfAmoGx42Oi3uRR0yiJDhV8sZBeRDUi6cmDG01He3_4=s88-c-k-c0x00ffffff-no-rj-mo' 
                text='Неплохо поживает!' 
                date={new Date('Mon Oct 18 2021 16:47:54')}
                isMe={true}
                isReaded={false}
            />
        </section>
    )
}

export default Home;
