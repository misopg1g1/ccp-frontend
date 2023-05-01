import './addInventoryModal.css'

import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { addInventory } from '../../actions/inventory'
import { onlyNumbersRegex } from '../../utils/regex'

interface AddInventoryComponentProps {
    isOpen: boolean
    handleCloseModal: any
    addInventoryFunc: any
    productData: any
    token: string
}

interface AddInventoryComponentState {
    stock: string | undefined
    fieldIsValid: any
    login: any
}

class AddInventoryModal extends React.Component<AddInventoryComponentProps, AddInventoryComponentState> {
    constructor(props: AddInventoryComponentProps) {
        super(props);
        this.state = {
          stock: undefined,
          fieldIsValid: null,
          login: null
        }
    }

    validationsStockField: any = [
        {
            fn: (value: string) => onlyNumbersRegex.test(value),
            message: 'Ingrese un valor numerico'
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

        if (!this.state.fieldIsValid) {
            this.setState({fieldIsValid: false})
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
        this.setState({fieldIsValid: false})
    }

    handleValueValid = (name: string, valid: boolean) => {
        this.setState({fieldIsValid: valid})
    }

    render () {
        const { isOpen, productData } = this.props
        const customStyle = {
            overlay : {
                background: 'rgba(0, 0, 0, 0.7)'
            },
            content: {
                top: '5%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
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
                            alt={'Imagen del producto con nombre: ' + productData?.name}>
                        </img>
                        <Input
                            type='text'
                            name='description'
                            label='Descripción'
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
                                label='SKU'
                                value={productData?.sku}
                                classInput='ModalInput mt-8'
                                disabled={true}
                                marginTop='36px'
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='current-stock'
                                label='Current stock'
                                value='0'
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
                                label='Add Units'
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
                                forcedValid={this.state.fieldIsValid}
                            ></Input>
                            <div className='{width=46%}'/>
                        </div>
                        <div>
                            <button type='submit' className='ModalButton mt-32' onClick={this.handleSubmit}>
                                Actualizar
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

export default connect(mapStateToProps, mapDispatchToProps)(AddInventoryModal)
