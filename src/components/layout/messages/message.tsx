import './message.scss'

import React, {FC} from 'react';
import Icons from "../../../libs/icons";
import { DEFAULT_TIMEOUT_MESSAGE } from '../../../constants/actionTypes';

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

    if (!message.timeout) {
        message.timeout = DEFAULT_TIMEOUT_MESSAGE
    }

    if (message.timeout) {
        setTimeout(handleClose, message.timeout)
    }

    const color = message.type === 'error' ? '#ff0320' : '#3cbdaf';

    return (
        <div className={`message ${message.type}`}>
            <Icons icon="close" className="left-icon" color={color} />
            <div className="message__close-button" onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
                {!disableCloseButton && <Icons icon="close" />}
            </div>
            <p className='message__title'>{message.title}</p>
            <p className='message__content'>{message.content}</p>
        </div>
    )
}

export default (Message)