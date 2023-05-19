import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import AddInventoryModal from './addInventoryModal';

function renderWithContext(element: any) {
  const {store} = configureStore();
  render(
    <Provider store={store}>{element}</Provider>
  );
  return { store };
}

const productSelected = {
  id: "123456789",
  name: "Product name test",
  img_url: "http://dummyimage.com/133x100.png/5fa2dd/ffffff",
  description: "Product description test",
  sku: "XYZ12345",
  stock: "10",
}

const myPromise = new Promise(function(resolve) {
  setTimeout(function() {
    fireEvent.click(button);
  }, 3000);
});

describe("<AddInventoryModal />", () => {

  it('Should renders with the correct fields', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <AddInventoryModal
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        productData={productSelected}
      />
    );

    const modalTitle = screen.getByText(productSelected.name);
    expect(modalTitle).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText("Descripción");
    expect(descriptionInput).toBeInTheDocument();

    const skuInput = screen.getByLabelText("SKU");
    expect(skuInput).toBeInTheDocument();

    const currentStockInput = screen.getByLabelText("Stock actual");
    expect(currentStockInput).toBeInTheDocument();
    
    const addUnitsInput = screen.getByLabelText("Agregar unidades");
    expect(addUnitsInput).toBeInTheDocument();

    const button = screen.getByText(/Actualizar/i);
    expect(button).toBeInTheDocument();
  })

  it('Should renders with the product selected', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <AddInventoryModal
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        productData={productSelected}
      />
    );

    const imageElement: HTMLImageElement = screen.getByAltText(`Imagen del producto con nombre: ${productSelected.name}`);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(productSelected.img_url);

    const descriptionInput: HTMLInputElement = screen.getByLabelText("Descripción");
    expect(descriptionInput.value).toBe('Product description test');

    const skuInput: HTMLInputElement = screen.getByLabelText("SKU");
    expect(skuInput.value).toBe('XYZ12345');

    const currentStockInput: HTMLInputElement = screen.getByLabelText("Stock actual");
    expect(currentStockInput.value).toBe('10');
  })

  it('Should add units to inventory', async() => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    const { store } = renderWithContext(
      <AddInventoryModal
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        productData={productSelected}
      />
    );

    // Fill form
    const addUnitsInput = screen.getByLabelText("Agregar unidades");
    fireEvent.change(addUnitsInput, { target: { value: 10 } });

    // Click on update inventory
    const button = screen.getByText(/Actualizar/i)
    fireEvent.click(button)

    // Asserts
    const state = store.getState();
    expect(state.inventory.message).toBeFalsy();
    expect(state.inventory.productId).toBe(productSelected.id);
    expect(state.inventory.stock).toBe(10);
  });

});