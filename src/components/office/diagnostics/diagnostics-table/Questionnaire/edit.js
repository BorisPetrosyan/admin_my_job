import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  t_create_quiz,
  // t_load_sections,
  t_save_quiz,
} from "../../../../../redux/tracks";
import EditableList from "../../../../common/EditableList";
import Select from "../../../../common/Select";
import CONSTANTS from "../../constants";

const LANGS = [
  { name: "English", _id: "en" },
  { name: "Russian", _id: "ru" },
];

const QuizEdit = (props) => {
  const {
    match: {
      params: { lang: pLang },
    },
  } = props;
  const {
    location: { state },
    history,
    sections,
  } = props;

  const sectionOptions = sections.map((o) => ({
    _id: o._id,
    name: o[`name_${pLang}`],
  }));

  let newQuiz = {
    section: sectionOptions?.length ? sectionOptions[0]._id : 0,
    question_en: "",
    question_ru: "",
    variants: [],
  };

  const [quiz, setQuiz] = useState(
    state?.quiz ? { ...state.quiz } : newQuiz
  );

  useEffect(() => {
    setQuiz(
      state?.quiz ? { ...state.quiz } : newQuiz
    );
  }, []);

  // useEffect(() => {
  //   props.loadSections({ diagnostics: state?.diagnostics || 0 });
  // }, []);

  const changeInput = (field, value) => {
    let q = { ...quiz };
    q[field] = value;
    setQuiz(q);
  };
  const cancel = (e) => {
    e.preventDefault();
    props.history.goBack();
  };
  const saveQuiz = (e) => {
    e.preventDefault();
    const { saveQuiz } = props;
    saveQuiz({ quiz, parentPath: state?.parentPath });
  };
  const createQuiz = (e) => {
    e.preventDefault();
    props.history.goBack();
    const { createQuiz } = props;
    createQuiz(quiz);
  };
  const saveEvent = state?.quiz ? saveQuiz : createQuiz;
  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-7">
            <form className="form" id="form-add">
            <div className="input-group">
                <div className="label">{CONSTANTS[pLang].section}</div>
                <Select
                  options={sectionOptions}
                  changeHandler={(selectedOption) =>
                    changeInput("section", selectedOption)
                  }
                  value={
                    sectionOptions.find((s) => s._id === quiz.section._id)?.name
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">
                  {CONSTANTS[pLang].question} {CONSTANTS[pLang].inRu}
                </div>
                <input
                  type="text"
                  className="input-text"
                  value={quiz.question_ru}
                  onChange={(e) => changeInput("question_ru", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">
                  {CONSTANTS[pLang].question} {CONSTANTS[pLang].inEn}
                </div>
                <input
                  type="text"
                  className="input-text"
                  value={quiz.question_en}
                  onChange={(e) => changeInput("question_en", e.target.value)}
                />
              </div>
              <div className="input-group">
                <div className="label">{CONSTANTS[pLang].variants}</div>
                <EditableList
                  list={quiz.variants}
                  onChange={(list) => changeInput("variants", list)}
                  l={pLang}
                  tr={CONSTANTS}
                  type="quiz"
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
  quiz: state,
  sections: state.sections.data
});

const mapDispatchToProps = (dispatch) => ({
  createQuiz: (payload) => {
    dispatch(t_create_quiz(payload));
  },
  saveQuiz: (payload) => {
    dispatch(t_save_quiz(payload));
  },
  // loadSections: (payload) => {
  //   dispatch(t_load_sections(payload));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizEdit);
