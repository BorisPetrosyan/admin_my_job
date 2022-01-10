import React from "react";

const Lang = (props) => {
  const { active, onClick } = props;
  
  const languages = [
    {
      name: "RU",
      value: "ru",
    },
    {
      name: "EN",
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

export default Lang;
