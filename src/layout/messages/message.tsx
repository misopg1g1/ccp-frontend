import './message.scss'
import Icons from "../../libs/icons";
import PropTypes from 'prop-types'

const Message = ({ message , handleClose, disableCloseButton }) => {
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
        <div className={`message ${message.errorClass}`}>
            <Icons icon="close" className="left-icon" color={color} />
            <div className="message__close-button" onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
                {!disableCloseButton && <Icons icon="close" />}
            </div>
            <p className={`message__title ${classSel}`}>{message.title}</p>
            <p className='message__content'>{message.content}</p>
        </div>
    )
}

Message.defaultProps = {
    handleClose: () => {},
    disableCloseButton: false
}

Message.propTypes = {
    message: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        errorClass: PropTypes.string,
        timeout: PropTypes.number
    }).isRequired,
    handleClose: PropTypes.func,
    disableCloseButton: PropTypes.bool
}

export default (Message)