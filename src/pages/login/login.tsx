import './login.scss'

import {FormEvent, useState} from 'react'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {login} from '../../actions/login'
import {cleanMessage} from '../../actions/message'
import Message from '../../components/layout/messages/message'
import LoginForm from '../../components/login/loginForm'
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../libs/switcher';

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
    message: any
}

const LoginPage = (props: LoginPageProps) => {
    const {
        message,
        loginFunc,
        isLoggedIn,
        cleanMessage
    } = props

    const [t] = useTranslation("global");
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [fieldIsValid, setFieldIsValid] = useState({
        user: true,
        password: true
    })

    if (isLoggedIn) {
        return <Navigate to={'/dashboard'} />
    }

    const formIsValid = (): boolean => {
        fieldIsValid.user = (user != "");
        fieldIsValid.password = password != "";
        const invalidFields = Object.entries(fieldIsValid).filter(([, value]) => !value);
        return invalidFields.length <= 0;
    };
    
    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (formIsValid()) {
            loginFunc({
                credentials: {user, password}
            })
            return true
        }
        return false
    }

    const togglePasswordVisible = () => {
        setShowPassword(!showPassword)
    }
    
    const handleValueChange = (name: string, value: string) => {
        if (name === 'user') {
            setUser(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
    }

    const handleValueValid = (name: string, valid: boolean) => {
        setFieldIsValid({...fieldIsValid, [name]: valid})
    }

    return (
        <div className='login-container'>
        <form id='login' onSubmit={submit}>
            {message && <Message key={message.code} message={message} handleClose={cleanMessage} />}
            <div className="LoginBoard">
                <div className='LoginGreetingPanel'>
                    <div className='LoginGreetingPanelText'>
                        <p className='medium'>{t("login.greeting")}</p>
                        <p className='light'>{t("login.system-version")}</p>
                    </div>
                    <LanguageSwitcher />
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
    message: state.message.message,
    isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = {
    loginFunc: login,
    cleanMessage: cleanMessage
}
   
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)