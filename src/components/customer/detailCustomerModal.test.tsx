import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import DetailCustomerModal from "../../components/customer/detailCustomerModal";
import { Customer } from '../../pages/customers/customer';

function renderWithContext(element: any) {
  const { store } = configureStore();
  render(
    <Provider store={store}>{element}</Provider>
  );
  return { store };
}

const customerSelected: Customer = {
  registered_name: "Acme",
  first_name: "John",
  last_name: "Doe",
  identification: {
    type: "DNI",
    number: "12345678"
  },
  seller_id: "1",
  seller_name: "Seller 1",
  address: {
    address: "Wall street",
    postal_code: "11-111-11",
    city: "New York",
    country: "United States",
    zone: "Center",
  },
  phone: "11-123456",
  email: "john.doe@acme.com"
}

describe("<DetailCustomerModal />", () => {

  it('Should renders with the correct fields', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <DetailCustomerModal
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        customer={customerSelected}
      />
    );

    const modalTitle = screen.getByText(customerSelected.registered_name);
    expect(modalTitle).toBeInTheDocument();

    const registeredNameInput = screen.getByLabelText("Razón social");
    expect(registeredNameInput).toBeInTheDocument();

    const namesInput = screen.getByLabelText("Nombres");
    expect(namesInput).toBeInTheDocument();

    const surnameInput = screen.getByLabelText("Apellidos");
    expect(surnameInput).toBeInTheDocument();
    
    const documentTypeInput = screen.getByText("Tipo de documento");
    expect(documentTypeInput).toBeInTheDocument();

    const documentNumberInput = screen.getByLabelText("Número");
    expect(documentNumberInput).toBeInTheDocument();

    const phoneInput = screen.getByLabelText("Teléfono");
    expect(phoneInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();

    const countryInput = screen.getByText("País");
    expect(countryInput).toBeInTheDocument();

    const cityInput = screen.getByText("Ciudad");
    expect(cityInput).toBeInTheDocument();

    const zoneInput = screen.getByText("Zona");
    expect(zoneInput).toBeInTheDocument();

    const sellerInput = screen.getByText("Vendedor");
    expect(sellerInput).toBeInTheDocument();
    
    const addressInput = screen.getByLabelText("Dirección");
    expect(addressInput).toBeInTheDocument();

    const postalCodeInput = screen.getByLabelText("Código postal");
    expect(postalCodeInput).toBeInTheDocument();
  })

  it('Should renders with the product selected', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    const { store } = renderWithContext(
      <DetailCustomerModal
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        customer={customerSelected}
      />
    );
  
    const registeredNameInput: HTMLInputElement = screen.getByLabelText("Razón social");
    expect(registeredNameInput.value).toBe('Acme');

    const namesInput: HTMLInputElement = screen.getByLabelText("Nombres");
    expect(namesInput.value).toBe('John');

    const surnameInput: HTMLInputElement = screen.getByLabelText("Apellidos");
    expect(surnameInput.value).toBe('Doe');
    
    const documentTypeInput: HTMLInputElement = screen.getByLabelText("Tipo de documento");
    expect(documentTypeInput.value).toBe('DNI');

    const documentNumberInput: HTMLInputElement = screen.getByLabelText("Número");
    expect(documentNumberInput.value).toBe("12345678");

    const phoneInput: HTMLInputElement = screen.getByLabelText("Teléfono");
    expect(phoneInput.value).toBe("11-123456");

    const emailInput: HTMLInputElement = screen.getByLabelText("Email");
    expect(emailInput.value).toBe("john.doe@acme.com");

    const countryInput: HTMLInputElement = screen.getByLabelText("País");
    expect(countryInput.value).toBe("United States");

    const cityInput: HTMLInputElement = screen.getByLabelText("Ciudad");
    expect(cityInput.value).toBe("New York");

    const zoneInput: HTMLInputElement = screen.getByLabelText("Zona");
    expect(zoneInput.value).toBe("Center");

    const sellerInput: HTMLInputElement = screen.getByLabelText("Vendedor");
    expect(sellerInput.value).toBe("Seller 1");
    
    const addressInput: HTMLInputElement = screen.getByLabelText("Dirección");
    expect(addressInput.value).toBe("Wall street");

    const postalCodeInput: HTMLInputElement = screen.getByLabelText("Código postal");
    expect(postalCodeInput.value).toBe("11-111-11");
  });

});