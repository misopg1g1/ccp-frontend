import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import CreateUserModal from "../user/createUserModal";
import configureStore from '../../configureStore';
import { render, screen, fireEvent } from "../../utils/test-utils";
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

describe("<CreateUserModal />", () => {

  it('Should renders with the correct fields', () => {
    const toggleCreateUserModal = vi.fn()
    const openModalCreateUser = true
    renderWithContext(
      <CreateUserModal
        isOpen={openModalCreateUser}
        handleCloseModal={toggleCreateUserModal}
      />
    );
    const modalTitle = screen.getByText("Crear Usuario")
    expect(modalTitle).toBeInTheDocument()
    const inputUsername = screen.getByLabelText("Usuario")
    expect(inputUsername).toBeInTheDocument()
    const inputPassword = screen.getByText("Contraseña")
    expect(inputPassword).toBeInTheDocument()
    const inputConfirmPassword = screen.getByLabelText("Confirmar contraseña")
    expect(inputConfirmPassword).toBeInTheDocument()
    const button = screen.getByText(/Guardar/i)
    expect(button).toBeInTheDocument()
  })

  it('Should show error when password is different', () => {
    const toggleCreateUserModal = vi.fn()
    const openModalCreateUser = true
    renderWithContext(
      <CreateUserModal
        isOpen={openModalCreateUser}
        handleCloseModal={toggleCreateUserModal}
      />
    );
    const passwordInput = screen.getByLabelText('Contraseña')
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña")
    fireEvent.change(confirmPasswordInput, { target: { value: 'pasword' } })
    const ErrorMessage = screen.getByText("Confirme que las contraseñas sean iguales")
    const text = ErrorMessage.textContent;
    expect(text).toBe("Confirme que las contraseñas sean iguales");
  })

  it('Should show error when username, password and confirm password are empty', () => {
    const toggleCreateUserModal = vi.fn()
    const openModalCreateUser = true
    renderWithContext(
      <CreateUserModal
        isOpen={openModalCreateUser}
        handleCloseModal={toggleCreateUserModal}
      />
    );
    const usernameInput = screen.getByLabelText('Usuario')
    fireEvent.focusOut(usernameInput)
    const passwordInput = screen.getByLabelText('Contraseña')
    fireEvent.focusOut(passwordInput)
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña")
    fireEvent.focusOut(confirmPasswordInput)
    const ErrorMessageUsername = screen.getByText("El campo usuario es requerido")
    const ErrorMessagePassword = screen.getAllByText("El campo contraseña es requerido")
    expect(ErrorMessageUsername.textContent).toBe("El campo usuario es requerido");
    expect(ErrorMessagePassword.length).toBe(2);
  })

  it('Should create a new User', async () => {
    const toggleCreateUserModal = vi.fn()
    const openModalCreateUser = true
    const { store } = renderWithContext(
      <CreateUserModal
        isOpen={openModalCreateUser}
        handleCloseModal={toggleCreateUserModal}
      />
    );
    // Fill form
    const userInput = screen.getByLabelText("Usuario")
    fireEvent.change(userInput, { target: { value: 'user' } })
    const passwordInput = screen.getByLabelText('Contraseña')
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    const confirmPasswordInput = screen.getByLabelText("Confirmar contraseña")
    fireEvent.change(confirmPasswordInput, { target: { value: 'pasword' } })
    // Select a Role
    const role = screen.getByRole('button', {name: "Cliente"});
    fireEvent.click(role);
    // Click on create user
    const button = screen.getByText(/Guardar/i)
    fireEvent.click(button)
    // Asserts
    const state = store.getState();
    expect(state.user.fetching).toBeTruthy();
    expect(state.user.userData.user).toBe("user");
    expect(state.user.userData.password).toBe("password");
    expect(state.user.userData.verify_password).toBe("pasword");
  });
  
});