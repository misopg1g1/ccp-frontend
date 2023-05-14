import "./createProductModal.css";

import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Icons from "../../libs/icons";
import Input from "../../libs/input";
import Select from "../../libs/select";
import { createProduct } from "../../actions/product";
import { onlyNumbersRegex } from "../../utils/regex";
import { Category, ProductCreate, ProductType } from "../../utils/types";

interface CreateProductComponentProps {
  isOpen: boolean;
  handleCloseModal: any;
  createProductFunc: any;
  token: string;
  categories: Category[];
}

interface CreateProductComponentState {
  product: ProductCreate;
  fieldIsValid: any;
  value: string;
  image: any;
}

class CreateProductModal extends React.Component<
  CreateProductComponentProps,
  CreateProductComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      product: {
        name: "",
        description: "",
        type: "",
        categories: "",
        price: 0,
      },
      fieldIsValid: {
        name: true,
        description: true,
        type: true,
        categories: true,
        price: true,
      },
      value: "",
      image: null,
    };
  }

  validationsStockField: any = [
    {
      fn: (value: string) => onlyNumbersRegex.test(value),
      message: "Ingrese un valor numerico",
    },
  ];

  formIsValid = (): boolean => {
    const { product } = this.state;
    const isValid = [];
    const fieldIsValid = {
      name: true,
      description: true,
      type: true,
      categories: true,
      price: true,
    };
    if (product.name === "") {
      fieldIsValid.name = false;
      isValid.push("name");
    }
    if (product.description === "") {
      fieldIsValid.description = false;
      isValid.push("description");
    }
    if (product.type === "" || product.type === "default") {
      fieldIsValid.type = false;
      isValid.push("type");
    }
    if (product.categories === "" || product.categories === "default") {
      fieldIsValid.categories = false;
      isValid.push("categories");
    }
    if (product.price === 0) {
      fieldIsValid.price = false;
      isValid.push("price");
    }
    this.setState({ fieldIsValid: fieldIsValid });
    return isValid.length === 0;
  };

  setDefault = () => {
    this.setState({
      product: {
        name: "",
        description: "",
        type: "default",
        categories: "default",
        price: 0,
        expiration_date: "",
        dimensions: "",
        temperature_control: 0,
      },
      image: null,
    });
  };

  handleCloseModal = (event: any) => {
    this.props.handleCloseModal(event);
    this.setDefault();
  };

  imgToBase64(image: any) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        this.setState({
          product: {
            ...this.state.product,
            img_base64_data: reader.result.split(",")[1],
          },
        });
      }
    };
    reader.onerror = (error) => {
      console.error("Error converting image: ", error);
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    if (!this.formIsValid()) {
      return;
    }
    const { product } = this.state;
    product.price = Number(product.price);
    const { createProductFunc } = this.props;
    createProductFunc(product, this.props.token);
    this.handleCloseModal(event);
  };

  handleValueChange = (name: string, value: string | string[]) => {
    this.setState({
      product: {
        ...this.state.product,
        [name]: value,
      },
      fieldIsValid: {
        ...this.state.fieldIsValid,
        [name]: false,
      },
    });
  };

  handleValueValid = (name: string, valid: boolean) => {
    this.setState({
      fieldIsValid: {
        ...this.state.fieldIsValid,
        [name]: valid,
      },
    });
  };

  onImageChange = (event: any) => {
    this.setState({ image: URL.createObjectURL(event.target.files[0]) });
    this.imgToBase64(event.target.files[0]);
  };

  render() {
    const { isOpen } = this.props;
    const { product, fieldIsValid, image } = this.state;
    const customStyle = {
      overlay: {
        background: "rgba(0, 0, 0, 0.7)",
        maxHeight: "100vh",
        overflowY: "auto",
        zIndex: 5
      },
      content: {
        top: "3%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width: '650px',
        transform: "translate(-50%, 0%)",
        background: "rgba(244, 245, 247, 1)",
      },
    };
    const optionsType = [
      { label: "Seleccione un tipo", value: "default" },
      { label: "Perecedero", value: ProductType.PERISHABLE },
      { label: "No Perecedero", value: ProductType.NONPERISHABLE },
    ];
    const optionsCategory = [
      { label: "Seleccione una categoria", value: "default" },
    ].concat(
      Object.values(this.props.categories || []).map((category) => ({
        label: category.name,
        value: category.name,
      }))
    );

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.handleCloseModal}
        style={customStyle}
        ariaHideApp={false}
      >
        <div className="ContentModal">
          <div>
            <span className="ModalTitle">Nuevo producto</span>
            <div
              className="CloseModalButton"
              onClick={this.handleCloseModal}
              role="button"
              tabIndex={0}
            >
              <Icons icon="close" className="left-icon" color="#000000" />
            </div>
          </div>
          <React.Fragment>
            <img className="ProductImage mt-16" src={image} alt="Product Image"></img>
            <input
              className="mt-8"
              type="file"
              multiple
              accept="image/*"
              onChange={this.onImageChange}
            />
            <Input
              type="text"
              name="name"
              label="Nombre del producto"
              placeholder="Escribe el nombre del producto"
              value={product.name}
              handleValueChange={this.handleValueChange}
              handleValueValid={this.handleValueValid}
              classInput="Input mt-8"
              marginTop="36px"
              required={true}
              requiredMessage="El campo es requerido"
              forcedValid={fieldIsValid.name}
            ></Input>
            <Input
              type="text"
              name="description"
              label="Descripción del producto"
              placeholder="Escribe la descripción del producto"
              value={product.description}
              handleValueChange={this.handleValueChange}
              handleValueValid={this.handleValueValid}
              classInput="Input mt-8"
              marginTop="36px"
              required={true}
              requiredMessage="El campo es requerido"
              forcedValid={fieldIsValid.description}
            ></Input>
            <div className="ModalContainerTwoColumns">
              <Select
                name="type"
                label="Tipo de producto"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={product.type}
                defaultOption="Seleccione un tipo"
                options={optionsType}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.type}
                marginTop="36px"
                width="46%"
                classSelect="Input mt-8"
              />
              <Select
                name="categories"
                label="Categoria"
                handleValueValid={this.handleValueValid}
                handleValueChange={(name: string, value: string) =>
                  this.handleValueChange(name, [value])
                }
                value={product.categories}
                defaultOption="Seleccione una categoria"
                options={optionsCategory}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.categories}
                classSelect="Input mt-8"
                marginTop="36px"
                width="46%"
                marginLeft="8%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="price"
                label="Precio unitario"
                placeholder="100.000,00"
                value={product.price}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="36px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.price}
                validations={this.validationsStockField}
                width="46%"
              ></Input>
              <Input
                type="date"
                name="expiration_date"
                label="Fecha de expiración"
                placeholder="dd/mm/aaaa"
                value={product.expiration_date}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="36px"
                width="46%"
                marginLeft="8%"
              ></Input>
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="temperature_control"
                label="Control de temperatura"
                placeholder="temperature_control"
                value={product.temperature_control}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="36px"
                validations={this.validationsStockField}
                width="46%"
              ></Input>
              <Input
                type="text"
                name="dimensions"
                label="Dimensiones (cm)"
                placeholder="Ancho - Alto - Largo"
                value={product.dimensions}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="36px"
                width="46%"
                marginLeft="8%"
              ></Input>
            </div>
            <div>
              <button
                type="submit"
                className="ModalButton mt-32"
                onClick={this.handleSubmit}
              >
                Guardar
              </button>
            </div>
          </React.Fragment>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  token: state.login.token,
  categories: state.category.categories,
});

const mapDispatchToProps = {
  createProductFunc: createProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal);
