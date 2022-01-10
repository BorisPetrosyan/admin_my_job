import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { t_load_sections, t_save_points } from "../../../../../redux/tracks";
import EditableList from "../../../../common/EditableList";
import CONSTANTS from "../../constants";

const DiagnosticsEdit = (props) => {
  const {
    lang: pLang,
    location: { state },
  } = props;

  const [points, setPoints] = useState({ ...state.points });


  const changeInput = (field, value) => {
    let q = { ...points };
    q[field] = value;
    setPoints(q);
  };
  const cancel = (e) => {
    e.preventDefault();
    props.history.goBack();
  };
  const savePoints = (e) => {
    e.preventDefault();
    const { savePoints } = props;
    const { variants } = points;
    console.log(555555,points)
    savePoints({
      variants,
      diagnostic_id: points.diagnostic._id,
      quiz_id: points.quiz._id,
      parentPath: state?.parentPath,
    });
  };
  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-7">
            <form className="form" id="form-add">
              <div className="input-group">
                {CONSTANTS[pLang].section} --{" "}
                {points.quiz.section[`name_${pLang}`]}
              </div>
              <div className="input-group">
                {CONSTANTS[pLang].question} --{" "}
                {points.quiz[`question_${pLang}`]}
              </div>
              <div className="input-group">
                <h2> {CONSTANTS[pLang].variants}</h2>
                <EditableList
                  list={points.variants}
                  onChange={(list) => changeInput("variants", list)}
                  l={pLang}
                  tr={CONSTANTS}
                  answers={points.quiz.variants}
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
          onClick={(e) => savePoints(e)}
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
  points: state,
});

const mapDispatchToProps = (dispatch) => ({
  savePoints: (payload) => {
    dispatch(t_save_points(payload));
  },
  loadSections: (payload) => {
    dispatch(t_load_sections(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticsEdit);
