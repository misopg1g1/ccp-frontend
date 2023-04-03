import './login.css'
import {useState} from 'react'
import LoginForm from '../../components/login/loginForm'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fieldIsValid, setFieldIsValid] = useState({
        username: null,
        password: null
    })

    const isValidFields = () => {
        if (!fieldIsValid.password || !fieldIsValid.username) {
            return false
        }
        return true
    }
    
    const submit = event => {
        console.log('event');
        event.preventDefault();
        if (isValidFields()) {
            LoginForm({
                credentials: {username, password}
            })
            return true;
        }
        return false;
    }
    
    const handleValueChange = (name, value) => {
        console.log('handleValueChange')
        if (name === 'username') {
            setUsername(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
        setFieldIsValid({...fieldIsValid, [name]: null})
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
                        username={username}
                        password={password}
                        submit={submit}
                    />
                </div>
            </div>
        </form>
    )
}
   
export default LoginPage