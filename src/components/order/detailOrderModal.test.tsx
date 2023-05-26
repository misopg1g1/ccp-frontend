import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import DetailOrderModal from "../../components/order/detailOrderModal";
import { Order } from '../../pages/orders/order';
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

const orderSelected: Order = {
  id: "12345678",
  status: "CREATED",
  grand_total: 100000,
  discount: 1000,
  delivery_date: "2023/01/01",
  seller: {
    id: "12345678",
    first_name: "Peter",
    last_name: "Parker"
  },
  customer: {
    registered_name: "Acme",
    first_name: "John",
    last_name: "Doe",
    identification: {
      type: "DNI",
      number: "12345678"
    },
    seller_id: "1",
    seller_name: "Peter Parker",
    phone: "123-12345",
    email: "john.doe@acme.com",
    address: {
      address: "Wall Street",
      city: "New York",
      country: "United States",
      zone: "CENTRO"
    }
  },
  items: [],
}

describe("<DetailOrderModal />", () => {

  it('Should renders with the correct fields', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <DetailOrderModal 
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        order={orderSelected}
      />
    );

    const modalTitle = screen.getByText("Detalle de la orden");
    expect(modalTitle).toBeInTheDocument();

    const customerInput = screen.getByLabelText("Cliente");
    expect(customerInput).toBeInTheDocument();

    const sellerInput = screen.getByLabelText("Vendedor");
    expect(sellerInput).toBeInTheDocument();

    const totalAmountInput = screen.getByLabelText("Valor de venta");
    expect(totalAmountInput).toBeInTheDocument();
    
    const discountInput = screen.getByText("Descuento");
    expect(discountInput).toBeInTheDocument();
  })

  it('Should renders with the product selected', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <DetailOrderModal 
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        order={orderSelected}
      />
    );

    const customerInput: HTMLInputElement = screen.getByLabelText("Cliente");
    expect(customerInput.value).toBe("Acme");

    const sellerInput: HTMLInputElement = screen.getByLabelText("Vendedor");
    expect(sellerInput.value).toBe("Peter Parker");

    const totalAmountInput: HTMLInputElement = screen.getByLabelText("Valor de venta");
    expect(totalAmountInput.value).toBe("100000");
    
    const discountInput: HTMLInputElement = screen.getByLabelText("Descuento");
    expect(discountInput.value).toBe("1000");
  });

});