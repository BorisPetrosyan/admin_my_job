import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { t_save_glossary, t_delete_glossary } from "../../../redux/tracks";
import ModalConfirm from "../../common/ModalConfirm";
import CONSTANTS from "./constants";

const { REACT_APP_SERVER } = process.env;

function GlossaryInfo(props) {
  const { history } = props;
  const {
    location: { state },
  } = props;
  const [data, setData] = useState({ info: null, openConfirm: false });
  const glossary = state.glossary;
  const lang = state?.lang || 'ru';
  const { _id } = glossary;

  const del = () => {
    const {
      deleteGlossary,
      history,
    } = props;
    history.push("/glossary");
    deleteGlossary({ id: _id} );
  };
//   console.log("glossary", glossary);
//   console.log("props", props);
  return (
    <div className="content content-profile">
      {data.openConfirm && (
        <ModalConfirm
          title="Удаление пользователя"
          message="Вы уверенны что хотите удалить пользователя? Все данные и история переписок будут удалены"
          close={() => setData({ openConfirm: false })}
          confirm={() => del()}
        />
      )}
      <div className="container-fluid">
        <div className="btn-bottom">
          <Link
            to={{
              pathname: "/glossary-edit/" + _id,
              state: { glossary: glossary, lang },
            }}
            className="edit-btn"
          />
          <button
            onClick={() => setData({ openConfirm: true })}
            className="delete-btn"
          />
        </div>
        <div className="row">
          <div className="col-4">
            <div className="profile-item">
              <div className="sub-title">{CONSTANTS[lang].data}</div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].ingredient} ${CONSTANTS[lang].inEn}`}</div>
                <div className="profile-item__list-value">
                  {glossary.ingredient_en}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].ingredient} ${CONSTANTS[lang].inRu}`}</div>
                <div className="profile-item__list-value">
                  {glossary.ingredient_ru}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].text} ${CONSTANTS[lang].inEn}`}</div>
                <div className="profile-item__list-value">{glossary.text_en}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].text} ${CONSTANTS[lang].inRu}`}</div>
                <div className="profile-item__list-value">{glossary.text_ru}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].section} ${CONSTANTS[lang].inEn}`}</div>
                <div className="profile-item__list-value">
                  {glossary.section_en}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].section} ${CONSTANTS[lang].inRu}`}</div>
                <div className="profile-item__list-value">
                  {glossary.section_ru}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].literatureLink}
                </div>
                <div className="profile-item__list-value">{glossary.link}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  glossary: state.glossary,
});

const mapDispatchToProps = (dispatch) => ({
  saveGlossary: (payload) => {
    dispatch(t_save_glossary(payload));
  },
  deleteGlossary: (payload) => {
    dispatch(t_delete_glossary(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryInfo);
