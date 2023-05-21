import { describe, it, vi } from "vitest";
import { render, fireEvent, screen } from "../../utils/test-utils";
import LoginForm from '../login/loginForm'
import configureStore from '../../configureStore';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../tests/mocks/i18n';
import { Provider } from 'react-redux';

const loginDataMock = {
  user: 'admin',
  password: 'secret',
}

const fieldIsValid = {
  user: true,
  password: true,
}

function renderWithContext(element: any) {
  const {store} = configureStore();
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{element}</Provider>
    </I18nextProvider>
  );
  return { store };
}

describe('<LoginForm />', () => {

  it('Should renders with the correct fields', () => {
    const handleValueChange = vi.fn()
    const handleValueValid = vi.fn()
    const handleClick = vi.fn()
    renderWithContext(<LoginForm 
      fieldIsValid={fieldIsValid}
      handleValueChange={handleValueChange}
      handleValueValid={handleValueValid}
      user={loginDataMock.user}
      password={loginDataMock.password}
      onSubmit={handleClick}
      showPassword={true}
      togglePasswordVisible={null}  
    />)
    const formTitle = screen.getByText("Iniciar Sesión")
    const userInput = screen.getByLabelText(/Usuario/i)
    const passwordInput = screen.getByLabelText(/Contraseña/i)
    const button = screen.getByText(/Ingresar/i)
    expect(formTitle).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(userInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  });
})
