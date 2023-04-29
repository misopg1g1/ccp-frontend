import './createUserModal.css'

import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { createUser } from '../../actions/user'
import Icon from "../../libs/icons"

interface CreateUserModalComponentProps {
    isOpen: boolean
    handleCloseModal: any
    createUserFunc?: any
    token: string
}

interface CreateUserModalComponentState {
    username: string | null
    password: string | null
    confirmPassword: string | null
    fieldIsValid: {
        username: boolean | undefined
        password: boolean | undefined
        confirmPassword: boolean | undefined
    }
    showPassword?: boolean
    showConfirmPassword?: boolean
}

class CreateUserModal extends React.Component<CreateUserModalComponentProps, CreateUserModalComponentState> {
        constructor(props: CreateUserModalComponentProps) {
        super(props)
        this.state = {
            username: null,
            password: null,
            confirmPassword: null,
            fieldIsValid: {
                username: true,
                password: true,
                confirmPassword: true
            }
        }
    }

    validationsConfirmPasswordField: any = [
        {
            fn: (value: string) => value === this.state.password,
            message: 'Confirme que las contraseñas sean iguales'
        }
    ]

    handleSubmit = (event: any) => {
        event.preventDefault()
        const { createUserFunc, token } = this.props
        const user = this.state.username
        const { password } = this.state
        const verify_password = this.state.confirmPassword
        const role = 'ADMIN'
        createUserFunc({user, password, verify_password, role}, token)
    }

    handleValueChange = (name: string, value: string) => {
        if (name === 'username') {
            this.setState({ username: value })
        }
        if (name == 'password') {
            this.setState({ password: value })
        }
        if (name == 'confirmPassword') {
            this.setState({ confirmPassword: value })
        }
        this.setState({
            fieldIsValid: {
                  ...this.state.fieldIsValid,
                  [name]: false
            }
        })
    }

    handleValueValid = (name: string, valid: boolean) => {
        this.setState({
            fieldIsValid: {
                  ...this.state.fieldIsValid,
                  [name]: valid
            }
        })
    }

    togglePasswordVisible = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    togglePasswordConfirmVisible = () => {
        this.setState({ showConfirmPassword: !this.state.showConfirmPassword })
    }

    render () {
        const { isOpen, handleCloseModal } = this.props
        const customStyle = {
            overlay : {
                background: 'rgba(0, 0, 0, 0.7)'
            },
            content: {
                top: '10%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, 0%)', 
                background: 'rgba(244, 245, 247, 1)'
            }
        }

        return (
            <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyle} ariaHideApp={false} >
                <div className='ContentModal'>
                    <div>
                        <span className='ModalTitle'>Crear Usuario</span>
                        <div className='CloseModalButton' onClick={handleCloseModal} role='button' tabIndex={0}>
                            <Icons icon='close' className='left-icon' color='#000000' />
                        </div>
                    </div>
                    <React.Fragment>
                        <div className='MainPanel mt-32'>
                            <div className='FormPanel'>
                                <Input
                                    type='text'
                                    name='username'
                                    label='Usuario'
                                    placeholder='Ingrese el usuario'
                                    value={this.state.username}
                                    handleValueChange={this.handleValueChange}
                                    handleValueValid={this.handleValueValid}
                                    requiredMessage='El campo usuario es requerido'
                                    required={true}
                                    maxLength={20}
                                    classInput='Input mt-8'                                    
                                    forcedValid={this.state.fieldIsValid.username}
                                ></Input>
                                <Input
                                    type={this.state.showPassword ? "text" : "password"}
                                    name="password"
                                    label="Contraseña"
                                    placeholder="Escriba la contraseña"
                                    value={this.state.password}
                                    handleValueChange={this.handleValueChange}
                                    handleValueValid={this.handleValueValid}
                                    requiredMessage="El campo contraseña es requerido"
                                    required={true}
                                    maxLength={20}
                                    classInput="Input mt-8"
                                    marginTop="32px"
                                    forcedValid={this.state.fieldIsValid.password}
                                    icon={
                                        <Icon
                                        className={"LoginIconInput"}
                                        icon={this.state.showPassword ? "eyeClosed" : "eye"}
                                        color="black"
                                        onClick={this.togglePasswordVisible}
                                        />
                                    }
                                >
                                </Input>
                                <Input
                                    type={this.state.showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    label="Confirmar contraseña"
                                    placeholder="Confirme la contraseña"
                                    value={this.state.confirmPassword}
                                    handleValueChange={this.handleValueChange}
                                    handleValueValid={this.handleValueValid}
                                    requiredMessage="El campo contraseña es requerido"
                                    required={true}
                                    maxLength={20}
                                    classInput="Input mt-8"
                                    marginTop="32px"
                                    forcedValid={this.state.fieldIsValid.confirmPassword}
                                    icon={
                                        <Icon
                                        className={"LoginIconInput"}
                                        icon={this.state.showConfirmPassword ? "eyeClosed" : "eye"}
                                        color="black"
                                        onClick={this.togglePasswordConfirmVisible}
                                        />
                                    }
                                    validations={this.validationsConfirmPasswordField}
                                >
                                </Input>
                            </div>
                            <div className='CategoryPanel'>
                                <div className='AddRolePanel'>
                                    <span className='AddRoleTitle'>Agregar Role</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='ModalButton mt-32' onClick={this.handleSubmit}>
                                Guardar
                            </button>
                        </div>
                    </React.Fragment>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state: CreateUserModalComponentState) => ({
})

const mapDispatchToProps = {
    createUserFunc: createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal)