import './error.scss'
import Icons from "../../libs/icons";
import PropTypes from 'prop-types'

const Error = ({ error , handleClose, disableCloseButton }) => {
    console.log('error', error)
    const onClick = () => {
        if (disableCloseButton) {
            return
        }
        handleClose();
    }

    if (error.timeout) {
        setTimeout(handleClose, error.timeout)
    }

    const color = error.errorClass === 'success' ? '#3cbdaf' : '#ff0320'
    const classSel = error.errorClass === 'success' ? 'sel-message-success' : 'sel-message-error'
    
    return (
        <div className={`error-message ${error.errorClass}`}>
            <Icons icon="close" className="left-icon" color={color} />
            <div className="error-message__close-button" onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
                {!disableCloseButton && <Icons icon="close" />}
            </div>
            <p className={`error-message__title ${classSel}`}>{error.title}</p>
            <p className='error-message__content'>{error.content}</p>
        </div>
    )
}

Error.defaultProps = {
    handleClose: () => {},
    disableCloseButton: false
}

Error.propTypes = {
    error: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        errorClass: PropTypes.string,
        timeout: PropTypes.number
    }).isRequired,
    handleClose: PropTypes.func,
    disableCloseButton: PropTypes.bool
}

export default (Error)