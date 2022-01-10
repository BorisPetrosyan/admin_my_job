import React, { useState, useMemo, useRef, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  t_load_all_diagnostics,
  t_delete_diagnostics,
} from "../../../../../redux/tracks";
import ReactTable from "../../../../common/ReactTable";
import Lang from "../../../../service/Lang";
import "react-tabs/style/react-tabs.css";
import CONSTANTS from "../../constants";
import ModalConfirm from "../../../../common/ModalConfirm";

const DiagnosticsLimitations = (props) => {
  const { history, lang, setLang } = props;
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteDiagnostics = useCallback(
    (props) => async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpenConfirm(true);
      setId(props.row.original._id);
    },
    []
  );

  const del = async () => {
    await dispatch(t_delete_diagnostics({ id }));
    setOpenConfirm(false);
  };

  const editDiagnostics = useCallback(
    (props) => async (e) => {
      e.preventDefault();
      e.stopPropagation();
      history.push(`/diagnostics/edit/${props.row.original._id}`, {
        diagnostic: props.row.original,
        parentPath: history?.location?.pathname || "/",
      });
    },
    []
  );
  const columns = useMemo(
    () => [
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
        Header: CONSTANTS[lang].name,
        id: "name",
        accessor: `name_${lang}`,
      },
      {
        Header: CONSTANTS[lang].point,
        id: "point",
        accessor: "max_point",
      },
      {
        Header: CONSTANTS[lang].edit,
        id: "4",
        accessor: "-",
        onClick: editDiagnostics,
        Cell: (props) => (
          <div
            className="seminars_delete"
            onClick={props.column.onClick(props)}
          >
            <svg
              fill="#000000"
              version="1.1"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m81.695 78.109c0 3.6719-2.9844 6.7656-6.6523 6.7656h-53.246c-3.6719 0-6.6523-3.0977-6.6523-6.7656l-0.003906-53.246c0-3.6719 2.9844-6.5469 6.6523-6.5469h31.059l0.003907-4.4336h-31.059c-6.1172 0-11.09 4.8672-11.09 10.984v53.242c0 6.1172 4.9766 11.199 11.09 11.199h53.242c6.1172 0 11.09-5.0859 11.09-11.199v-30.949h-4.4375v30.949z" />
                <path d="m86.695 13.207c-3.3516-3.3555-9.1953-3.3555-12.551 0l-29.762 29.762c-0.28516 0.28516-0.48828 0.64062-0.58203 1.0273l-3.1328 12.551c-0.1875 0.75391 0.035156 1.5547 0.58203 2.1094 0.42188 0.42188 0.98828 0.64844 1.5664 0.64844 0.17969 0 0.35938-0.019532 0.53906-0.066407l12.551-3.1367c0.39062-0.097656 0.74609-0.30078 1.0273-0.58203l29.762-29.762c1.6758-1.6758 2.6016-3.9023 2.6016-6.2734 0-2.375-0.92188-4.6016-2.6016-6.2773zm-32.461 38.738l-8.3672 2.0898 2.0898-8.3672 24.621-24.621 6.2734 6.2734zm29.324-29.328l-1.5664 1.5664-6.2734-6.2734 1.5664-1.5664c1.6758-1.6758 4.6016-1.6758 6.2734 0 0.83594 0.83594 1.3008 1.9492 1.3008 3.1367s-0.46484 2.2969-1.3008 3.1367z" />
              </g>
            </svg>
          </div>
        ),
      },
      {
        Header: CONSTANTS[lang].delete,
        id: "5",
        accessor: "-",
        onClick: deleteDiagnostics,
        Cell: (props) => (
          <div
            className="seminars_delete"
            onClick={props.column.onClick(props)}
          >
            <svg className="svg-icon " viewBox="0 0 20 20">
              <path
                fill="#000"
                d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"
              ></path>
              <path
                fill="#000"
                d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"
              ></path>
              <path
                fill="#000"
                d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"
              ></path>
            </svg>
          </div>
        ),
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
    async (props) => {
      const { pageSize, pageIndex } = props;
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setInitialState({ pageIndex, pageSize });
      await dispatch(
        t_load_all_diagnostics({
          page: pageIndex + 1,
          limit: pageSize,
        })
      );
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return (
    <div className="content">
      <div className="tabs_diagnostics">
        {openConfirm && (
          <ModalConfirm
            title={CONSTANTS[lang].deleteTitle}
            message={CONSTANTS[lang].deleteText}
            close={() => setOpenConfirm(false)}
            confirm={del}
          />
        )}
        <Lang active={lang} onClick={setLang} />
        <div className="container-fluid">
          <div className="btn-bottom">
            <Link
              to={{
                pathname: `/diagnostics/add`,
              }}
              className="add-btn"
            />
          </div>
          <Styles>
            <ReactTable
              columns={columns}
              data={props.diagnostics ? props.diagnostics : []}
              fetchData={fetchData}
              initialState={initialState}
              loading={loading}
              pageCount={
                props.total && props.pageSize
                  ? Math.ceil(props.total / props.pageSize)
                  : 0
              }
              total={props.total ? props.total : 0}
              getRowProps={({ original }) => {
                return {
                  onClick: () => {
                    history.push(`/diagnostics-points/${original._id}`, {
                      diagnostics: original,
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
  diagnostics: state.diagnostics.data.docs,
  total: state.diagnostics.data.totalDocs,
  pageIndex: state.diagnostics.data.page,
  pageSize: state.diagnostics.data.limit,
});

const mapDispatchToProps = (dispatch) => ({
  loadQuizs: () => {
    dispatch(t_load_all_diagnostics());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiagnosticsLimitations);
