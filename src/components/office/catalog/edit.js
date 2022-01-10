import React, { useState } from "react";
import { connect } from "react-redux";
import {
  t_create_catalog,
  t_save_catalog,
  t_upload_catalog_file,
} from "../../../redux/tracks";
import ImageUpload from "../../common/ImageUpload";
import CONSTANTS from "./constants";
import { toast } from "react-toastify";

const { REACT_APP_SERVER } = process.env;

const CatalogEdit = (props) => {
  const { history } = props;
  const {
    location: { state },
  } = props;
  let newCatalogue = {
    composition_en: "",
    composition_ru: "",
    how_to_use_en: "",
    how_to_use_ru: "",
    indications_for_use_en: "",
    indications_for_use_ru: "",
    link: "",
    problem_en: "",
    problem_ru: "",
    product_name_en: "",
    product_name_ru: "",
    volume: "",
  };
  const [catalogue, setCatalogue] = useState(
    state?.catalogue ? state.catalogue : newCatalogue
  );
  const [newImg, setNewImg] = useState(null);

  const lang = state?.lang || "ru";
  const changeInput = (field, value) => {
    let catal = { ...catalogue };
    catal[field] = value;
    setCatalogue(catal);
  };
  const cancel = (e) => {
    e.preventDefault();
    history.push("/catalog");
  };
  const saveCatalogue = (e) => {
    e.preventDefault();
    history.push("/catalog");
    const { saveCatalogue } = props;
    delete catalogue.image;
    catalogue.distributor = "";
    catalogue.file = "";
    catalogue.seminar = "";
    saveCatalogue(catalogue);
  };
  const createCatalogue = (e) => {
    e.preventDefault();
    const { createCatalogue, uploadFile } = props;
    createCatalogue(catalogue, (cat) => {
      if (catalogue.image) {
        let payload = new FormData();
        payload.append("file", catalogue.image);
        payload.append("catalogue_id", cat._id);
        uploadFile(payload);
      }
      catalogue.distributor = "";
      catalogue.file = "";
      catalogue.seminar = "";
      catalogue.image = "";
      history.push("/catalog");
    });
  };

  const updateCatImage = (acceptedFiles) => {
    handleImageUpload(acceptedFiles);
    const { uploadFile } = props;
    let payload = new FormData();
    payload.append("file", acceptedFiles[0]);
    payload.append("catalogue_id", catalogue._id);
    uploadFile(payload);
  };

  const saveEvent = state?.catalogue ? saveCatalogue : createCatalogue;

  const handleImageUpload = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setNewImg(URL.createObjectURL(acceptedFiles[0]));
      const newCat = { ...catalogue, image: acceptedFiles[0] };
      setCatalogue(newCat);
    }
  };

  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <form className="form" id="form-add">
              <div className="form-photo">
                {(catalogue.image || newImg) && (
                  <img
                    src={newImg ? newImg : REACT_APP_SERVER + catalogue.image}
                    id="img-preview"
                    alt="img"
                  />
                )}
                <ImageUpload
                  onDrop={
                    catalogue._id || catalogue._id == 0
                      ? updateCatImage
                      : handleImageUpload
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inEn}`}</div>
                <input
                  type="text"
                  className="input-text"
                  value={catalogue.product_name_en}
                  onChange={(e) =>
                    changeInput("product_name_en", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inRu}`}</div>
                <input
                  type="text"
                  className="input-text"
                  value={catalogue.product_name_ru}
                  onChange={(e) =>
                    changeInput("product_name_ru", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">{CONSTANTS[lang].link}</div>
                <input
                  type="text"
                  className="input-text"
                  value={catalogue.link}
                  onChange={(e) => changeInput("link", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{CONSTANTS[lang].volume}</div>
                <input
                  type="text"
                  className="input-text"
                  value={catalogue.volume}
                  onChange={(e) => changeInput("volume", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].composition} ${CONSTANTS[lang].inEn}`}</div>
                <textarea
                  type="text"
                  className="input-text"
                  value={catalogue.composition_en}
                  onChange={(e) =>
                    changeInput("composition_en", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].composition} ${CONSTANTS[lang].inRu}`}</div>
                <textarea
                  type="text"
                  className="input-text"
                  value={catalogue.composition_ru}
                  onChange={(e) =>
                    changeInput("composition_ru", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].howToUse} ${CONSTANTS[lang].inEn}`}</div>
                <textarea
                  className="input-text"
                  value={catalogue.how_to_use_en}
                  onChange={(e) => changeInput("how_to_use_en", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].howToUse} ${CONSTANTS[lang].inRu}`}</div>
                <textarea
                  className="input-text"
                  value={catalogue.how_to_use_ru}
                  onChange={(e) => changeInput("how_to_use_ru", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].indicationUse} ${CONSTANTS[lang].inEn}`}</div>
                <textarea
                  type="text"
                  className="input-text"
                  value={catalogue.indications_for_use_en}
                  onChange={(e) =>
                    changeInput("indications_for_use_en", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].indicationUse} ${CONSTANTS[lang].inRu}`}</div>
                <textarea
                  type="text"
                  className="input-text"
                  value={catalogue.indications_for_use_ru}
                  onChange={(e) =>
                    changeInput("indications_for_use_ru", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].problem} ${CONSTANTS[lang].inEn}`}</div>
                <textarea
                  type="text"
                  className="input-text"
                  value={catalogue.problem_en}
                  onChange={(e) => changeInput("problem_en", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].problem} ${CONSTANTS[lang].inRu}`}</div>
                <textarea
                  type="text"
                  className="input-text"
                  value={catalogue.problem_ru}
                  onChange={(e) => changeInput("problem_ru", e.target.value)}
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
  catalogue: state,
});

const mapDispatchToProps = (dispatch) => ({
  createCatalogue: (payload, onSuccess) => {
    dispatch(t_create_catalog(payload, onSuccess));
  },
  uploadFile: (payload) => {
    dispatch(t_upload_catalog_file(payload));
  },
  saveCatalogue: (payload) => {
    dispatch(t_save_catalog(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogEdit);
