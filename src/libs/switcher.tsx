import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from "../utils/types";

export default function LanguageSwitcher() {
  const [t, i18n] = useTranslation("global");
  const [language, setLanguage] = useState(i18n.language);

  const onChange = (event: any) => {
    setLanguage(event.target.className);
    i18n.changeLanguage(event.target.className)
  } 

  const options = languages.map(lang => {
    if(lang.code != language){
      return (
        <li onClick={onChange} key={lang.code}>
          <div className={lang.code} ></div>
        </li>
      )
    }  
  });
  
  return (
    <div className="languageSwitcher">
      <p className="light">
        {t("login.option-language")}
      </p>
      <div className="lang"> 
        <div className={language}>
        </div>
        <ul className="dropdown" >
          {options}
        </ul>
      </div>
    </div>
  )
}