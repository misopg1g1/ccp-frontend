import './createProductModal.css'

import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'
import { createProduct } from '../../actions/product'
import { onlyNumbersRegex } from '../../utils/regex'
import { ProductCreate, ProductType } from '../../utils/types'
 
interface CreateProductComponentProps {
    isOpen: boolean
    handleCloseModal: any
    createProductFunc: any
    token: string
}

interface CreateProductComponentState {
    product: ProductCreate
    fieldIsValid: any
    value: string
}

class CreateProductModal extends React.Component<CreateProductComponentProps, CreateProductComponentState> {
    constructor(props: CreateProductComponentProps) {
        super(props);
        this.state = {
            product: {
                name: '',
                description: '',
                type: '',
                categories: '',
                price: ''
            },
            fieldIsValid: {
                name: true,
                description: true,
                type: true,
                category: true,
                price: true
            },
            value: ''
        }
    }

    validationsStockField: any = [
        {
            fn: (value: string) => onlyNumbersRegex.test(value),
            message: 'Ingrese un valor numerico'
        }
    ]

    formIsValid = () => {
        console.log('Validar si los campos son validos')
        return false
    }

    setDefault = () => {
        this.setState({product: {
            name: '',
            description: '',
            type: '',
            categories: '',
            price: ''
        }})
    }

    handleCloseModal = (event: any) => {
        this.props.handleCloseModal(event)
        this.setDefault();
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(this.state.product)
        return

        if (!this.formIsValid) {
            this.setState({fieldIsValid: false})
            return
        }
        const { createProductFunc } = this.props
        const { product } = this.state
        createProductFunc(product, this.props.token)
        this.handleCloseModal(event)
    }

    handleValueChange = (name: string, value: string) => {
        this.setState({ 
            product: {
                ...this.state.product, 
                [name]: value 
            }
        })
        this.setState({
            fieldIsValid: {
                  ...this.state.fieldIsValid,
                  [name]: false
            }
        })
    }

    handleOptionChange = (event: any) => {
        this.setState({ 
            product: {
                ...this.state.product, 
                [event.target.name]: event.target.value 
            }
        })
        this.setState({
            fieldIsValid: {
                ...this.state.fieldIsValid,
                [event.target.name]: false
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

    render () {
        const { isOpen } = this.props
        const { product, fieldIsValid } = this.state
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
        const optionsType = [
            { label: 'Seleccione un tipo', value: 'default' },
            { label: 'Perecedero', value: ProductType.PERISHABLE },
            { label: 'No Perecedero', value: ProductType.NONPERISHABLE },
        ]
        const optionsCategory = [
            { label: 'Seleccione una categoria', value: 'default' },
            { label: 'Volvo', value: 'volvo'},
            { label: 'Saab', value: 'saab'},
            { label: 'Opel', value: 'opel'},
            { label: 'Audi', value: 'audi'},
        ]

        return (
            <Modal isOpen={isOpen} onRequestClose={this.handleCloseModal} style={customStyle} ariaHideApp={false} >
                <div className='ContentModal'>
                    <div>
                        <span className='ModalTitle'>Nuevo producto</span>
                        <div className='CloseModalButton' onClick={this.handleCloseModal} role='button' tabIndex={0}>
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
                            value={product.name}
                            handleValueChange={this.handleValueChange}
                            handleValueValid={this.handleValueValid}
                            classInput='Input mt-8'
                            marginTop='36px'
                            required={true}
                            requiredMessage='El campo es requerido'
                            forcedValid={fieldIsValid.name}
                        ></Input>
                        <Input
                            type='text'
                            name='description'
                            label='Descripción del producto'
                            placeholder='Escribe la descripción del producto'
                            value={product.description}
                            handleValueChange={this.handleValueChange}
                            handleValueValid={this.handleValueValid}
                            classInput='Input mt-8'
                            marginTop='36px'
                            required={true}
                            requiredMessage='El campo es requerido'
                            forcedValid={fieldIsValid.description}
                        ></Input>
                        <div className='ModalContainerTwoColumns'>
                        <div className='LoginFormInputs FormOption'>
                                <label htmlFor='type' className='FormLabel'>Tipo de producto</label>
                                <select 
                                    key='type'
                                    name='type' 
                                    id='type' 
                                    autoComplete='off' 
                                    className='Input mt-8 required error' 
                                    onChange={this.handleOptionChange}
                                    value={product.type}
                                >
                                    {optionsType.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='LoginFormInputs FormOption' style={{marginLeft:'8%'}}>
                            <label htmlFor="categories" className='FormLabel'>Categoria</label>
                                <select 
                                    key='category'
                                    name='categories' 
                                    id='categories' 
                                    autoComplete='off' 
                                    className='Input mt-8 required error' 
                                    onChange={this.handleOptionChange}
                                    value={product.categories}
                                >
                                    {optionsCategory.map((category) => (
                                        <option key={category.value} value={category.value}>{category.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='ModalContainerTwoColumns'>
                            <Input
                                type='text'
                                name='price'
                                label='Precio unitario'
                                placeholder='100.000,00'
                                value={product.price}
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                required={true}
                                requiredMessage='El campo es requerido'
                                forcedValid={fieldIsValid.price}
                                validations={this.validationsStockField}
                                width='46%'
                            ></Input>
                            <Input
                                type='date'
                                name='expiration-date'
                                label='Fecha de expiración'
                                placeholder='dd/mm/aaaa'
                                value={product.expiration_date}
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                width='46%'
                                marginLeft='8%'
                            ></Input>
                        </div>
                        <div className='ModalContainerTwoColumns'>
                            <Input
                                type='text'
                                name='temperature_control'
                                label='Control de temperatura'
                                placeholder='temperature_control'
                                value={product.temperature_control}
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
                                validations={this.validationsStockField}
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='dimensions'
                                label='Dimensiones (cm)'
                                placeholder='Ancho - Alto - Largo'
                                value={product.dimensions}
                                handleValueChange={this.handleValueChange}
                                handleValueValid={this.handleValueValid}
                                classInput='Input mt-8'
                                marginTop='36px'
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

const mapStateToProps = (state: any) => ({
    token: state.login.token
})

const mapDispatchToProps = {
    createProductFunc: createProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal)