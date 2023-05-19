import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import DetailVisitModal from "../../components/visit/detailVisitModal";
import { Visit } from '../../pages/visits/visit';

function renderWithContext(element: any) {
  const { store } = configureStore();
  render(
    <Provider store={store}>{element}</Provider>
  );
  return { store };
}

const visitSelected: Visit = {
  id: "e5a20028-ecc3-4a94-a5bd-bb6c1a615ad2",
  visit_date: "2023/01/01",
  image_url: "http://dummyimage.com/133x100.png/5fa2dd/ffffff",
  description: "Visit description test",
  order_id: "1e3629ab-2adb-43de-b1b9-543a3093cf0b",
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
}

describe("<DetailVisitModal />", () => {

  it('Should renders with the correct fields', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <DetailVisitModal 
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        visit={visitSelected}
      />
    );

    const modalTitle = screen.getByText("Detalle de la visita");
    expect(modalTitle).toBeInTheDocument();

    const vistDateInput = screen.getByLabelText("Fecha");
    expect(vistDateInput).toBeInTheDocument();

    const sellerInput = screen.getByLabelText("Vendedor");
    expect(sellerInput).toBeInTheDocument();

    const customerInput = screen.getByLabelText("Cliente");
    expect(customerInput).toBeInTheDocument();
    
    const orderIdInput = screen.getByText("Orden ID");
    expect(orderIdInput).toBeInTheDocument();

    const zoneInput = screen.getByText("Zona");
    expect(zoneInput).toBeInTheDocument();

    const commentsInput = screen.getByText("Comentarios");
    expect(commentsInput).toBeInTheDocument();
  })

  
  it('Should renders with the visit selected', () => {
    const openModal = true;
    const handleCloseModal = vi.fn();
    renderWithContext(
      <DetailVisitModal 
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        visit={visitSelected}
      />
    );

    const imageElement: HTMLImageElement = screen.getByAltText("Imagen de la visita");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(visitSelected.image_url);

    const vistDateInput: HTMLInputElement = screen.getByLabelText("Fecha");
    expect(vistDateInput.value).toBe(visitSelected.visit_date);

    const sellerInput: HTMLInputElement = screen.getByLabelText("Vendedor");
    expect(sellerInput.value).toBe(`${visitSelected.seller.first_name} ${visitSelected.seller.last_name}`);

    const customerInput: HTMLInputElement = screen.getByLabelText("Cliente");
    expect(customerInput.value).toBe(visitSelected.customer.registered_name);
    
    const orderIdInput: HTMLInputElement = screen.getByLabelText("Orden ID");
    expect(orderIdInput.value).toBe(visitSelected.order_id);

    const zoneInput: HTMLInputElement = screen.getByLabelText("Zona");
    expect(zoneInput.value).toBe(visitSelected.customer.address.zone);

    const commentsInput: HTMLInputElement = screen.getByLabelText("Comentarios");
    expect(commentsInput.value).toBe(visitSelected.description);
  })

});