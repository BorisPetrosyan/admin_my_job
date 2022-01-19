import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { t_save_glossary, t_delete_glossary } from "../../../redux/tracks";
import ModalConfirm from "../../common/ModalConfirm";
import CONSTANTS from "./constants";

const { REACT_APP_SERVER } = process.env;

function TableAxesEditInfo(props) {
  const { history } = props;

  const {
    location: { state },
  } = props;
  const [data, setData] = useState({ info: null, openConfirm: false });
  const publication = state?.publication;
  const lang = state?.lang || 'ru';
  const { _id } = publication;

  const del = () => {
    const {
      deleteGlossary,
      history,
    } = props;
    history.push("/publications");
    // deleteGlossary({ id: _id} );
  };
//   console.log("glossary", glossary);                      //need for public
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
              pathname: "/publications/edit/" + _id,
              state: { publication: publication, lang },
            }}
            className="edit-btn"
          />
          <button
            onClick={() => setData({ openConfirm: true })}
            className="delete-btn"
          />
        </div>
        <div className="sub-title">{CONSTANTS[lang].data}</div>

        <div className="row">
          <div className="col-4">

            <div className="profile-item">
              <div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inEn}`}</div>
                <div className="profile-item__list-value">
                  {publication.name_en}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inRu}`}</div>
                <div className="profile-item__list-value">
                  {publication.name_ru}
                </div>
              </div>

              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inRu}`}</div>
                <div className="profile-item__list-value">
                  {publication.author_ru}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inEn}`}</div>
                <div className="profile-item__list-value">
                  {publication.author_en}
                </div>
              </div>
              </div>

          </div>

          </div>
          <div className="col-4">
            <div className="profile-item__list">
              <div className="profile-item__list-title">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inEn}`}</div>
              <div className="profile-item__list-value">
                {publication.subject_en}
              </div>
            </div>
            <div className="profile-item__list">
              <div className="profile-item__list-title">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inRu}`}</div>
              <div className="profile-item__list-value">
                {publication.subject_ru}
              </div>
            </div>
            <div className="profile-item__list">
              <div className="profile-item__list-title">
                {CONSTANTS[lang].literatureLink}
              </div>
              <div className="profile-item__list-value">{publication.file}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  publication: state.publication,
});

const mapDispatchToProps = (dispatch) => ({
  saveGlossary: (payload) => {
    dispatch(t_save_glossary(payload));
  },
  // deleteGlossary: (payload) => {                       //need for public
  //   dispatch(t_delete_glossary(payload));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableAxesEditInfo);
