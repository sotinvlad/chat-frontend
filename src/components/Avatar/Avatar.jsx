import React from 'react'
import generateAvatarFromHash from '../../utils/helpers/generateAvatarFromHash';
import './Avatar.scss';

const Avatar = (props) => {
    if (props.user.avatar) {
        return (
            <img
                className='avatar'
                src={props.user.avatar}
                alt={`${props.user.fullname} avatar`}
            />
        )
    } else {
        const [firstColor, secondColor] = generateAvatarFromHash(props.id)
        const firstChar = props.user.fullname[0];
        return (
        <div 
            style={{ 
                background: `linear-gradient(135deg, ${firstColor} 0%, ${secondColor} 96.52%)`, 
            }}
            className='avatar avatar--symbol' 
        >
            {firstChar.toUpperCase()}
        </div>
        );
    }

}

export default Avatar;
