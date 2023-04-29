import './createProductModal.css'

import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { createProduct } from '../../actions/product'
import { onlyNumbersRegex } from '../../utils/regex'
 
interface CreateProductComponentProps {
    isOpen: boolean
    handleCloseModal: any
    createProductFunc: any
}

interface CreateProductComponentState {
    message?: string
    product: any
    fieldIsValid: any
}

class CreateProductModal extends React.Component<CreateProductComponentProps, CreateProductComponentState> {
    constructor(props: CreateProductComponentProps) {
        super(props);
        this.state = {
          product: null,
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
        const { createProductFunc } = this.props
        const { product } = this.state

        if (!product) {
            this.setState({
                message: 'empty'
            })
            return
        }

        this.setState({
            message: ''
        })
        createProductFunc(product)
    }

    handleValueChange = (name: string, value: string) => {
        //if (name === 'stock') {
        //    this.setState({ stock: value })
        //}
        this.setState({fieldIsValid: false})
    }

    handleValueValid = (name: string, valid: boolean) => {
        this.setState({fieldIsValid: valid})
    }

    render () {
        const { isOpen, handleCloseModal } = this.props

        const customStyle = {
            overlay : {
                background: 'rgba(0, 0, 0, 0.7)',
                maxHeight: '100vh',
                overflowY: 'auto'
            },
            content: {
                top: '3%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, 0%)', 
                background: 'rgba(244, 245, 247, 1)',
            }
        }

        return (
            <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyle} ariaHideApp={false} >
                <div className='ContentModal'>
                    <div>
                        <span className='ModalTitle'>Nuevo producto</span>
                        <div className='CloseModalButton' onClick={handleCloseModal} role='button' tabIndex={0}>
                            <Icons icon='close' className='left-icon' color='#000000' />
                        </div>
                    </div>
                    <React.Fragment>
                        <img 
                            className='ProductImage mt-16'
                            src='product.jpg'
                            alt={'Imagen del producto'}>
                        </img>
                        <Input
                            type='text'
                            name='name'
                            label='Nombre del producto'
                            placeholder='Escribe el nombre del producto'
                            value=''
                            handleValueChange={this.handleValueChange}
                            handleValueValid={this.handleValueValid}
                            classInput='Input mt-8'
                            marginTop='36px'
                            required={true}
                            requiredMessage='El campo es requerido'
                            forcedValid={this.state.fieldIsValid}
                        ></Input>
                        <Input
                            type='text'
                            name='description'
                            label='Descripción del producto'
                            placeholder='Escribe la descripción del producto'
                            value=''
                            handleValueChange={this.handleValueChange}
                            handleValueValid={this.handleValueValid}
                            classInput='Input mt-8'
                            marginTop='36px'
                            required={true}
                            requiredMessage='El campo es requerido'
                            forcedValid={this.state.fieldIsValid}
                        ></Input>
                        <div className='ModalContainerTwoColumns'>
                            <Input
                                type='text'
                                name='sku'
                                label='SKU'
                                placeholder='SKU del producto'
                                value=''
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={this.state.fieldIsValid}
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='unit-price'
                                label='Precio unitario'
                                placeholder='100.000,00'
                                value=''
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={this.state.fieldIsValid}
                                width='46%'
                                marginLeft='8%'
                            ></Input>
                        </div>
                        <div className='ModalContainerTwoColumns'>
                            <Input
                                type='text'
                                name='product-type'
                                label='Tipo de producto'
                                placeholder='Seleccione un tipo'
                                value=''
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={this.state.fieldIsValid}
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='category'
                                label='Categoria'
                                placeholder='Seleccione una categoria'
                                value=''
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={this.state.fieldIsValid}
                                width='46%'
                                marginLeft='8%'
                            ></Input>
                        </div>
                        <div className='ModalContainerTwoColumns'>
                            <Input
                                type='text'
                                name='expiration-date'
                                label='SKU'
                                placeholder='Fecha de expiración'
                                value=''
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={this.state.fieldIsValid}
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='dimensions'
                                label='Dimensiones (cm)'
                                placeholder='Ancho - Alto - Largo'
                                value=''
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={this.state.fieldIsValid}
                                width='46%'
                                marginLeft='8%'
                            ></Input>
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

const mapStateToProps = (state: CreateProductComponentState) => ({
})

const mapDispatchToProps = {
    createProductFunc: createProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal)