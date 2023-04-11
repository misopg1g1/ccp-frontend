import './loginForm.css'
import PropTypes from 'prop-types'
import Input from '../../libs/input'

const LoginForm = (props) => {
    const {
        fieldIsValid,
        handleValueChange,
        handleValueValid,
        username,
        password,
        submit
    } = props

    return (
        <div className='LoginForm'>
            <h1 className='LoginFormTitle mt-64'>Iniciar Sesión</h1>
            <div className='LoginFormInputs mt-16'>
                <Input
                    type='text'
                    name='username'
                    autoComplete
                    label='Usuario'
                    placeholder='Escriba su usuario'
                    value={username}
                    handleValueChange={handleValueChange}
                    handleValueValid={handleValueValid}
                    requiredMessage='El campo usuario es requerido'
                    required
                    maxLength={20}
                    classInput='LoginFormInput '
                    forcedValid={fieldIsValid.username}
                >
                </Input>
                <Input
                    type='text'
                    name='password'
                    label='Contraseña'
                    placeholder='Escriba su contraseña'
                    value={password}
                    handleValueChange={handleValueChange}
                    handleValueValid={handleValueValid}
                    requiredMessage='El campo contraseña es requerido'
                    required
                    maxLength={20}
                    classInput='LoginFormInput '
                    marginTop='32px'
                    forcedValid={fieldIsValid.password}
                >
                </Input>
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
    handleValueValid: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}

export default LoginForm