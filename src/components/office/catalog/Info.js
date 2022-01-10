import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";

import { a_setSelectedCatalog } from "../../../redux/actions";
import { t_load_catalog_info, t_delete_catalog } from "../../../redux/tracks";
import { positionsNames } from "../../../constants";
import CONSTANTS from "./constants";

import ModalConfirm from "../../common/ModalConfirm";

const { REACT_APP_SERVER } = process.env;

class Catalog extends Component {
  state = {
    info: null,
    openConfirm: false,
  };

  componentDidMount() {
    const {
      location: {
        state: { catalogue, lang },
      },
      selectCatalog,
      loadCatalogInfo,
    } = this.props;
    selectCatalog(catalogue);
    // console.log(catalogue)
    window.scrollTo(0, 0);
    loadCatalogInfo({
      _id: catalogue._id,
      success: (info) => {
        this.setState({ info });
      },
    });
  }

  delete = () => {
    const {
      location: {
        state: { catalogue, lang },
      },
      selectCatalog,
      deleteCatalog,
      history,
    } = this.props;
    selectCatalog(null);
    deleteCatalog(catalogue._id);
  };

  render() {
    const { catalogue , lang} = this.props.location.state;
    // console.log(this.props.location)
    const { info, openConfirm } = this.state;
    const {
      composition_en,
      composition_ru,
      created_at,
      distributor,
      file,
      how_to_use_en,
      how_to_use_ru,
      indications_for_use_en,
      indications_for_use_ru,
      link,
      problem_en,
      problem_ru,
      product_name_en,
      product_name_ru,
      seminar,
      volume,
      image,
      _id,
    } = catalogue;

    return (
      <div className="content content-profile">
        {openConfirm && (
          <ModalConfirm
            title={CONSTANTS[lang].deleteTitle}
            message={CONSTANTS[lang].deleteText}
            close={() => this.setState({ openConfirm: false })}
            confirm={() => this.delete()}
          />
        )}
        <div className="container-fluid">
          <div className="btn-bottom">
            <Link
              to={{
                pathname: "/catalog-edit/" + _id,
                state: { catalogue, lang },
              }}
              className="edit-btn"
            />
            <button
              onClick={() => this.setState({ openConfirm: true })}
              className="delete-btn"
            />
          </div>
          <div className="row">
            <div className="col-4">
              <div className="profile-item">
                <div className="profile-item__photo">
                  <img
                    src={REACT_APP_SERVER + "/" + image || ''}
                    id="img-preview"
                    alt="img"
                  />
                </div>
                {distributor?.last_name ? (
                  <div className="profile-item__name">
                    <span>{distributor?.last_name}</span>
                    <br />
                    {`${distributor?.first_name} ${distributor?.middle_name}`}
                  </div>
                ) : (
                  <div className="profile-item__name">
                    <span>{distributor?.phone_number}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="profile-item">
                <div className="sub-title">{CONSTANTS[lang].catalogData}</div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inEn}`}</div>
                  <div className="profile-item__list-value">
                    {product_name_en  || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inRu}`}</div>
                  <div className="profile-item__list-value">
                    {product_name_ru || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{`${CONSTANTS[lang].composition} ${CONSTANTS[lang].inEn}`}</div>
                  <div className="profile-item__list-value">
                    {composition_en || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{`${CONSTANTS[lang].composition} ${CONSTANTS[lang].inRu}`}</div>
                  <div className="profile-item__list-value">
                    {composition_ru || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{`${CONSTANTS[lang].problem} ${CONSTANTS[lang].inEn}`}</div>
                  <div className="profile-item__list-value">
                    {problem_en || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{`${CONSTANTS[lang].problem} ${CONSTANTS[lang].inRu}`}</div>
                  <div className="profile-item__list-value">
                    {problem_ru || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">
                    {`${CONSTANTS[lang].indicationUse} ${CONSTANTS[lang].inEn}`}
                  </div>
                  <div className="profile-item__list-value">
                    {indications_for_use_en || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">
                    {`${CONSTANTS[lang].indicationUse} ${CONSTANTS[lang].inRu}`}
                  </div>
                  <div className="profile-item__list-value">
                    {indications_for_use_ru || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">
                    {`${CONSTANTS[lang].howToUse} ${CONSTANTS[lang].inEn}`}
                  </div>
                  <div className="profile-item__list-value">
                    {how_to_use_en || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">
                    {`${CONSTANTS[lang].howToUse} ${CONSTANTS[lang].inRu}`}
                  </div>
                  <div className="profile-item__list-value">
                    {how_to_use_ru || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{CONSTANTS[lang].link}</div>
                  <div className="profile-item__list-value">
                    {link || '-'}
                  </div>
                </div>
                <div className="profile-item__list">
                  <div className="profile-item__list-title">{CONSTANTS[lang].volume}</div>
                  <div className="profile-item__list-value">
                    {volume || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  catalog: state.catalog.data,
});
const mapDispatchToProps = (dispatch) => ({
  selectCatalog: (payload) => {
    dispatch(a_setSelectedCatalog(payload));
  },
  loadCatalogInfo: (payload) => {
    dispatch(t_load_catalog_info(payload));
  },
  deleteCatalog: (payload) => {
    dispatch(t_delete_catalog(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
