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
        [{"_id":1,"_axes":"Оксидативный стресс",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":2,"_axes":"Антиоксидантный потенциал кожи",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":3,"_axes":"Фотостарение",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":4,"_axes":"Дряблость кожи и деградация коллаге",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":5,"_axes":"Склонность к угрям",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":6,"_axes":"Себорея и экзема",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":7,"_axes":"Текстура кожи",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":8,"_axes":"Пигментация",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":9,"_axes":"Чувствительность кожи",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":10,"_axes":"Проблемы вокруг глаз",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}},
            {"_id":11,"_axes":"Увлажнение кожи и кожные барьеры",min:20,max:50, recommendation: {young:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'},old:{greenRu:'Vse xorosho',greenEng:'all is good',orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}},products:{young:{greenRu:['analgin,tempalgin'],greenEng:['engAnalgin','engTenpalgin'],orangeRu:'vse norme',orangeEng:'all normal bro', redRu:'vse ploxo',redEng:'all bad'}}}]);


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
              getRowProps={({ original }) => {
                return {
                  onClick: (e) =>
                  {
                   if(e.target.className !== 'public-switcher' && e.target.className !== 'settings-check' && e.target.cellIndex !== 5) {
                       history.push("/axes/info/" + original._id, {
                           axes: original,
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
export default TableAxes;
