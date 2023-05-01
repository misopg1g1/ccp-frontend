import "./loginForm.css";

import React, {FC} from 'react';
import Input from "../../libs/input";
import Icon from "../../libs/icons";

interface LoginFormComponentProps {
  user: string,
  password: string,
  fieldIsValid: any,
  showPassword: boolean,
  handleValueChange: any,
  handleValueValid: any,
  onSubmit: any,
  togglePasswordVisible: any
}

const LoginForm : FC<LoginFormComponentProps> = (props) => {
  const {
    fieldIsValid,
    handleValueChange,
    handleValueValid,
    user,
    password,
    showPassword,
    togglePasswordVisible,
    onSubmit,
  } = props;

  return (
    <div className="LoginForm">
      <h1 className="LoginFormTitle mt-64">Iniciar Sesión</h1>
      <div className="LoginFormInputs mt-16">
        <Input
          type="text"
          name="user"
          autoComplete='true'
          label="Usuario"
          placeholder="Escriba su usuario"
          value={user}
          handleValueChange={handleValueChange}
          handleValueValid={handleValueValid}
          requiredMessage="El campo usuario es requerido"
          required
          maxLength={20}
          classInput="LoginFormInput"
          forcedValid={fieldIsValid.user}
        ></Input>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          autocomplete='true'
          label="Contraseña"
          placeholder="Escriba su contraseña"
          value={password}
          handleValueChange={handleValueChange}
          handleValueValid={handleValueValid}
          requiredMessage="El campo contraseña es requerido"
          required
          maxLength={20}
          classInput="LoginFormInput"
          marginTop="32px"
          forcedValid={fieldIsValid.password}
          icon={
            <Icon
              className={"LoginIconInput"}
              icon={showPassword ? "eyeClosed" : "eye"}
              color="black"
              onClick={togglePasswordVisible}
            />
          }
        ></Input>
      </div>
      <button type="submit" onClick={onSubmit} className="LoginFormButton mt-32">
        Ingresar
      </button>
    </div>
  );
};

export default LoginForm;
