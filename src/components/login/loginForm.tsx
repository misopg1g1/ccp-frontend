import './loginForm.css'
import PropTypes from 'prop-types'
import Input from '../../libs/input'
import Icon from '../../libs/icons'

const LoginForm = (props) => {
    const {
        fieldIsValid,
        handleValueChange,
        handleValueValid,
        user,
        password,
        showPassword,
        togglePasswordVisible,
        submit
    } = props

    return (
        <div className='LoginForm'>
            <h1 className='LoginFormTitle mt-64'>Iniciar Sesión</h1>
            <div className='LoginFormInputs mt-16'>
                <Input
                    type='text'
                    name='user'
                    autoComplete
                    label='Usuario'
                    placeholder='Escriba su usuario'
                    value={user}
                    handleValueChange={handleValueChange}
                    handleValueValid={handleValueValid}
                    requiredMessage='El campo usuario es requerido'
                    required
                    maxLength={20}
                    classInput='LoginFormInput '
                    forcedValid={fieldIsValid.user}
                >
                </Input>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    autocomplete
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
                    icon={
                        <Icon
                            className={'LoginIconInput'}
                            icon={showPassword ? 'eyeClosed' : 'eye'}
                            color='black'
                            onClick={togglePasswordVisible}
                        />
                    }
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
    user: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    fieldIsValid: PropTypes.object.isRequired,
    showPassword: PropTypes.bool.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    handleValueValid: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    togglePasswordVisible: PropTypes.func.isRequired
}

export default LoginForm