import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import CreateProductModal from "../../components/product/createProductModal";
import { ProductType } from '../../utils/types';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../tests/mocks/i18n';

function renderWithContext(element: any) {
  const {store} = configureStore();
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{element}</Provider>
    </I18nextProvider>
  );
  return { store };
}

describe("<CreateProductModal />", () => {

  it('Should renders with the correct fields', () => {
    const openModalCreateCustomer = true;
    const handleCloseModalCreateCustomer = vi.fn();
    renderWithContext(
      <CreateProductModal
        isOpen={openModalCreateCustomer}
        handleCloseModal={handleCloseModalCreateCustomer}
      />
    );

    const modalTitle = screen.getByText("Nuevo producto");
    expect(modalTitle).toBeInTheDocument();

    const productNameInput = screen.getByLabelText("Nombre del producto");
    expect(productNameInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText("Descripción del producto");
    expect(descriptionInput).toBeInTheDocument();

    const productTypeInput = screen.getByText("Tipo de producto");
    expect(productTypeInput).toBeInTheDocument();

    const categoryInput = screen.getByText("Categoria");
    expect(categoryInput).toBeInTheDocument();
    
    const unitPriceInput = screen.getByLabelText("Precio unitario");
    expect(unitPriceInput).toBeInTheDocument();

    const expirationDateInput = screen.getByLabelText("Fecha de expiración");
    expect(expirationDateInput).toBeInTheDocument();

    const temperaturaControlInput = screen.getByLabelText("Control de temperatura");
    expect(temperaturaControlInput).toBeInTheDocument();

    const dimensionsInput = screen.getByLabelText("Dimensiones (cm)");
    expect(dimensionsInput).toBeInTheDocument();

    const button = screen.getByText(/Guardar/i);
    expect(button).toBeInTheDocument();
  })

  it('Should create a new Product', () => {
    const openModalCreateCustomer = true;
    const handleCloseModalCreateCustomer = vi.fn();
    const { store } = renderWithContext(
      <CreateProductModal
        isOpen={openModalCreateCustomer}
        handleCloseModal={handleCloseModalCreateCustomer}
      />
    );

    // Fill form
    const productNameInput = screen.getByLabelText("Nombre del producto");
    fireEvent.change(productNameInput, { target: { value: 'Product name test' } })

    const descriptionInput = screen.getByLabelText("Descripción del producto");
    fireEvent.change(descriptionInput, { target: { value: 'Product description test' } });

    const productTypeInput = screen.getAllByRole('combobox')[0];
    fireEvent.change(productTypeInput, { target: { value: ProductType.PERISHABLE } });

    const categoryInput = screen.getAllByRole('combobox')[1];
    fireEvent.change(categoryInput, { target: { value: 'fruits' } });

    const unitPriceInput = screen.getByLabelText("Precio unitario");
    fireEvent.change(unitPriceInput, { target: { value: '10000' } });

    const expirationDateInput = screen.getByLabelText("Fecha de expiración");
    fireEvent.change(expirationDateInput, { target: { value: '12/12/2023' } });

    const temperaturaControlInput = screen.getByLabelText("Control de temperatura");
    fireEvent.change(temperaturaControlInput, { target: { value: "30" } });

    const dimensionsInput = screen.getByLabelText("Dimensiones (cm)");
    fireEvent.change(dimensionsInput, { target: { value: '30 - 50 - 50' } });

    // Click on create product
    const button = screen.getByText(/Guardar/i)
    fireEvent.click(button)
    // Asserts
    const state = store.getState();
    expect(state.product.fetching).toBeTruthy();
    expect(state.product.product.name).toBe("Product name test");
    expect(state.product.product.description).toBe("Product description test");
    expect(state.product.product.type).toBe(ProductType.PERISHABLE);
    expect(state.product.product.price).toBe(10000);
    expect(state.product.product.temperature_control).toBe("30");
    expect(state.product.product.dimensions).toBe("30 - 50 - 50");
  });

  it('Should not create when form is not valid', () => {
    const openModalCreateCustomer = true;
    const handleCloseModalCreateCustomer = vi.fn();
    const { store } = renderWithContext(
      <CreateProductModal
        isOpen={openModalCreateCustomer}
        handleCloseModal={handleCloseModalCreateCustomer}
      />
    );

    // Click on create product
    const button = screen.getByText(/Guardar/i)
    fireEvent.click(button)
    // Asserts
    const state = store.getState();
    expect(state.product.fetching).toBeFalsy();
    expect(state.product.product).toBe(null);
  });

});