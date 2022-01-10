import React, { useState, useMemo, useRef, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { t_load_diagnostics_points_from_page } from "../../../../../redux/tracks";
import ReactTable from "../../../../common/ReactTable";
import Lang from "../../../../service/Lang";
import "react-tabs/style/react-tabs.css";
import CONSTANTS from "../../constants";

const Table = (props) => {
  const { history, diagnostics, lang, setLang } = props;
  // const { id } = props.match.params
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: CONSTANTS[lang].section,
        id: "0",
        accessor: `quiz.section.name_${lang}`,
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
        accessor: `quiz.question_${lang}`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 1",
        id: "3",
        accessor: `variants[0].point`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 2",
        id: "4",
        accessor: `variants[1].point`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 3",
        id: "5",
        accessor: `variants[2].point`,
      },
      {
        Header: CONSTANTS[lang].answerVariants + " 4",
        id: "6",
        accessor: `variants[3].point`,
      },
    ],
    [lang]
  );
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 100,
  });
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    async (data) => {
      const { pageSize, pageIndex } = data;
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setInitialState({ pageIndex, pageSize });
      const id = props.match.params.id
      await dispatch(
        t_load_diagnostics_points_from_page({
          page: pageIndex + 1,
          limit: pageSize,
          diagnostic: id,
        })
      );
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
      }
    },
    [dispatch, props.match.params.id]
  );
  return (
    <div className="content">
      <div className="tabs_diagnostics">
        <Lang active={lang} onClick={setLang} />
        <div className="container-fluid">
          <Styles>
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
                    history.push(`/points/info/${original._id}/${lang}`, {
                      points: original,
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
const mapStateToProps = (state) =>{ console.log("statestate",state) ; return ({
  quiz: state.diagnosticsPoints.data.docs,
  total: state.diagnosticsPoints.data.totalDocs,
  pageIndex: state.diagnosticsPoints.data.page,
  pageSize: state.diagnosticsPoints.data.limit,
})};

const mapDispatchToProps = (dispatch) => ({
  loadQuizs: () => {
    dispatch(t_load_diagnostics_points_from_page());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
