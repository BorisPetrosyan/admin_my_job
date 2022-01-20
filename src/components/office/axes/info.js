import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalConfirm from "../../common/ModalConfirm";
import CONSTANTS from "./constants";

const { REACT_APP_SERVER } = process.env;

function TableAxesEditInfo(props) {
  const {
    location: { state },
  } = props;
  const axes = state?.axes;
  const lang = state?.lang || 'ru';
  const { _id } = axes;
  console.log('axes', _id)
  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="btn-bottom">
          <Link
            to={{
              pathname: "/axes/edit/" + _id,
              state: { axes: axes, lang },
            }}
            className="edit-btn"
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
                  {axes.name_en}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inRu}`}</div>
                <div className="profile-item__list-value">
                  {axes.name_ru}
                </div>
              </div>

              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inRu}`}</div>
                <div className="profile-item__list-value">
                  {axes.author_ru}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inEn}`}</div>
                <div className="profile-item__list-value">
                  {axes.author_en}
                </div>
              </div>
              </div>

          </div>

          </div>
          <div className="col-4">
            <div className="profile-item__list">
              <div className="profile-item__list-title">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inEn}`}</div>
              <div className="profile-item__list-value">
                {axes.subject_en}
              </div>
            </div>
            <div className="profile-item__list">
              <div className="profile-item__list-title">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inRu}`}</div>
              <div className="profile-item__list-value">
                {axes.subject_ru}
              </div>
            </div>
            <div className="profile-item__list">
              <div className="profile-item__list-title">
                {CONSTANTS[lang].literatureLink}
              </div>
              <div className="profile-item__list-value">{axes.file}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default TableAxesEditInfo
