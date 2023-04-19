import './message.scss'

import React, {FC} from 'react';
import Icons from "../../../libs/icons";

interface MessageComponentProps {
    message: {
        title: string,
        content: string,
        type?: string,
        class?: string,
        timeout?: number
    },  
    handleClose?: any,
    disableCloseButton?: boolean,
}

const Message: FC<MessageComponentProps> = ({ message, handleClose = {}, disableCloseButton = false }) => {
    const onClick = () => {
        if (disableCloseButton) {
            return
        }
        handleClose();
    }

    if (message.timeout) {
        setTimeout(handleClose, message.timeout)
    }

    const color = message.type === 'success' ? '#3cbdaf' : '#ff0320'
    const classSel = message.type === 'success' ? 'sel-message-success' : 'sel-message-error'
    
    return (
        <div className={`message ${message.class}`}>
            <Icons icon="close" className="left-icon" color={color} />
            <div className="message__close-button" onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
                {!disableCloseButton && <Icons icon="close" />}
            </div>
            <p className={`message__title ${classSel}`}>{message.title}</p>
            <p className='message__content'>{message.content}</p>
        </div>
    )
}

export default (Message)