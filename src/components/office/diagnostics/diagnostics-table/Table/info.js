import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { t_save_quiz } from "../../../../../redux/tracks";
import moment from "moment";
import CONSTANTS from "../../constants";

function QuizInfo(props) {
  const {
    match: {
      params: { lang: pLang },
    },
  } = props;
  const { points, parentPath } = props.location.state || {};
  const { _id, quiz } = points;
  const { question_ru, question_en, created_at, section, variants } = quiz;

  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="btn-bottom">
          <Link
            to={{
              pathname: "/points/edit/" + _id,
              state: {
                points: points,
                parentPath: parentPath,
                // diagnostics: section.diagnostics,
              },
            }}
            className="edit-btn"
          />
        </div>

        <div className="row">
          <div className="col-8">
            <div className="sub-title">{CONSTANTS[pLang].variants}</div>
            {variants.length > 0 ? (
              <table className="table table-choose-js">
                <thead>
                  <tr>
                    <th>{CONSTANTS[pLang].number}</th>
                    <th>
                      {CONSTANTS[pLang].answer} {CONSTANTS[pLang].inRu}
                    </th>
                    <th>
                      {CONSTANTS[pLang].answer} {CONSTANTS[pLang].inEn}
                    </th>
                    <th>{CONSTANTS[pLang].point}</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((q, id) => (
                    <tr key={id}>
                      <td>{id + 1}</td>
                      <td>{q.answer_ru}</td>
                      <td>{q.answer_en}</td>
                      <td>{points.variants[id].point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>{CONSTANTS[pLang].noVariants}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="profile-item">
              <div className="sub-title">{CONSTANTS[pLang].questionData}</div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[pLang].question} {CONSTANTS[pLang].inRu}
                </div>
                <div className="profile-item__list-value">{question_ru}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[pLang].question} {CONSTANTS[pLang].inEn}
                </div>
                <div className="profile-item__list-value">{question_en}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[pLang].creationDate}
                </div>
                <div className="profile-item__list-value">
                  {moment(created_at).format("DD-MM-YYYY, HH:mm")}
                </div>
              </div>
            </div>
          </div>

          <div className=" offset-1 col-5">
            <div className="profile-item">
              <div className="sub-title">{CONSTANTS[pLang].sectionData}</div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[pLang].section} {CONSTANTS[pLang].inRu}
                </div>
                <div className="profile-item__list-value">
                  {section?.[`name_ru`]}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[pLang].section} {CONSTANTS[pLang].inEn}
                </div>
                <div className="profile-item__list-value">
                  {section?.[`name_en`]}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[pLang].creationDate}
                </div>
                <div className="profile-item__list-value">
                  {section?.created_at
                    ? moment(section.created_at).format("DD-MM-YYYY, HH:mm")
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuiz: (payload) => {
    dispatch(t_save_quiz(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizInfo);
