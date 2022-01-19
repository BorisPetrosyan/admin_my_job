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


const TableAxes = (props) => {

    const [data, setData] = useState(
        [{"_id":1,"_axes":"Оксидативный стресс","name_ru":"Миджо","author_en":"Tatiania","author_ru":"Татьяна","subject_en":"Plumbing & Medical Gas","subject_ru":"Сантехника и медицинский газ","add_date":"07/23/2021","isActive":true,"file":"DonecPharetraMagna.tiff"},
            {"_id":2,"_axes":"Антиоксидантный потенциал кожи","name_ru":"Авави","author_en":"Mattie","author_ru":"Мэтти","subject_en":"Hard Tile & Stone","subject_ru":"Жесткая плитка и камень","add_date":"02/11/2021","isActive":true,"file":"LiberoNullam.doc"},
            {"_id":3,"_axes":"Фотостарение","name_ru":"Кадзу","author_en":"Harmonia","author_ru":"Гармония","subject_en":"Marlite Panels (FED)","subject_ru":"Марлитовые панели (ФЭД)","add_date":"03/09/2021","isActive":true,"file":"Metus.ppt"},
            {"_id":4,"_axes":"Дряблость кожи и деградация коллаге","name_ru":"Ята","author_en":"Chev","author_ru":"Чев","subject_en":"Prefabricated Aluminum Metal Canopies","subject_ru":"Сборные алюминиевые металлические навесы","add_date":"02/18/2021","isActive":true,"file":"BlanditNamNulla.doc"},
            {"_id":5,"_axes":"Склонность к угрям","name_ru":"Твиттербридж","author_en":"Zach","author_ru":"Зак","subject_en":"Soft Flooring and Base","subject_ru":"Мягкий пол и основание","add_date":"04/11/2021","isActive":true,"file":"UtDolor.mp3"},
            {"_id":6,"_axes":"Себорея и экзема","name_ru":"Зунудл","author_en":"Sherri","author_ru":"Шерри","subject_en":"Masonry","subject_ru":"Каменная кладка","add_date":"05/12/2021","isActive":true,"file":"In.jpeg"},
            {"_id":7,"_axes":"Текстура кожи","name_ru":"Зооксо","author_en":"Cloe","author_ru":"Хлоя","subject_en":"Construction Clean and Final Clean","subject_ru":"Строительная уборка и окончательная уборка","add_date":"01/26/2021","isActive":true,"file":"PosuereCubilia.png"},
            {"_id":8,"_axes":"Пигментация","name_ru":"Ята","author_en":"Moselle","author_ru":"Мозель","subject_en":"Masonry","subject_ru":"Каменная кладка","add_date":"02/08/2021","isActive":false,"file":"SapienDignissimVestibulum.avi"},
            {"_id":9,"_axes":"Чувствительность кожи","name_ru":"Воомм","author_en":"Jelene","author_ru":"Джелен","subject_en":"Ornamental Railings","subject_ru":"Декоративные перила","add_date":"09/20/2021","isActive":true,"file":"Consequat.gif"},
            {"_id":10,"_axes":"Проблемы вокруг глаз","name_ru":"Точка возгорания","author_en":"Tammara","author_ru":"Таммара","subject_en":"Waterproofing & Caulking","subject_ru":"Гидроизоляция и уплотнение","add_date":"08/02/2021","isActive":true,"file":"In.xls"},
            {"_id":11,"_axes":"Увлажнение кожи и кожные барьеры","name_ru":"Твинте","author_en":"Griffy","author_ru":"Гриффи","subject_en":"EIFS","subject_ru":"Сантехника и медицинский газ","add_date":"12/04/2021","isActive":true,"file":"Hac.mpeg"},]);


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
        Header: "Оси",
        id: "axesHeader",
        // Cell: ({ row: { id } }) => (
        //   <div className="d-flex align-items-center" >
        //     <div style={{ width: "25%" }}>{++id}</div>
        //   </div>
        // ),
          columns:[
              {
                  Header: CONSTANTS[lang].name,
                  id: "axesName",
                  accessor: `_axes`,

              },
          ]
      },
        {
            Header: CONSTANTS[lang].valueHeader,
            id: "valueHeader",
            columns:[
                {
                    Header: CONSTANTS[lang].valueOne,
                    id: "valueName",
                    // accessor: `name_${lang}`,
                },
                {
                    Header: CONSTANTS[lang].valueTwo,
                    // id: "author",
                    // accessor: `author_${lang}`,
                },
            ]
            // accessor: `name_${lang}`,
        },
        {
            Header: CONSTANTS[lang].recommendedHeaderGreen,
            id: "recommendedHeaderGreen",
            columns: [
                {
                    style:'green',
                    Header: CONSTANTS[lang].young,
                    id: "recYoungGreen",
                    // accessor: `subject_${lang}`,
                },
                {
                    Header: CONSTANTS[lang].old,
                    id: "recOldGreen",
                    // accessor: "add_date",

                }
            ]
            // accessor: `subject_${lang}`,
        },
        {
            Header: CONSTANTS[lang].recommendedHeaderOrange,
            id: "recommendedHeaderOrange",
            columns: [
                {
                    Header: CONSTANTS[lang].young,
                    id: "recYoungOrange",
                    // accessor: `subject_${lang}`,
                },
                {
                    Header: CONSTANTS[lang].old,
                    id: "recOldOrange",
                    // accessor: "add_date",

                }
            ]
            // accessor: `subject_${lang}`,
        },
        {
            Header: CONSTANTS[lang].recommendedHeaderRed,
            id: "recommendedHeaderRed",
            columns: [
                {
                    Header: CONSTANTS[lang].young,
                    id: "recYoungRed",
                    // accessor: `subject_${lang}`,
                },
                {
                    Header: CONSTANTS[lang].old,
                    id: "recOldRed",
                    // accessor: "add_date",

                }
            ]
            // accessor: `subject_${lang}`,
        },
        {
            Header: CONSTANTS[lang].preparationsHeaderGreen,
            id: "preparationsHeaderGreen",
            columns: [
                {
                    Header: CONSTANTS[lang].young,
                    id: "prepYoungGreen",
                    // accessor: `subject_${lang}`,
                },
                {
                    Header: CONSTANTS[lang].old,
                    id: "prepOldGreen",
                    // accessor: "add_date",

                }
            ]
            // accessor: `subject_${lang}`,
        },
        {
            Header: CONSTANTS[lang].preparationsHeaderOrange,
            id: "preparationsHeaderOrange",
            columns: [
                {
                    Header: CONSTANTS[lang].young,
                    id: "prepYoungOrange",
                    // accessor: `subject_${lang}`,
                },
                {
                    Header: CONSTANTS[lang].old,
                    id: "prepOldOrange",
                    // accessor: "add_date",

                }
            ]
            // accessor: `subject_${lang}`,
        },
        {
            Header: CONSTANTS[lang].preparationsHeaderRed,
            id: "preparationsHeaderRed",
            columns: [
                {
                    Header: CONSTANTS[lang].young,
                    id: "prepYoungRed",
                    // accessor: `subject_${lang}`,
                },
                {
                    Header: CONSTANTS[lang].old,
                    id: "prepOldRed",
                    // accessor: "add_date",

                }
            ]
            // accessor: `subject_${lang}`,
        },
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
    <div className="publication__tabs xs">
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
          {/*<div className="btn-bottom">*/}
          {/*  <Link*/}
          {/*    to={{*/}
          {/*      pathname: "/publications/add",*/}
          {/*      state: { publication: glossary, lang },*/}
          {/*    }}*/}
          {/*    className="add-btn"*/}
          {/*  />*/}
          {/*</div>*/}
          <Styles>

            <ReactTable
              tableType={'axes'}
              columns={columns}
              data={data ? data : []}
              fetchData={fetchData}
              loading={loading}
              initialState={initialState}
              total={data ? data.length : 0}
              pageCount={glossary ? glossary.totalPages : 0}
              // getRowProps={({ original }) => {
              //   return {
              //     onClick: (e) =>
              //     {
              //      if(e.target.className !== 'public-switcher' && e.target.className !== 'settings-check' && e.target.cellIndex !== 5) {
              //          history.push("/publications/info/" + original._id, {
              //              publication: original,
              //              lang
              //          })
              //      }
              //     }
              //   };
              // }}
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
export default TableAxes;
