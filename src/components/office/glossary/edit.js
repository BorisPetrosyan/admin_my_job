import React, { useState } from "react";

import { connect } from "react-redux";
import { toast } from "react-toastify";

import { t_create_glossary, t_save_glossary } from "../../../redux/tracks";

import CONSTANTS from "./constants";

const GlossaryEdit = (props) => {
  const { history } = props;
  const { _id } = props.location.state.glossary
    ? props.location.state.glossary
    : null;
  const {
    location: { state },
  } = props;
  let newGlossary = {
    ingredient_en: "",
    ingredient_ru: "",
    section_en: "",
    section_ru: "",
    text_en: "",
    text_ru: "",
    link: "",
    file: "",
  };
  const [glossar, setGlossary] = useState(
    state.glossary.docs ? newGlossary : state.glossary
  );

  console.log('glossarrrrrr', glossar)
  const lang = state?.lang || 'ru';
  const changeInput = (field, value) => {
    let gloss = { ...glossar };
    gloss[field] = value;
    setGlossary(gloss);
  };
  const cancel = (e) => {
    e.preventDefault();
    history.push("/glossary");
  };
  const saveGlossary = (e) => {
    e.preventDefault();
    history.push("/glossary");
    const { saveGlossary } = props;
    saveGlossary(glossar);
  };
  const createGlossary = (e) => {
    e.preventDefault();
    history.push("/glossary");
    const { createGlossary } = props;
    createGlossary(glossar);
  };
  const handleImageUpload = (acceptedFiles) => {
    const {
      uploadAvatar,
      users: { selectedUser },
    } = this.props;
    if (selectedUser) {
      let payload = new FormData();
      payload.append("file", acceptedFiles[0]);
      payload.append("user_id", selectedUser._id);
      uploadAvatar(payload);
    } else {
      toast.info("Не реализовано для создания пользователя");
    }
  };
  const saveEvent = state.glossary.docs ? createGlossary : saveGlossary;
  console.log(saveEvent)
  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="form-photo">              
            </div>
            <form className="form" id="form-add">
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].ingredient} ${CONSTANTS[lang].inEn}`}</div>
                <input
                  type="text"
                  className="input-text"
                  value={glossar.ingredient_en}
                  onChange={(e) => changeInput("ingredient_en", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].ingredient} ${CONSTANTS[lang].inRu}`}</div>
                <input
                  type="text"
                  className="input-text"
                  value={glossar.ingredient_ru}
                  onChange={(e) => changeInput("ingredient_ru", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].text} ${CONSTANTS[lang].inEn}`}</div>
                <textarea
                  type="textarea"
                  className="input-text"
                  value={glossar.text_en}
                  onChange={(e) => changeInput("text_en", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].text} ${CONSTANTS[lang].inRu}`}</div>
                <textarea
                  type="textarea"
                  className="input-text"
                  value={glossar.text_ru}
                  onChange={(e) => changeInput("text_ru", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].section} ${CONSTANTS[lang].inEn}`}</div>
                <input
                  type="text"
                  className="input-text"
                  value={glossar.section_en}
                  onChange={(e) => changeInput("section_en", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].section} ${CONSTANTS[lang].inRu}`}</div>
                <input
                  type="text"
                  className="input-text"
                  value={glossar.section_ru}
                  onChange={(e) => changeInput("section_ru", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{CONSTANTS[lang].literatureLink}</div>
                <input
                  type="text"
                  className="input-text"
                  value={glossar.link}
                  onChange={(e) => changeInput("link", e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="btn-confirm">
        <a onClick={(e) => cancel(e)} href="#!" className="btn-confirm__cancel">
          {CONSTANTS[lang].cancel}
        </a>
        <a
          onClick={(e) => saveEvent(e)}
          href="#!"
          className="btn-confirm__ok"
          data-form="#form-add"
        >
          {CONSTANTS[lang].save}
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  glossary: state,
});

const mapDispatchToProps = (dispatch) => ({
  saveGlossary: (payload) => {
    dispatch(t_save_glossary(payload));
  },
  createGlossary: (payload) => {
    dispatch(t_create_glossary(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryEdit);
