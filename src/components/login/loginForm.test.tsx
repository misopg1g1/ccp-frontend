import { describe, it, vi } from "vitest";
import { render, fireEvent } from "../../utils/test-utils";
import LoginForm from '../login/loginForm'

const loginDataMock = {
  user: 'admin',
  password: 'secret',
}

const fieldIsValid = {
  user: true,
  password: true,
}

describe('<LoginForm />', () => {

  it('Should renders with the correct fields', () => {
    const handleValueChange = vi.fn()
    const handleValueValid = vi.fn()
    const handleClick = vi.fn()
    const { getByText, getByLabelText } = render(<LoginForm 
      fieldIsValid={fieldIsValid}
      handleValueChange={handleValueChange}
      handleValueValid={handleValueValid}
      user={loginDataMock.user}
      password={loginDataMock.password}
      onSubmit={handleClick}
      showPassword={true}
      togglePasswordVisible={null}  
    />)
    const formTitle = getByText(/Iniciar Sesión/i)
    const userInput = getByLabelText(/Usuario/i)
    const passwordInput = getByLabelText(/Contraseña/i)
    const button = getByText(/Ingresar/i)
    expect(formTitle).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(userInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  });
})
