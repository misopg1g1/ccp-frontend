import './login.css'
import {useState} from 'react'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {login, cleanMessage } from '../../actions/login'
import PropTypes from 'prop-types'

import Message from '../../layout/messages/message'
import LoginForm from '../../components/login/loginForm'
import getMessage from '../../utils/getMessage'
import {DEFAULT_TIMEOUT_MESSAGE} from '../../constants/actionTypes'

const LoginPage = (props: any) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [fieldIsValid, setFieldIsValid] = useState({
        user: null,
        password: null
    })
    const [showPassword, setShowPasswword] = useState(false)
    const {
        message,
        loginFunc,
        isLoggedIn,
        cleanMessage
    } = props

    if (message) {
        message.code = "Error en login"
        message.timeout = DEFAULT_TIMEOUT_MESSAGE
    }

    if (isLoggedIn) {
        return <Navigate to={'/dashboard'} />
    }

    const isValidFields = () => {
        if (!fieldIsValid.password || !fieldIsValid.user) {
            return false
        }
        return true
    }
    
    const submit = (event: any) => {
        event.preventDefault();
        if (isValidFields()) {
            loginFunc({
                credentials: {user, password}
            })
            return true;
        }
        return false;
    }

    const togglePasswordVisible = () => {
        setShowPasswword(!showPassword)
    }
    
    const handleValueChange = (name: string, value: string) => {
        if (name === 'user') {
            setUser(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
        setFieldIsValid({...fieldIsValid, [name]: null})
    }

    const handleValueValid = (name: string, valid: any) => {
        setFieldIsValid({...fieldIsValid, [name]: valid})
    }

    return (
        <form id='login' onSubmit={submit}>
            {message && <Message key={message.code} message={getMessage(message)} handleClose={cleanMessage} />}
            <div className="LoginBoard">
                <div className='LoginGreetingPanel'>
                    <div className='LoginGreetingPanelText'>
                        <p className='medium'>Bienvenido!</p>
                        <p className='light'>Sistema CCP  v1.0</p>
                    </div>
                </div>
                <div className='LoginFormPanel'>
                    <LoginForm
                        fieldIsValid={fieldIsValid}
                        handleValueChange={handleValueChange}
                        handleValueValid={handleValueValid}
                        user={user}
                        password={password}
                        submit={submit}
                        showPassword={showPassword}
                        togglePasswordVisible={togglePasswordVisible}
                    />
                </div>
            </div>
        </form>
    )
}

LoginPage.propTypes = {
    message: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    cleanMessage: PropTypes.func.isRequired
}

LoginPage.defaultProps = {
    message: '',
    isLoggedIn: false
}

const mapStateToProps = (state: any) => ({
    message: state.login.message,
    isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = {
    loginFunc: login,
    cleanMessage: cleanMessage
}
   
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)