import './login.css'
import {useState} from 'react'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {login, cleanError } from '../../actions/login'
import PropTypes from 'prop-types'

import Error from '../../layout/messages/error'
import LoginForm from '../../components/login/loginForm'
import getErrorMessage from '../../utils/getErrorMessage'
import {DEFAULT_TIMEOUT_MESSAGE} from '../../constants/actionTypes'

const LoginPage = (props) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [fieldIsValid, setFieldIsValid] = useState({
        user: null,
        password: null
    })
    const [showPassword, setShowPasswword] = useState(false)
    const {
        error,
        loginFunc,
        isLoggedIn,
        cleanError
    } = props

    if (error) {
        error.code = "Error en login"
        error.timeout = DEFAULT_TIMEOUT_MESSAGE
    }

    if (isLoggedIn) {
        console.log('isLoggedIn_1', isLoggedIn)
        return <Navigate to={'/dashboard'} />
    }

    const isValidFields = () => {
        if (!fieldIsValid.password || !fieldIsValid.user) {
            return false
        }
        return true
    }
    
    const submit = event => {
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
    
    const handleValueChange = (name, value) => {
        if (name === 'user') {
            setUser(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
        setFieldIsValid({...fieldIsValid, [name]: null})
    }

    const handleValueValid = (name, valid) => {
        setFieldIsValid({...fieldIsValid, [name]: valid})
    }

    return (
        <form id='login' onSubmit={submit}>
            {error && <Error key={error.code} error={getErrorMessage(error)} handleClose={cleanError} />}
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
    error: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    cleanError: PropTypes.func.isRequired
}

LoginPage.defaultProps = {
    error: '',
    isLoggedIn: false
}

const mapStateToProps = state => ({
    error: state.login.error,
    isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = {
    loginFunc: login,
    cleanError: cleanError
}
   
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)