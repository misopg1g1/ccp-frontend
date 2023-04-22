import './login.css'

import React, {FormEvent, useState} from 'react'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {login, cleanMessage } from '../../actions/login'

import Message from '../../components/layout/messages/message'
import LoginForm from '../../components/login/loginForm'
import getMessage from '../../utils/getMessage'
import {DEFAULT_TIMEOUT_MESSAGE} from '../../constants/actionTypes'

interface LoginPageProps {
    message?: any
    loginFunc?: any
    isLoggedIn?: boolean
    cleanMessage: any
}

interface LoginPageState {
    login: {
        message: any
        isLoggedIn: boolean,
    }
}

const LoginPage = (props: LoginPageProps) => {
    const {
        message,
        loginFunc,
        isLoggedIn,
        cleanMessage
    } = props

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPasswword] = useState(false)
    const [fieldIsValid, setFieldIsValid] = useState({
        user: null,
        password: null
    })
    
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
    
    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (isValidFields()) {
            loginFunc({
                credentials: {user, password}
            })
            return true
        }
        return false
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

    const handleValueValid = (name: string, valid: boolean) => {
        setFieldIsValid({...fieldIsValid, [name]: valid})
    }

    return (
        <div className='login-container'>
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
                        onSubmit={submit}
                        showPassword={showPassword}
                        togglePasswordVisible={togglePasswordVisible}
                    />
                </div>
            </div>
        </form>
        </div>
    )
}

const mapStateToProps = (state: LoginPageState) => ({
    message: state.login.message,
    isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = {
    loginFunc: login,
    cleanMessage: cleanMessage
}
   
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)