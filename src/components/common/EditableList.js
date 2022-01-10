import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const EditableList = ({ list, onChange, l, tr, type, answers = [] }) => {
  const lang = l || "ru";
  const CONSTANTS = tr || {};
  const [aList, setAList] = useState(list || []);
  const obj =
    type === "quiz"
      ? {
          answer_en: "",
          answer_ru: "",
          id: aList.length,
        }
      : {
          point: 1,
          id: aList.length,
        };
  const [vers, setVers] = useState(obj);

  const listItems = React.useMemo(
    () =>
      aList.map((item, index) => (
        <li key={index} className="list__item">
          {type ? (
            <div
              style={{
                width: "-webkit-fill-available",
                paddingBottom: "20px",
                borderBottom: "1px solid #aaa",
              }}
            >
              <div className="label" style={{ marginTop: "10px" }}>
                {CONSTANTS[lang]?.answerVariants} {CONSTANTS[lang]?.inRu}
              </div>
              <input
                type="text"
                className="input-text"
                value={item.answer_ru}
                onChange={(e) => {
                  const newList = [...aList];
                  newList[index].answer_ru = e.target.value;
                  setAList(newList);
                }}
              />
              <div className="label" style={{ marginTop: "5px" }}>
                {CONSTANTS[lang]?.answerVariants} {CONSTANTS[lang]?.inEn}
              </div>
              <input
                type="text"
                className="input-text"
                value={item.answer_en}
                onChange={(e) => {
                  const newList = [...aList];
                  newList[index].answer_en = e.target.value;
                  setAList(newList);
                }}
              />
            </div>
          ) : (
            answers[index][`answer_${lang}`] && (
              <div
                style={{
                  width: "-webkit-fill-available",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #aaa",
                }}
              >
                {CONSTANTS[lang]?.answerVariants} --{" "}
                {answers[index][`answer_${lang}`]}
                <div className="label" style={{ marginTop: "5px" }}>
                  {CONSTANTS[lang]?.point}
                </div>
                <input
                  type="number"
                  className="input-text"
                  value={item.point}
                  onChange={(e) => {
                    const newList = [...aList];
                    newList[index].point = Number(e.target.value);
                    setAList(newList);
                  }}
                />
              </div>
            )
          )}
          {type === "quiz" && (
            <button className="btn" onClick={(e) => removeAnswer(index, e)}>
              -
            </button>
          )}
        </li>
      )),
    [aList]
  );

  const removeAnswer = (index, e) => {
    e.preventDefault();
    const newList = [...aList];
    newList.splice(index, 1);
    setAList(newList);
    onChange(newList);
  };

  const addAnswer = (e) => {
    e.preventDefault();
    setAList([...aList, vers]);
    onChange([...aList, vers]);
    setVers({
      answer_en: "",
      answer_ru: "",
      point: 1,
      id: aList.length,
    });
  };
  return (
    <div>
      <Styles>
        <ul className="list">
          {listItems}
          {type === "quiz" && (
            <div className="list__item">
              <div
                style={{
                  width: "-webkit-fill-available",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #aaa",
                }}
              >
                <div className="label" style={{ marginTop: "10px" }}>
                  {CONSTANTS[lang]?.answerVariants} {CONSTANTS[lang]?.inRu}
                </div>
                <input
                  type="text"
                  className="input-text"
                  value={vers.answer_ru}
                  onChange={(e) =>
                    setVers({ ...vers, answer_ru: e.target.value })
                  }
                />
                <div className="label" style={{ marginTop: "5px" }}>
                  {CONSTANTS[lang]?.answerVariants} {CONSTANTS[lang]?.inEn}
                </div>
                <input
                  type="text"
                  className="input-text"
                  value={vers.answer_en}
                  onChange={(e) =>
                    setVers({ ...vers, answer_en: e.target.value })
                  }
                />
              </div>
              <button className="btn" onClick={addAnswer}>
                +
              </button>
            </div>
          )}
        </ul>
      </Styles>
    </div>
  );
};

const Styles = styled.div`
  .list {
    padding-inline-start: 10px;
  }
  .list__item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .list__item button {
    width: 42px;
    height: 42px;
    background: none;
    border: 0.5px gray solid;
    margin-left: 10px;
  }

  .list__item input {
    width: 90%;
  }
`;

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditableList);
