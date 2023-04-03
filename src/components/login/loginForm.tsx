import './loginForm.css'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
    const {
        fieldIsValid,
        handleValueChange,
        username,
        password,
        submit
    } = props

    return (
        <div className='LoginForm'>
            <h1 className='LoginFormTitle mt-64'>Iniciar Sesión</h1>
            <div className='LoginFormInputs mt-16'>
                <label className='LoginFormLabel'>Usuario</label>
                <input className='LoginFormInput'
                    placeholder='Escriba su usuario'
                    value={username}>
                </input>
                <p className='ErrorMessage'>Mensaje de error</p>
                <label className='LoginFormLabel mt-32'>Contraseña</label>
                <input className='LoginFormInput'
                    placeholder='Escriba su contraseña'
                    value={password}>
                </input>
                <p className='ErrorMessage'>Mensaje de error</p>
            </div>
            <button 
                type='submit'
                onClick={submit}
                className='LoginFormButton mt-32'>
                Ingresar
            </button>
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    fieldIsValid: PropTypes.object.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}

export default LoginForm