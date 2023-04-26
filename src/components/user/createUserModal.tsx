import './createUserModal.css'

import React from 'react'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { createUser } from '../../actions/user'
import Icon from "../../libs/icons"

interface CreateUserModalComponentProps {
    isOpen: boolean
    handleCloseModal: any
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
}

class CreateUserModal extends React.Component<CreateUserModalComponentProps, CreateUserModalComponentState> {
    showPassword = false
    showPasswordConfirm = false
    
    constructor(props: CreateUserModalComponentProps) {
        super(props)
        this.state = {
            username: null,
            password: null,
            confirmPassword: null,
            fieldIsValid: {
                username: false,
                password: false,
                confirmPassword: false
            }
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        const { stock } = this.state

        if (!stock) {
            this.setState({
                message: 'empty'
            })
            return
        }

        this.setState({
            message: ''
        })
        createUser(productData.id, stock)
    }

    handleValueChange = (name: string, value: string) => {
        console.log(name, value)
        if (name === 'user') {
            this.setState({ username: value })
        }
        if (name == 'password') {
            this.setState({ password: value })
        }
        if (name == 'confirm-password') {
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
        console.log(name, valid)
        this.setState({
            fieldIsValid: {
                  ...this.state.fieldIsValid,
                  [name]: valid
            }
        })
    }

    togglePasswordVisible = () => {
        this.showPassword = !this.showPassword
    }

    togglePasswordConfirmVisible = () => {
        this.showPasswordConfirm = !this.showPasswordConfirm
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
                                    name='user'
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
                                    type={this.showPassword ? "text" : "password"}
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
                                        icon={this.showPassword ? "eyeClosed" : "eye"}
                                        color="black"
                                        onClick={this.togglePasswordVisible}
                                        />
                                    }
                                >
                                </Input>
                                <Input
                                    type={this.showPasswordConfirm ? "text" : "password"}
                                    name="confirm-password"
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
                                        icon={this.showPasswordConfirm ? "eyeClosed" : "eye"}
                                        color="black"
                                        onClick={this.togglePasswordConfirmVisible}
                                        />
                                    }
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

export default CreateUserModal