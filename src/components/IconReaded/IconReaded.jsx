import React from 'react'
import readed from './../../assets/img/readed.svg'
import noreaded from './../../assets/img/noreaded.svg'

const IconReaded = (props) => 
    props.isMe ? props.isReaded  ? (
        <img 
            src={readed} 
            className='message__readed'
            alt='Readed icon'
        /> 
    ) : ( 
        <img 
            src={noreaded} 
            className='message__readed'
            alt='No readed icon'
        />
    ) : null
    

export default IconReaded;
