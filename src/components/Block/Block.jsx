import React from 'react'
import classNames from 'classnames'

import './Block.scss'

export const Block = (props) => {
    return(
        <div className={classNames('block', props.className)}>{props.children}</div>
    )
};

    
