import './addInventoryModal.css'

import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { addInventory } from '../../actions/inventory'
import { onlyNumbersRegex } from '../../utils/regex'
import { withTranslation } from 'react-i18next';

interface AddInventoryComponentProps {
    isOpen: boolean
    handleCloseModal: any
    addInventoryFunc: any
    productData: any
    token: string
    t: any
}

interface AddInventoryComponentState {
    stock: string | undefined
    fieldIsValid: {
        stock: boolean
    }
    login: any
}

class AddInventoryModal extends React.Component<AddInventoryComponentProps, AddInventoryComponentState> {
    constructor(props: AddInventoryComponentProps) {
        super(props);
        this.state = {
          stock: undefined,
          fieldIsValid: {
            stock: true,
          },
          login: null
        }
    }

    validationsStockField: any = [
        {
            fn: (value: string) => onlyNumbersRegex.test(value),
            message: this.props.t("inventory.validation_numbers_message"),
        }
    ]

    clearModal = () => {
        this.setState({ stock: undefined })
    }

    handleCloseModal = (event: any) => {
        this.props.handleCloseModal(event)
        this.clearModal();
    }

    handleSubmit = (event: any) => {
        event.preventDefault()

        if (!this.state.fieldIsValid.stock) {
            this.setState({
                fieldIsValid: {
                    ...this.state.fieldIsValid,
                    stock: false,
                }
            })
            return
        }
        const { addInventoryFunc, productData } = this.props
        const { stock } = this.state
        addInventoryFunc(productData.id, Number(stock), this.props.token)
        this.handleCloseModal(event)
    }

    handleValueChange = (name: string, value: string) => {
        if (name === 'stock') {
            this.setState({ stock: value })
        }
    }

    handleValueValid = (name: string, valid: boolean) => {
        this.setState({
            fieldIsValid: {
              ...this.state.fieldIsValid,
              [name]: valid,
            }
        });
    }

    render () {
        const { isOpen, productData } = this.props
        const customStyle = {
            overlay : {
                background: "rgba(0, 0, 0, 0.7)",
                maxHeight: "100vh",
                overflowY: "auto",
                zIndex: 5
            },
            content: {
                top: '5%',
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
                        <span className='ModalTitle'>{productData?.name}</span>
                        <div className='CloseModalButton' onClick={this.handleCloseModal} role='button' tabIndex={0}>
                            <Icons icon='close' className='left-icon' color='#000000' />
                        </div>
                    </div>
                    <React.Fragment>
                        <img 
                            className='ProductImage mt-16'
                            src={productData?.img_url}
                            alt={`${this.props.t("product.modal.input.alt-image")} ${productData?.name}`}>
                        </img>
                        <Input
                            type='text'
                            name='description'
                            label={this.props.t("product.modal.input.description-label")}
                            value={productData?.description}
                            maxLength={20}
                            classInput='ModalInput mt-8'
                            disabled={true}
                            marginTop='36px'
                        ></Input>
                        <div className='ModalContainerTwoColumns'>
                            <Input
                                type='text'
                                name='sku'
                                label={this.props.t("product.modal.input.sku")}
                                value={productData?.sku}
                                classInput='ModalInput mt-8'
                                disabled={true}
                                marginTop='36px'
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='current-stock'
                                label={this.props.t("product.modal.input.current-stock")}
                                value={productData?.stock}
                                classInput='ModalInput mt-8'
                                disabled={true}
                                marginTop='36px'
                                width='46%'
                                marginLeft='8%'
                            ></Input>
                        </div>
                        <div className='ModalContainerTwoColumns'>
                            <Input
                                type='text'
                                name='stock'
                                label={this.props.t("product.modal.input.stock")}
                                placeholder='10'
                                value={this.state.stock}
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                width='46%'
                                validations={this.validationsStockField}
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={this.state.fieldIsValid.stock}
                            ></Input>
                            <div className='{width=46%}'/>
                        </div>
                        <div>
                            <button type='submit' className='ModalButton mt-32' onClick={this.handleSubmit}>
                                {this.props.t("product.modal.update-button")}
                            </button>
                        </div>
                    </React.Fragment>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AddInventoryComponentState) => ({
    token: state.login.token
})

const mapDispatchToProps = {
    addInventoryFunc: addInventory
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("global")(AddInventoryModal))
