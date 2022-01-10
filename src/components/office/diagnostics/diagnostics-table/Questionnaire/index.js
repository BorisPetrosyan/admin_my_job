import React, { useState, useMemo, useRef, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { t_load_quiz_from_page } from "../../../../../redux/tracks";
import ReactTable from "../../../../common/ReactTable";
import Lang from "../../../../service/Lang";
import "react-tabs/style/react-tabs.css";
import CONSTANTS from "../../constants";

const Questionnaire = (props) => {
  const { history, diagnostics, lang, setLang } = props;
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: CONSTANTS[lang].section,
        id: "0",
        accessor: `section.name_${lang}`,
      },
      {
        Header: "N",
        id: "1",
        Cell: ({ row: { id } }) => (
          <div className="d-flex align-items-center">
            <div style={{ width: "25%" }}>{++id}</div>
          </div>
        ),
      },
      {
        Header: CONSTANTS[lang].question,
        id: "2",
        accessor: `question_${lang}`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 1",
        id: "3",
        accessor: `variants[0].answer_${lang}`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 2",
        id: "4",
        accessor: `variants[1].answer_${lang}`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 3",
        id: "5",
        accessor: `variants[2].answer_${lang}`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 4",
        id: "6",
        accessor: `variants[3].answer_${lang}`,
      },
    ],
    [lang]
  );
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 102,
  });
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    async (props) => {
      const { pageSize, pageIndex } = props;
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setInitialState({ pageIndex, pageSize });
      await dispatch(
        t_load_quiz_from_page({
          page: pageIndex + 1,
          limit: pageSize,
          diagnostics,
        })
      );
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
      }
    },
    [dispatch, diagnostics]
  );
  return (
    <div className="content">
      <div className="tabs_diagnostics">
        <Lang active={lang} onClick={setLang} />
        <div className="container-fluid">
          <div className="btn-bottom">
            <Link
              to={{
                pathname: `/quiz/add/${lang}`,
                state: { diagnostics },
              }}
              className="add-btn"
            />
          </div>
          <Styles>
              {console.log(props.quiz)}
            <ReactTable
              columns={columns}
              data={props.quiz ? props.quiz : []}
              fetchData={fetchData}
              initialState={initialState}
              loading={loading}
              deps={[diagnostics]}
              pageCount={
                props.total && props.pageSize
                  ? Math.ceil(props.total / props.pageSize)
                  : 0
              }
              total={props.total ? props.total : 0}
              getRowProps={({ original }) => {
                return {
                  onClick: () => {
                    history.push(`/quiz/info/${original._id}/${lang}`, {
                      quiz: original,
                      parentPath: history?.location?.pathname || "/",
                    });
                  },
                };
              }}
            />
          </Styles>
        </div>
      </div>
    </div>
  );
};
const Styles = styled.div`
  padding: 30px 0;
  color: black;
  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    cursor: pointer;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      font-size: 12px;
    }
    tbody tr:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .table__image {
      margin-right: 10px;
    }
  }
  .pagination {
    padding: 0.5rem;
    justify-content: center;
  }
`;
const mapStateToProps = (state) => ({
  quiz: state.quizes.data.quiz,
  total: state.quizes.data.total,
  pageIndex: state.quizes.data.pageIndex,
  pageSize: state.quizes.data.pageSize,
});

const mapDispatchToProps = (dispatch) => ({
  loadQuizs: () => {
    dispatch(t_load_quiz_from_page());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
