import "./loginForm.css";

import {FC} from 'react';
import Input from "../../libs/input";
import Icon from "../../libs/icons";
import { useTranslation } from 'react-i18next'

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
  const [t] = useTranslation("global");

  return (
    <div className="LoginForm">
      <h1 className="LoginFormTitle mt-64">{t("login.title")}</h1>
      <div className="LoginFormInputs mt-16">
        <Input
          type="text"
          name="user"
          autoComplete='true'
          label={t("login.input.username-label")}
          placeholder={t("login.input.username-placeholder")}
          value={user}
          handleValueChange={handleValueChange}
          handleValueValid={handleValueValid}
          requiredMessage={t("login.input.username-message")}
          required
          maxLength={20}
          classInput="LoginFormInput"
          forcedValid={fieldIsValid.user}
        ></Input>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          autocomplete='true'
          label={t("login.input.password-label")}
          placeholder={t("login.input.password-placeholder")}
          value={password}
          handleValueChange={handleValueChange}
          handleValueValid={handleValueValid}
          requiredMessage={t("login.input.password-message")}
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
        {t("login.button")}
      </button>
    </div>
  );
};

export default LoginForm;
