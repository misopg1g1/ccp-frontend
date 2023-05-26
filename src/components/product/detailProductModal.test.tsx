import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import DetailProductModal from "../../components/product/detailProductModal";
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../tests/mocks/i18n';

function renderWithContext(element: any) {
  const { store } = configureStore();
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{element}</Provider>
    </I18nextProvider>
  );
  return { store };
}

const productSelected = {
  name: "Product name test",
  sku: "XYZ12345",
  expiration_date: new Date("2023/01/01").toLocaleDateString(),
  description: "Product description test",
  price: "10000",
  img_url: "http://dummyimage.com/133x100.png/5fa2dd/ffffff",
  type: "Type product test",
  categories: [
    {name: "fruits"},
  ],
  dimensions: "60 - 90 - 60"
}

describe("<DetailProductModal />", () => {

  it('Should renders with the correct fields', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <DetailProductModal
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        productData={productSelected}
      /> 
    );

    const modalTitle = screen.getByText(productSelected.name);
    expect(modalTitle).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText("Descripción del producto");
    expect(descriptionInput).toBeInTheDocument();

    const skuInput = screen.getByLabelText("SKU");
    expect(skuInput).toBeInTheDocument();

    const unitPriceInput = screen.getByLabelText("Precio unitario");
    expect(unitPriceInput).toBeInTheDocument();

    const typeInput = screen.getByLabelText("Tipo de producto");
    expect(typeInput).toBeInTheDocument();
    
    const categoryInput = screen.getByLabelText("Categoria");
    expect(categoryInput).toBeInTheDocument();

    const expirationDateInput = screen.getByLabelText("Fecha de expiración");
    expect(expirationDateInput).toBeInTheDocument();

    const dimensionsInput = screen.getByLabelText("Dimensiones (cm)");
    expect(dimensionsInput).toBeInTheDocument();
  })

  it('Should renders with the product selected', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <DetailProductModal
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        productData={productSelected}
      /> 
    );

    const imageElement: HTMLImageElement = screen.getByAltText(`Imagen del producto con nombre: ${productSelected.name}`);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(productSelected.img_url);

    const descriptionInput: HTMLInputElement = screen.getByLabelText("Descripción del producto");
    expect(descriptionInput.value).toBe(productSelected.description);

    const skuInput: HTMLInputElement = screen.getByLabelText("SKU");
    expect(skuInput.value).toBe(productSelected.sku);

    const unitPriceInput: HTMLInputElement = screen.getByLabelText("Precio unitario");
    expect(unitPriceInput.value).toBe(productSelected.price);

    const typeInput: HTMLInputElement = screen.getByLabelText("Tipo de producto");
    expect(typeInput.value).toBe(productSelected.type);
    
    const categoryInput: HTMLInputElement = screen.getByLabelText("Categoria");
    expect(categoryInput.value).toBe(productSelected.categories[0].name);

    const expirationDateInput: HTMLInputElement = screen.getByLabelText("Fecha de expiración");
    expect(expirationDateInput.value).toBe(productSelected.expiration_date);

    const dimensionsInput: HTMLInputElement = screen.getByLabelText("Dimensiones (cm)");
    expect(dimensionsInput.value).toBe(productSelected.dimensions);
  })

});