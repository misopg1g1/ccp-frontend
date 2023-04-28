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
    roles: any
    role: string
    hasError: boolean
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
            },
            hasError: false,
            role: '',
            roles: [
                {
                    name: 'ADMIN',
                    text: 'Administrador',
                    isActive: false
                },
                {
                    name: 'SELLER',
                    text: 'Vendedor',
                    isActive: false
                },
                {
                    name: 'TRANSPORTER',
                    text: 'Transportador',
                    isActive: false
                },
                {
                    name: "MARKETING",
                    text: 'Marketing',
                    isActive: false
                },
                {
                    name: "CLIENT",
                    text: 'Cliente',
                    isActive: false
                }
            ]
        }
    }

    validationsConfirmPasswordField: any = [
        {
            fn: (value: string) => value === this.state.password,
            message: 'Confirme que las contraseñas sean iguales'
        }
    ]

    handleSubmit = (event: any) => {
        if (!this.state.role) {
            this.setState({hasError: true})
            return
        }
        event.preventDefault()
        const { createUserFunc, token } = this.props
        const user = this.state.username
        const { password } = this.state
        const verify_password = this.state.confirmPassword
        const role = this.state.role
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

    setSatetRole = (roles: any, selectedRole: string) => {
        roles.map((role: any) => {
            if (role.name === selectedRole) {
                role.isActive = true
            } else {
                role.isActive = false
            }
        })
    }

    handleClick = (selectedRole: string) => {
        const roles = this.state.roles
        this.setSatetRole(roles, selectedRole)
        this.setState({ role: selectedRole })
        this.setState({ hasError: false })
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
                                    width='300px'
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
                                    width='300px'
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
                                    width='300px'
                                >
                                </Input>
                            </div>
                            <div className='CategoryPanel'>
                                <div className='AddRolePanel'>
                                    <span className='AddRoleTitle'>Agregar Role</span>
                                    {this.state.roles.map((rol: any) => 
                                        <div 
                                            key={rol.name}
                                            data-name={rol.name}
                                            style={{
                                                backgroundColor: rol.isActive ? '#2F76E6' : '',
                                                color: rol.isActive ? '#FFFFFF' : '',
                                            }}
                                            className='RoleOption mt-16'
                                            onClick={((e) => this.handleClick(rol.name))}>
                                                {rol.text}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {this.state.hasError && (
                                        <p className='ErrorMessage'>
                                            Debe seleccionar un rol
                                        </p>
                                    )}
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
