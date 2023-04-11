import './login.css'
import {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../../actions/login'
import LoginForm from '../../components/login/loginForm'

const LoginPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fieldIsValid, setFieldIsValid] = useState({
        username: null,
        password: null
    })
    const {
        loginFunc,
        isLoggedIn
    } = props

    const isValidFields = () => {
        if (!fieldIsValid.password || !fieldIsValid.username) {
            return false
        }
        return true
    }
    
    const submit = event => {
        event.preventDefault();
        if (isValidFields()) {
            loginFunc({
                credentials: {username, password}
            })
            return true;
        }
        return false;
    }
    
    const handleValueChange = (name, value) => {
        if (name === 'username') {
            setUsername(value)
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
                        username={username}
                        password={password}
                        submit={submit}
                    />
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.login.isLoggedIn
})

const mapDispatchToProps = {
    loginFunc: login
}
   
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)