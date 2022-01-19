import React, {useState, useMemo, useRef, useCallback, Fragment, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { t_load_users_from_page } from "../../../redux/tracks";
import { getUserName } from "../../../utils/helpers";

import ReactTable from "../../common/ReactTable";

const { REACT_APP_SERVER } = process.env;

const Users = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users.from_page);
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 100,
  });
  const columns = useMemo(
    () => [
      {
        Header: "ФИО",
        id: "fio",
        accessor: (u) => getUserName(u),
        Cell: ({ row: { original } }) => (
          <div className="d-flex align-items-center">
            <div className="table__image">
              {original.image && (
                <img src={REACT_APP_SERVER + original.image} alt="img" />
              )}
            </div>
            <div style={{ width: "65%" }}>{getUserName(original)}</div>
          </div>
        ),
      },
      {
        Header: "Компании",
        id: "companies",
        accessor: (u) => u.companies.map((c) => c.name),
        Cell: ({ cell: { value } }) => {
          return value.length > 0
            ? value.map((c, id) => (
                <span key={id} className="tag">
                  {c}
                </span>
              ))
            : "-";
        },
      },
      {
        Header: "Подразделение",
        id: "departments",
        accessor: (u) => u.departments.map((d) => d.name),
        Cell: ({ cell: { value } }) => {
          return value.length > 0
            ? value.map((d, id) => (
                <span key={id} className="tag">
                  {d}
                </span>
              ))
            : "-";
        },
      },
      {
        Header: "Должность",
        id: "post",
        accessor: (u) => u.post || "-",
      },
      {
        Header: "Теги",
        id: "tags",
        accessor: (u) => u.tags.map((t) => t.name),
        Cell: ({ cell: { value } }) => {
          return value.length > 0
            ? value.map((t, id) => (
                <span key={id} className="tag">
                  {t}
                </span>
              ))
            : "-";
        },
      },
      {
        Header: "Позиция",
        id: "position",
        accessor: (u) => (u.position ? u.position.name : "-"),
      },
      {
        Header: "Роль",
        id: "role",
        accessor: (u) => (u.role ? u.role.name : "-"),
      },
      {
        Header: "Контакты",
        accessor: "phone_number",
        Cell: ({ cell: { value }, row: { original } }) => (
          <Fragment>
            <div>{value}</div>
            <div>{original.email}</div>
          </Fragment>
        ),
      },
    ],
    []
  );

  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    async ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setInitialState({ pageIndex, pageSize });
      setLoading(true);
      await dispatch(
        t_load_users_from_page({ page: pageIndex + 1, limit: pageSize })
      );
      // if (fetchId === fetchIdRef.current) {
      //   setLoading(false);
      // }
    },
    [dispatch]
  );
    useEffect(() => {
        if(users)setLoading(false)
    },users)
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="btn-bottom">
          <Link to="/users/add" className="add-btn" />
        </div>
        <Styles>
          <ReactTable
            columns={columns}
            data={users ? users.docs : []}
            fetchData={fetchData}
            loading={loading}
            initialState={initialState}
            total={users ? users.totalDocs : 0 }
            pageCount={users ? users.totalPages : 0}
            getRowProps={({ original }) => {
              return {
                onClick: () => {
                  history.push("/users/info/" + original._id, {
                    user: original,
                  });
                },
              };
            }}
          />
        </Styles>
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
export default Users;
