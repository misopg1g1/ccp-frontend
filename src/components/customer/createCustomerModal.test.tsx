import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import CreateCustomerModal from "../../components/customer/createCustomerModal";

function renderWithContext(element: any) {
  const {store} = configureStore();
  const initialState = {...store,
    country: {
      countries: ["Colombia"],
      cities: ["Bogota"]
    },
    login: {
      token: ""
    }, 
    seller: {
      sellers: [
        {
          id: "1",
          first_name: "Pedro",
          last_name: "Perez"
        }
      ]
    }
  }
  render(
    <Provider store={initialState}>{element}</Provider>
  );
  return { store };
}

describe("<CreateCustomerModal />", () => {

  it('Should renders with the correct fields', () => {
    const openModalCreateCustomer = true;
    const handleCloseModalCreateCustomer = vi.fn();
    renderWithContext(
      <CreateCustomerModal
        isOpen={openModalCreateCustomer}
        handleCloseModal={handleCloseModalCreateCustomer}
      />
    );

    const modalTitle = screen.getByText("Nuevo Cliente");
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

    const button = screen.getByText(/Guardar/i);
    expect(button).toBeInTheDocument();
  })

  it('Should create a new Customer', () => {
    const openModalCreateCustomer = true;
    const handleCloseModalCreateCustomer = vi.fn();
    const { store } = renderWithContext(
      <CreateCustomerModal
        isOpen={openModalCreateCustomer}
        handleCloseModal={handleCloseModalCreateCustomer}
      />
    );

    // Fill form
    const registeredNameInput = screen.getByLabelText("Razón social");
    fireEvent.change(registeredNameInput, { target: { value: 'resgistered name test' } })

    const namesInput = screen.getByLabelText("Nombres");
    fireEvent.change(namesInput, { target: { value: 'first names test' } });

    const surnameInput = screen.getByLabelText("Apellidos");
    fireEvent.change(surnameInput, { target: { value: 'second names test' } });

    const documentTypeInput = screen.getAllByRole('combobox')[0];
    fireEvent.change(documentTypeInput, { target: { value: 'DNI' } });

    const documentNumberInput = screen.getByLabelText("Número");
    fireEvent.change(documentNumberInput, { target: { value: '12345678' } });

    const phoneInput = screen.getByLabelText("Teléfono");
    fireEvent.change(phoneInput, { target: { value: '1234578' } });

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "name.surname@email.com" } });

    const countryInput = screen.getAllByRole('combobox')[1];
    fireEvent.change(countryInput, { target: { value: 'Colombia' } });

    const cityInput = screen.getAllByRole('combobox')[2];
    fireEvent.change(cityInput, { target: { value: 'Bogota' } });

    const zoneInput = screen.getAllByRole('combobox')[3];
    fireEvent.change(zoneInput, { target: { value: 'ZONA NORTE' } });

    const sellerInput = screen.getAllByRole('combobox')[4];
    fireEvent.change(sellerInput, { target: { value: '1' } });
    
    const addressInput = screen.getByLabelText("Dirección");
    fireEvent.change(addressInput, { target: { value: '5ht avenue - wall street' } });

    const postalCodeInput = screen.getByLabelText("Código postal");
    fireEvent.change(postalCodeInput, { target: { value: '111111' } });

    // Click on create customer
    const button = screen.getByText(/Guardar/i)
    fireEvent.click(button)
    // Asserts
    const state = store.getState();
    expect(state.customer.fetching).toBeTruthy();
    expect(state.customer.customer.registered_name).toBe("resgistered name test");
    expect(state.customer.customer.first_name).toBe("first names test");
    expect(state.customer.customer.last_name).toBe("second names test");
    expect(state.customer.customer.identification.number).toBe("12345678");
    expect(state.customer.customer.identification.type).toBe("DNI");
    expect(state.customer.customer.phone).toBe("1234578");
    expect(state.customer.customer.email).toBe("name.surname@email.com");
  });

});