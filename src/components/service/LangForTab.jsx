import React from "react";
import CONSTANTS from '../office/axes/constants'

const LangForTab = ({ active, onClick ,lang}) => {

  const languages = [
    {
      name: `${CONSTANTS[lang].editNavigationRu}`,
      value: "ru",
    },
    {
      name:  `${CONSTANTS[lang].editNavigationEn}`,
      value: "en",
    },
  ];

  return (
    <div className="lang">
      {languages.map((lang) => (
        <span
          onClick={() => onClick(lang.value)}
          key={lang.value}
          className={lang.value === active ? "activeLang" : "langItem"}
        >
          {lang.name}
        </span>
      ))}
    </div>
  );
};

export default LangForTab;
