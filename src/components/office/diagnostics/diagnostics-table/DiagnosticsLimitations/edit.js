import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  t_create_diagnostic,
  t_load_sections,
  t_save_diagnostic,
} from "../../../../../redux/tracks";
import EditableList from "../../../../common/EditableList";
import Select from "../../../../common/Select";
import CONSTANTS from "../../constants";

// const LANGS = [
//   { name: "English", _id: "en" },
//   { name: "Russian", _id: "ru" },
// ];

const DiagnosticsEdit = (props) => {
  const {
    lang: pLang,
    location: { state },
  } = props;

  console.log(state,props)
  // const { history } = props;


  let newDiagnostic = {
    name_en: "",
    name_ru: "",
    max_point: 100,
  };

  const [diagnostic, setDiagnostic] = useState(
    state?.diagnostic ? { ...state.diagnostic } : newDiagnostic
  );

  // useEffect(() => {
  //   setDiagnostic(
  //     state?.diagnostic ? { ...state.diagnostic, section: state.diagnostic.section._id } : newDiagnostic
  //   );
  // }, []);

  // useEffect(() => {
  //   props.loadSections({ diagnostics: state?.diagnostics || 0 });
  // }, []);

  const changeInput = (field, value) => {
    let q = { ...diagnostic };
    q[field] = value;
    setDiagnostic(q);
  };
  const cancel = (e) => {
    e.preventDefault();
    props.history.goBack();
  };
  const saveDiagnostic = (e) => {
    e.preventDefault();
    const { saveDiagnostic } = props;
    saveDiagnostic({ diagnostic, parentPath: state?.parentPath });
  };
  const createDiagnostic = (e) => {
    e.preventDefault();
    props.history.goBack();
    const { createDiagnostic } = props;
    createDiagnostic(diagnostic);
  };
  const saveEvent = state?.diagnostic ? saveDiagnostic : createDiagnostic;
  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-7">
            <form className="form" id="form-add">
              <div className="input-group">
                <div className="label">
                  {CONSTANTS[pLang].name} {CONSTANTS[pLang].inRu}
                </div>
                <input
                  type="text"
                  className="input-text"
                  value={diagnostic.name_ru}
                  onChange={(e) => changeInput("name_ru", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">
                  {CONSTANTS[pLang].name} {CONSTANTS[pLang].inEn}
                </div>
                <input
                  type="text"
                  className="input-text"
                  value={diagnostic.name_en}
                  onChange={(e) => changeInput("name_en", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">
                  {CONSTANTS[pLang].max_point}
                </div>
                <input
                  type="text"
                  className="input-text"
                  value={diagnostic.max_point}
                  onChange={(e) => changeInput("max_point", e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="btn-confirm">
        <a onClick={(e) => cancel(e)} href="#!" className="btn-confirm__cancel">
          {CONSTANTS[pLang].cancel}
        </a>
        <a
          onClick={(e) => saveEvent(e)}
          href="#!"
          className="btn-confirm__ok"
          data-form="#form-add"
        >
          {CONSTANTS[pLang].save}
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  diagnostic: state,
});

const mapDispatchToProps = (dispatch) => ({
  createDiagnostic: (payload) => {
    dispatch(t_create_diagnostic(payload));
  },
  saveDiagnostic: (payload) => {
    dispatch(t_save_diagnostic(payload));
  },
  loadSections: (payload) => {
    dispatch(t_load_sections(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticsEdit);
