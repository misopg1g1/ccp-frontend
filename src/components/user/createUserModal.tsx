import './createUserModal.css'

import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { createUser } from '../../actions/user'
import Icon from "../../libs/icons"
import { withTranslation } from 'react-i18next';

interface CreateUserModalComponentProps {
    isOpen: boolean
    handleCloseModal: any
    createUserFunc?: any
    token: string
    t: any
}

interface NewUserData {
    user: string
    password: string
    verify_password: string
    role: string
}

interface CreateUserModalComponentState {
    fieldIsValid: {
        username: boolean | undefined
        password: boolean | undefined
        confirmPassword: boolean | undefined
    }
    showPassword?: boolean
    showConfirmPassword?: boolean
    roles: any
    hasError: boolean
    userData: NewUserData
}

class CreateUserModal extends React.Component<CreateUserModalComponentProps, CreateUserModalComponentState> {
    constructor(props: CreateUserModalComponentProps) {
        super(props)
        this.state = {
            fieldIsValid: {
                username: true,
                password: true,
                confirmPassword: true
            },
            hasError: false,
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
            ],
            userData: {
                user: '',
                password: '',
                verify_password: '',
                role: ''
            }
        }
    }

    validationsConfirmPasswordField: any = [
        {
            fn: (value: string) => value === this.state.userData.password,
            message: 'Confirme que las contraseñas sean iguales'
        }
    ]

    handleSubmit = (event: any) => {
        event.preventDefault()
        if (!this.state.userData.role) {
            this.setState({ hasError: true })
            return
        }
        const { createUserFunc, token } = this.props
        createUserFunc(this.state.userData, token)
        this.handleCloseModal(event)
    }

    handleValueChange = (name: string, value: string) => {
        if (name === 'username') {
            this.setState({ userData: { ...this.state.userData, user: value } })
        }
        if (name == 'password') {
            this.setState({ userData: { ...this.state.userData, password: value } })
        }
        if (name == 'confirmPassword') {
            this.setState({ userData: { ...this.state.userData, verify_password: value } })
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

    setStateRole = (selectedRole: string) => {
        const roles = this.state.roles
        roles.map((role: any) => {
            role.isActive = role.name === selectedRole;
        })
    }

    handleClick = (selectedRole: string) => {
        this.setStateRole(selectedRole)
        this.setState({ userData: { ...this.state.userData, role: selectedRole } })
        this.setState({ hasError: false })
    }

    clearModal = () => {
        this.setState({
            userData: {
                ...this.state.userData,
                user: '',
                password: '',
                verify_password: '',
                role: ''
            }
        })
        this.setStateRole('')
    }

    handleCloseModal = (event: any) => {
        this.props.handleCloseModal(event)
        this.clearModal();
    }

    render() {
        const { isOpen } = this.props
        const customStyle = {
            overlay: {
                background: "rgba(0, 0, 0, 0.7)",
                maxHeight: "100vh",
                overflowY: "auto",
                zIndex: 5
            },
            content: {
                top: '10%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                width: '650px',
                transform: 'translate(-50%, 0%)',
                background: 'rgba(244, 245, 247, 1)'
            }
        }

        return (
            <Modal isOpen={isOpen} onRequestClose={this.handleCloseModal} style={customStyle} ariaHideApp={false} >
                <div className='ContentModal'>
                    <div>
                        <span className='ModalTitle'>{this.props.t("user.modal.title")}</span>
                        <div className='CloseModalButton' onClick={this.handleCloseModal} role='button' tabIndex={0}>
                            <Icons icon='close' className='left-icon' color='#000000' />
                        </div>
                    </div>
                    <React.Fragment>
                        <div className='MainPanel mt-32'>
                            <div className='FormPanel'>
                                <Input
                                    type='text'
                                    name='username'
                                    label={this.props.t("user.modal.input.username-label")}
                                    placeholder={this.props.t("user.modal.input.username-placeholder")}
                                    value={this.state.userData.user}
                                    handleValueChange={this.handleValueChange}
                                    handleValueValid={this.handleValueValid}
                                    requiredMessage={this.props.t("user.modal.input.username-message")}
                                    required={true}
                                    maxLength={20}
                                    classInput='Input mt-8'
                                    forcedValid={this.state.fieldIsValid.username}
                                    width='300px'
                                ></Input>
                                <Input
                                    type={this.state.showPassword ? "text" : "password"}
                                    name="password"
                                    label={this.props.t("user.modal.input.password-label")}
                                    placeholder={this.props.t("user.modal.input.password-placeholder")}
                                    value={this.state.userData.password}
                                    handleValueChange={this.handleValueChange}
                                    handleValueValid={this.handleValueValid}
                                    requiredMessage={this.props.t("user.modal.input.password-message")}
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
                                    label={this.props.t("user.modal.input.confirm-password-label")}
                                    placeholder={this.props.t("user.modal.input.confirm-password-placeholder")}
                                    value={this.state.userData.verify_password}
                                    handleValueChange={this.handleValueChange}
                                    handleValueValid={this.handleValueValid}
                                    requiredMessage={this.props.t("user.modal.input.confirm-password-message")}
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
                                    <span className='AddRoleTitle'>{this.props.t("user.modal.rol-title")}</span>
                                    {this.state.roles.map((rol: any) =>
                                        <div
                                            key={rol.name}
                                            data-name={rol.name}
                                            role="button"
                                            style={{
                                                backgroundColor: rol.isActive ? '#2F76E6' : '',
                                                color: rol.isActive ? '#FFFFFF' : '',
                                            }}
                                            className='RoleOption mt-16'
                                            onClick={(() => this.handleClick(rol.name))}>
                                            {rol.text}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {this.state.hasError && (
                                        <p className='ErrorMessage'>
                                            {this.props.t("user.modal.rol-message")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='ModalButton mt-32' onClick={this.handleSubmit}>
                                {this.props.t("user.modal.button")}
                            </button>
                        </div>
                    </React.Fragment>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state: any) => ({
    token: state.login.token
})

const mapDispatchToProps = {
    createUserFunc: createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("global")(CreateUserModal))
