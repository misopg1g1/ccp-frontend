import './detailProductModal.css'

import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Icons from '../../libs/icons'
import Input from '../../libs/input'

interface DetailProductComponentProps {
    isOpen: boolean
    handleCloseModal: any
    productData: any
}

interface DetailProductComponentState {}

class DetailProductModal extends React.Component<DetailProductComponentProps, DetailProductComponentState> {
    constructor(props: DetailProductComponentProps) {
        super(props);
    }

    render () {
        const { isOpen, handleCloseModal, productData } = this.props;
        let categories: string = '';
        if (productData && productData.categories) {
            categories = Array.prototype.map.call(
                    productData.categories, c => c.name
                ).toString()
        }

        const customStyle = {
            overlay : {
                background: "rgba(0, 0, 0, 0.7)",
                maxHeight: "100vh",
                overflowY: "auto",
                zIndex: 5
            },
            content: {
                top: '3%',
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
            <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyle} ariaHideApp={false} >
                <div className='ContentModal'>
                    <div>
                        <span className='ModalTitle'>{productData?.name}</span>
                        <div className='CloseModalButton' onClick={handleCloseModal} role='button' tabIndex={0}>
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
                                name='unit-price'
                                label='Precio unitario'
                                value={productData?.price}
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
                                name='type'
                                label='Tipo'
                                value={productData?.type}
                                classInput='ModalInput mt-8'
                                disabled={true}
                                marginTop='36px'
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='category'
                                label='Categoria'
                                value={categories}
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
                                name='expiration-date'
                                label='Fecha de expiración'
                                value={productData?.expiration_date}
                                classInput='ModalInput mt-8'
                                disabled={true}
                                marginTop='36px'
                                width='46%'
                            ></Input>
                            <Input
                                type='text'
                                name='dimensions'
                                label='Dimensiones (cm)'
                                value={productData?.dimensions}
                                classInput='ModalInput mt-8'
                                disabled={true}
                                marginTop='36px'
                                width='46%'
                                marginLeft='8%'
                            ></Input>
                        </div>
                    </React.Fragment>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProductModal)