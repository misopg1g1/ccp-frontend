import './addInventoryModal.css'

import React from 'react'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'

interface InventoryData {
    succes: string
    productName: string
}
 
interface ProductData {
    succes: string
    productName: string
}

interface AddInventoryComponentProps {
    isOpen: boolean
    handleCloseModal: any
    submitAddInventory: any
    productData?: ProductData
    inventoryData: InventoryData
}

interface AddInventoryComponentState {
    message: string
    productData: any
    quantity: number
}

class AddInventoryModal extends React.Component<AddInventoryComponentProps, AddInventoryComponentState> {
    static defaultProps = {
        inventoryData: null
    }

    state: any = {
        message: ''
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        const { submitAddInventory } = this.props
        const { quantity } = this.state

        if (!quantity) {
            this.setState({
                message: 'empty'
            })
            return
        }

        this.setState({
            message: ''
        })
        submitAddInventory(quantity)
    }

    render () {
        const { isOpen, handleCloseModal, productData, inventoryData } = this.props
        const { message } = this.state

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
                        <span className='ModalTitle'>Product Name</span>
                        <div className='CloseModalButton' onClick={handleCloseModal} role='button' tabIndex={0}>
                            <Icons icon='close' className='left-icon' color='#000000' />
                        </div>
                    </div>
                    {inventoryData && inventoryData.succes ? (
                        <div className='succes-message'>
                            El inventario del producto {inventoryData.productName} fue actualizado 
                        </div>
                    ) : (
                        <React.Fragment>
                            <img 
                                className='ProductImage mt-16'
                                src='/product.jpg'
                                alt={'Imagen del producto con nombre: '}>
                            </img>
                            <Input
                                type='text'
                                name='description'
                                label='Descripción'
                                value='This is the product description'
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
                                    value='SKU-EXAMPLE'
                                    classInput='ModalInput mt-8'
                                    disabled={true}
                                    marginTop='36px'
                                    width='46%'
                                ></Input>
                                <Input
                                    type='text'
                                    name='current-stock'
                                    label='Current stock'
                                    value='100'
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
                                    name='quantity'
                                    label='Add Units'
                                    value={10}
                                    classInput='Input mt-8'
                                    marginTop='36px'
                                    width='46%'
                                ></Input>
                                <div className='{width=46%}'/>
                            </div>
                            <div>
                                <button type='submit' className='ModalButton mt-32' onClick={this.handleSubmit}>
                                    Actualizar
                                </button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </Modal>
        )
    }
}

export default AddInventoryModal