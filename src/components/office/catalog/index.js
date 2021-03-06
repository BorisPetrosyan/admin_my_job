import React, { useState, useMemo, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  t_delete_catalog,
  t_load_catalog_from_page,
} from "../../../redux/tracks";
import { getCatalogName } from "../../../utils/helpers";
import ReactTable from "../../common/ReactTable";
import Lang from "../../service/Lang";
import ModalConfirm from "../../common/ModalConfirm";
import CONSTANTS from "./constants";

const { REACT_APP_SERVER } = process.env;

const Catalog = (props) => {
  const { history, lang, setLang } = props;
  const [openModal, setOpenModal] = useState(false);
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 100,
  });
  const [delId, setDelId] = useState();
  const dispatch = useDispatch();
  const catalogue = useSelector((store) => store.catalog.from_page);

  const deleteCatalogue = async () => {
    await dispatch(t_delete_catalog(delId));
    setOpenModal(false);
  };

  const onDeleteClick = useCallback(
    (props) => async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpenModal(true);
      setDelId(props.row.original._id);
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
        id: "product_name",
        accessor: `product_name_${lang}`,
      },
      {
        Header: CONSTANTS[lang].picture,
        id: "picture",
        accessor: (original) => getCatalogName(original),
        Cell: ({ row: { original } }) => (
          <div className="d-flex align-items-center">
            <div className="table__image">
              {original.image && (
                <img src={REACT_APP_SERVER + "/" + original.image} alt="img" />
              )}
            </div>
          </div>
        ),
      },
      {
        Header: CONSTANTS[lang].problem,
        id: "problem",
        accessor: `problem_${lang}`,
      },
      {
        Header: CONSTANTS[lang].indicationUse,
        id: "indications_for_use",
        accessor: `indications_for_use_${lang}`,
      },
      {
        Header: CONSTANTS[lang].howToUse,
        id: "how_to_use",
        accessor: `how_to_use_${lang}`,
      },
      {
        Header: CONSTANTS[lang].link,
        id: "link",
        accessor: "link",
      },
      {
        Header: CONSTANTS[lang].composition,
        id: "composition",
        accessor: `composition_${lang}`,
      },
      {
        Header: CONSTANTS[lang].volume,
        id: "volume",
        accessor: "volume",
      },
      {
        Header: CONSTANTS[lang].delete,
        id: "4",
        accessor: "-",
        onClick: onDeleteClick,
        Cell: (props) => (
          <div
            className="catalog_delete"
            onClick={props.column.onClick(props)}
          >
            <svg className="svg-icon " viewBox="0 0 20 20">
              <path
                fill="#000"
                d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"
             />
              <path
                fill="#000"
                d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"
             />
              <path
                fill="#000"
                d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"
             />
            </svg>
          </div>
        ),
      },
    ],
    [lang]
  );
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    async ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setInitialState({ pageIndex, pageSize });
      setLoading(true);
      await dispatch(
        t_load_catalog_from_page({ page: pageIndex + 1, limit: pageSize })
      );
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
      }
    },
    [dispatch]
  );
  return (
    <div className="seminars__tabs">
      {openModal && (
        <ModalConfirm
          title={CONSTANTS[lang].deleteTitle}
          message={CONSTANTS[lang].deleteText}
          close={() => setOpenModal(false)}
          confirm={deleteCatalogue}
        />
      )}
      <Lang active={lang} onClick={setLang} />
      <div className="content">
        <div className="container-fluid">
          <div className="btn-bottom">
            <Link to={{
              pathname: "/catalog/add",
              state: { lang }
            }} className="add-btn" />
          </div>
          <Styles>
              {console.log('catalogue.docs',catalogue)}
            <ReactTable
              columns={columns}
              data={
                catalogue && catalogue.docs
                  ? catalogue.docs
                  : []
              }
              fetchData={fetchData}
              loading={loading}
              initialState={initialState}
              total={catalogue?.totalDocs || 0}
              pageCount={catalogue ? catalogue.totalPages : 0}
              getRowProps={({ original }) => {
                return {
                  onClick: () =>
                    history.push("/catalog-info/" + original._id, {
                      catalogue: original,
                      lang
                    }),
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
export default Catalog;
