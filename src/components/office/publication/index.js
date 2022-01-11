import React, { useState, useMemo, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { t_load_glossary_from_page, t_delete_glossary } from "../../../redux/tracks";
// import { getGlossaryName } from "../../../utils/helpers";
import ReactTable from "../../common/ReactTable";
import Lang from "../../service/Lang";
import ModalConfirm from "../../common/ModalConfirm";
import CONSTANTS from "./constants";

// const { REACT_APP_SERVER } = process.env;


const Publication = (props) => {

  const [data, setData] = useState(
      [{"_id":1,"name_en":"Meejo","name_ru":"Миджо","author_en":"Tatiania","author_ru":"Татьяна","subject_en":"Plumbing & Medical Gas","subject_ru":"Сантехника и медицинский газ","add_date":"07/23/2021","isActive":true,"file":"DonecPharetraMagna.tiff"},
        {"_id":2,"name_en":"Avavee","name_ru":"Авави","author_en":"Mattie","author_ru":"Мэтти","subject_en":"Hard Tile & Stone","subject_ru":"Жесткая плитка и камень","add_date":"02/11/2021","isActive":true,"file":"LiberoNullam.doc"},
        {"_id":3,"name_en":"Kazu","name_ru":"Кадзу","author_en":"Harmonia","author_ru":"Гармония","subject_en":"Marlite Panels (FED)","subject_ru":"Марлитовые панели (ФЭД)","add_date":"03/09/2021","isActive":true,"file":"Metus.ppt"},
        {"_id":4,"name_en":"Yata","name_ru":"Ята","author_en":"Chev","author_ru":"Чев","subject_en":"Prefabricated Aluminum Metal Canopies","subject_ru":"Сборные алюминиевые металлические навесы","add_date":"02/18/2021","isActive":true,"file":"BlanditNamNulla.doc"},
        {"_id":5,"name_en":"Twitterbridge","name_ru":"Твиттербридж","author_en":"Zach","author_ru":"Зак","subject_en":"Soft Flooring and Base","subject_ru":"Мягкий пол и основание","add_date":"04/11/2021","isActive":true,"file":"UtDolor.mp3"},
        {"_id":6,"name_en":"Zoonoodle","name_ru":"Зунудл","author_en":"Sherri","author_ru":"Шерри","subject_en":"Masonry","subject_ru":"Каменная кладка","add_date":"05/12/2021","isActive":true,"file":"In.jpeg"},
        {"_id":7,"name_en":"Zooxo","name_ru":"Зооксо","author_en":"Cloe","author_ru":"Хлоя","subject_en":"Construction Clean and Final Clean","subject_ru":"Строительная уборка и окончательная уборка","add_date":"01/26/2021","isActive":true,"file":"PosuereCubilia.png"},
        {"_id":8,"name_en":"Yata","name_ru":"Ята","author_en":"Moselle","author_ru":"Мозель","subject_en":"Masonry","subject_ru":"Каменная кладка","add_date":"02/08/2021","isActive":false,"file":"SapienDignissimVestibulum.avi"},
        {"_id":9,"name_en":"Voomm","name_ru":"Воомм","author_en":"Jelene","author_ru":"Джелен","subject_en":"Ornamental Railings","subject_ru":"Декоративные перила","add_date":"09/20/2021","isActive":true,"file":"Consequat.gif"},
        {"_id":10,"name_en":"Flashpoint","name_ru":"Точка возгорания","author_en":"Tammara","author_ru":"Таммара","subject_en":"Waterproofing & Caulking","subject_ru":"Гидроизоляция и уплотнение","add_date":"08/02/2021","isActive":true,"file":"In.xls"},
        {"_id":11,"name_en":"Twinte","name_ru":"Твинте","author_en":"Griffy","author_ru":"Гриффи","subject_en":"EIFS","subject_ru":"Сантехника и медицинский газ","add_date":"12/04/2021","isActive":true,"file":"Hac.mpeg"},]);

  const { history, lang, setLang } = props;
  const [openModal, setOpenModal] = useState(false);
  const [delId, setDelId] = useState();
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  const glossary = useSelector((store) => store.glossary.from_page);
  console.log("history", "props", glossary);

  const deleteGlossary = async () => {
    await dispatch(t_delete_glossary({ id: delId }));
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

    const onChangeStatus = useCallback(
        (props) => async (e) => {
            console.log(props.original._id)
            e.stopPropagation();
        },
        []
    );

  const columns = useMemo(
    () => [
      {
        Header: "N",
        id: "id",
        accessor: `_id`,
        // Cell: ({ row: { id } }) => (
        //   <div className="d-flex align-items-center" >
        //     <div style={{ width: "25%" }}>{++id}</div>
        //   </div>
        // ),
      },
      {
        Header: CONSTANTS[lang].name,
        id: "name",
        accessor: `name_${lang}`,
      },
      {
        Header: CONSTANTS[lang].author,
        id: "author",
        accessor: `author_${lang}`,
      },
      {
        Header: CONSTANTS[lang].subject,
        id: "text",
        accessor: `subject_${lang}`,
      },
      {
        Header: CONSTANTS[lang].date_add,
        id: "addDate",
        accessor: "add_date",

      },
        {
            id: 'selection',
            Header: CONSTANTS[lang].turnOnOff,
            accessor: "-",
            onClick: onChangeStatus,
            Cell: ({ row ,column}) => (
                <div className='public-switcher' >
                        {/*{console.log(column)}*/}
                        <input
                            className="settings-check"
                            type="checkbox"
                            defaultChecked={row.original.isActive}
                            onChange={column.onClick(row)}
                        />
                        <label/>

                </div>
            ),
            // Header: CONSTANTS[lang].turnOnOff,
            // id: "turnOnOff",
            // accessor: "",
        },
      // {
      //   Header: CONSTANTS[lang].delete,
      //   id: "4",
      //   accessor: "-",
      //   onClick: onDeleteClick,
      //   Cell: (props) => (
      //     <div
      //       className="glossary_delete"
      //       onClick={props.column.onClick(props)}
      //     >
      //
      //       <svg className="svg-icon " viewBox="0 0 20 20">
      //         <path
      //           fill="#000"
      //           d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"
      //         />
      //         <path
      //           fill="#000"
      //           d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"
      //        />
      //         <path
      //           fill="#000"
      //           d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"
      //         />
      //       </svg>
      //     </div>
      //   ),
      // },
    ],
    [lang, onChangeStatus, onDeleteClick,onChangeStatus]
  );

  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const fetchData = useCallback(
    async ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setInitialState({ pageIndex, pageSize });
      setLoading(true);
      await dispatch(
        t_load_glossary_from_page({ page: pageIndex + 1, limit: pageSize })
      );
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
      }
    },
    [dispatch]
  );


  return (
    <div className="seminars__tabs xs">
      {openModal && (
        <ModalConfirm
          title={CONSTANTS[lang].deleteTitle}
          message={CONSTANTS[lang].deleteText}
          close={() => setOpenModal(false)}
          confirm={deleteGlossary}
        />
      )}
      <Lang active={lang} onClick={setLang} />
      <div className="content">
        <div className="container-fluid">
          <div className="btn-bottom">
            <Link
              to={{
                pathname: "/publications/add",
                state: { publication: glossary, lang },
              }}
              className="add-btn"
            />
          </div>
          <Styles>

            <ReactTable
              columns={columns}
              data={data ? data : []}
              fetchData={fetchData}
              loading={loading}
              initialState={initialState}
              total={data ? data.length : 0}
              pageCount={glossary ? glossary.totalPages : 0}
              getRowProps={({ original }) => {
                  return {
                      onClick: (e) =>
                      {
                          if(e.target.className !== 'public-switcher' && e.target.className !== 'settings-check' && e.target.cellIndex !== 5) {
                              history.push("/publications/info/" + original._id, {
                                  publication: original,
                                  lang
                              })
                          }
                      }
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
export default Publication;
