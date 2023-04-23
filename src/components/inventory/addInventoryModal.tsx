import './addInventoryModal.css'

import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { addInventory } from '../../actions/inventory'
import { onlyNumbersRegex } from '../../utils/regex'
 
interface ProductData {
    id: string
    name: string
    sku: string
    image: string
    description: string
    currentStock: string
}

interface AddInventoryComponentProps {
    isOpen: boolean
    handleCloseModal: any
    addInventoryFunc: any
    productData: ProductData
}

interface AddInventoryComponentState {
    message?: string
    stock: string
    fieldIsValid: any
}

class AddInventoryModal extends React.Component<AddInventoryComponentProps, AddInventoryComponentState> {
    constructor(props: AddInventoryComponentProps) {
        super(props);
        this.state = {
          stock: '',
          fieldIsValid: null
        }
    }

    validationsStockField: any = [
        {
            fn: (value: string) => onlyNumbersRegex.test(value),
            message: 'Ingrese un valor numerico'
        }
    ]

    handleSubmit = (event: any) => {
        event.preventDefault()
        const { addInventoryFunc, productData } = this.props
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
        addInventoryFunc(productData.id, stock)
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
        const { isOpen, handleCloseModal, productData } = this.props

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
            <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyle} ariaHideApp={false} >
                <div className='ContentModal'>
                    <div>
                        <span className='ModalTitle'>{productData.name}</span>
                        <div className='CloseModalButton' onClick={handleCloseModal} role='button' tabIndex={0}>
                            <Icons icon='close' className='left-icon' color='#000000' />
                        </div>
                    </div>
                    <React.Fragment>
                        <img 
                            className='ProductImage mt-16'
                            src={productData.image}
                            alt={'Imagen del producto con nombre: ' + productData.name}>
                        </img>
                        <Input
                            type='text'
                            name='description'
                            label='Descripción'
                            value={productData.description}
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
                                value={productData.sku}
                                classInput='ModalInput mt-8'
                                disabled={true}
                                marginTop='36px'
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='current-stock'
                                label='Current stock'
                                value={productData.currentStock}
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
})

const mapDispatchToProps = {
    addInventoryFunc: addInventory
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInventoryModal)