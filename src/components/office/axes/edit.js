import React, { useState } from "react";
import { useFormik } from 'formik';
import {useForm} from "react-hook-form";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { t_create_glossary, t_save_glossary } from "../../../redux/tracks";

import CONSTANTS from "./constants";
import TableAxes from "./index";
import Lang from "../../service/Lang";
import LangForTab from "../../service/LangForTab";


const TableAxesEdit = (props) => {
  const { history } = props;
  const { _id } = props.location.state.axes
    ? props.location.state.axes
    : null;
  const {
    location: {state, state: {axes }} ,
  } = props;

  const lang = state?.lang || 'ru';
  console.log(state)
  const cancel = (e) => {
    e.preventDefault();
    history.push("/axes");
  };
  const savePublication = (e) => {
    e.preventDefault();
    history.push("/axes");
    // const { saveGlossary } = props;
    // saveGlossary(glossar);
  };




  const schema = yup.object({
      // rec_young_green_ru: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_old_green_ru: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_young_orange_ru:yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_old_orange_ru: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_young_red_ru:yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_old_red_ru: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_young_green_en: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_old_green_en: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_young_orange_en:yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_old_orange_en: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_young_red_en:yup.string().required(`${CONSTANTS[lang].recommendedValidText}`),
      // rec_old_red_en: yup.string().required(`${CONSTANTS[lang].recommendedValidText}`)
  });
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    // let err = false;
    // e.preventDefault();

    console.log(data)
    // history.push("/glossary");
    // const { createGlossary } = props;
    // createGlossary(publication);
  };
  // const handleImageUpload = (acceptedFiles) => {
  //   const {
  //     uploadAvatar,
  //     users: { selectedUser },
  //   } = this.props;
  //   if (selectedUser) {
  //     let payload = new FormData();
  //     payload.append("file", acceptedFiles[0]);
  //     payload.append("user_id", selectedUser._id);
  //     uploadAvatar(payload);
  //   } else {
  //     toast.info("Не реализовано для создания пользователя");
  //   }
  // };
  const [langTab,setLangTab] = useState('ru')

  return (
    <div className="content content-profile">


      <div className="container-fluid">
        <div className="row">
          <div className="container-fluid">
            <div className="sub-title">{`${CONSTANTS[lang].header_edit}`}</div>
            <LangForTab active={langTab} onClick={setLangTab} lang={lang}/>
            <form className="form row-f " id="form-add" onSubmit={handleSubmit(onSubmit)}>
              <div className={`${langTab === 'en' ? 'd-none': 'd-flex'}  justify-content-between `} >
              <div className="input-groups b-grey ">
                <div className="label green">{`${CONSTANTS[lang].recommendedHeaderGreen} ${CONSTANTS[lang].for} ${CONSTANTS[lang].young}`}</div>
                {errors.rec_young_green_ru?.type === 'required' &&<div> <p className="invalid-text inv-m animated fadeInDown">{errors.rec_young_green_ru?.message}</p></div>}
                <textarea
                    defaultValue={axes?.recommendation?.young?.greenRu && axes?.recommendation?.young?.greenRu}
                    id='rec_young_green_ru'
                    name='rec_young_green_ru'
                    type="textarea"
                    className={`input-text  ${errors.rec_young_green_ru?.message ? 'textarea-invalid animated fadeIn': ''}`}
                    {...register('rec_young_green_ru')}

                />


                <div className="label green">{`${CONSTANTS[lang].recommendedHeaderGreen} ${CONSTANTS[lang].for} ${CONSTANTS[lang].old}`}</div>
                {errors.rec_old_green_ru?.type === 'required' &&<div> <p className="invalid-text inv-m animated fadeInDown">{errors.rec_old_green_ru?.message}</p></div>}
                <textarea
                    defaultValue={axes?.recommendation?.old?.greenRu && axes?.recommendation?.old?.greenRu}
                    id='rec_old_green_ru'
                    name='rec_old_green_ru'
                    type="textarea"
                    className={`input-text  ${errors.rec_old_green_ru?.message ? 'invalid-border animated fadeIn': ''}`}
                    {...register('rec_old_green_ru')}

                />

              </div>
              <div className="input-groups b-grey ">
                <div className="label orange">{`${CONSTANTS[lang].recommendedHeaderOrange} ${CONSTANTS[lang].for} ${CONSTANTS[lang].young}`}</div>
                {errors.rec_young_orange_ru?.type === 'required' &&<div> <p className="invalid-text inv-m animated fadeInDown">{errors.rec_young_orange_ru?.message}</p></div>}
                <textarea
                    defaultValue={axes?.recommendation?.young?.orangeRu && axes?.recommendation?.young?.orangeRu}
                    id='rec_young_orange_ru'
                    name='rec_young_orange_ru'
                    type="textarea"
                    className={`input-text  ${errors.rec_young_orange_ru?.message ? 'textarea-invalid animated fadeIn': ''}`}
                    {...register('rec_young_orange_ru')}

                />
                <div className="label orange">{`${CONSTANTS[lang].recommendedHeaderOrange}${CONSTANTS[lang].for} ${CONSTANTS[lang].old}`}</div>
                 {errors.rec_old_orange_ru?.type === 'required' &&<div> <p className="invalid-text inv-m animated fadeInDown">{errors.rec_old_orange_ru?.message}</p></div>}
                <textarea
                    defaultValue={axes?.recommendation?.old?.orangeRu && axes?.recommendation?.old?.orangeRu}
                    id='rec_old_orange_ru'
                    name='rec_old_orange_ru'
                    type="textarea"
                    className={`input-text  ${errors.rec_old_orange_ru?.message ? 'textarea-invalid animated fadeIn': ''}`}
                    {...register('rec_old_orange_ru')}
                />
              </div>
              <div className="input-groups b-grey " >
                <div className="label red">{`${CONSTANTS[lang].recommendedHeaderRed} ${CONSTANTS[lang].for} ${CONSTANTS[lang].young}`}</div>
                    {errors.rec_young_red_ru?.type === 'required' &&<div> <p className="invalid-text inv-m animated fadeInDown">{errors.rec_young_red_ru?.message}</p></div>}
                <textarea
                    defaultValue={axes?.recommendation?.young?.redRu && axes?.recommendation?.young?.redRu}
                    id='rec_young_red_ru'
                    name='rec_young_red_ru'
                    type="textarea"
                    className={`input-text  ${errors.rec_young_red_ru?.message ? 'invalid-border animated fadeIn': ''}`}
                    {...register('rec_young_red_ru')}

                />
                <div className="label red">{`${CONSTANTS[lang].recommendedHeaderRed} ${CONSTANTS[lang].for} ${CONSTANTS[lang].old}`}</div>
                  {errors.rec_old_red_ru?.type === 'required' &&<div> <p className="invalid-text inv-m animated fadeInDown">{errors.rec_old_red_ru?.message}</p></div>}
                <textarea
                    defaultValue={axes?.recommendation?.old?.redRu && axes?.recommendation?.old?.redRu}
                    id='rec_old_red_ru'
                    name='rec_old_red_ru'
                    type="textarea"
                    className={`input-text  ${errors.rec_old_red_ru?.message ? 'invalid-border animated fadeIn': ''}`}
                    {...register('rec_old_red_ru')}

                />
              </div>
              </div>
              <div className={` ${langTab === 'ru' ? 'd-none': 'd-flex'}  justify-content-between `}  >
                <div className="input-groups b-grey ">
                  <div className="label green">{`${CONSTANTS[lang].recommendedHeaderGreen} ${CONSTANTS[lang].for} ${CONSTANTS[lang].young}`}</div>
                  <textarea
                      defaultValue={axes?.recommendation?.young?.greenEng && axes?.recommendation?.young?.greenEng}
                      id='rec_young_green_en'
                      name='rec_young_green_en'
                      type="textarea"
                      className={`input-text  ${errors.subject_en?.message ? 'invalid-border animated fadeIn': ''}`}
                      {...register('rec_young_green_en')}

                  />
                  {errors.subject_en?.type === 'required' && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].subjectValid}</p>}
                  <div className="label green">{`${CONSTANTS[lang].recommendedHeaderGreen} ${CONSTANTS[lang].for} ${CONSTANTS[lang].old}`}</div>
                  <textarea
                      defaultValue={axes?.recommendation?.old?.greenEng && axes?.recommendation?.old?.greenEng}
                      id='rec_old_green_en'
                      name='rec_old_green_en'
                      type="textarea"
                      className={`input-text  ${errors.subject_en?.message ? 'invalid-border animated fadeIn': ''}`}
                      {...register('rec_old_green_en')}

                  />
                  {errors.subject_en?.type === 'required' && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].subjectValid}</p>}
                </div>
                <div className="input-groups b-grey ">
                  <div className="label orange">{`${CONSTANTS[lang].recommendedHeaderOrange} ${CONSTANTS[lang].for} ${CONSTANTS[lang].young}`}</div>
                  <textarea
                      defaultValue={axes?.recommendation?.young?.orangeEng && axes?.recommendation?.young?.orangeEng}
                      id='rec_young_orange_en'
                      name='rec_young_orange_en'
                      type="textarea"
                      className={`input-text  ${errors.subject_en?.message ? 'invalid-border animated fadeIn': ''}`}
                      {...register('rec_young_orange_en')}

                  />
                  {errors.name_ru?.message && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].nameValid}</p>}
                  <div className="label orange">{`${CONSTANTS[lang].recommendedHeaderOrange}${CONSTANTS[lang].for} ${CONSTANTS[lang].old}`}</div>
                  <textarea
                      defaultValue={axes?.recommendation?.old?.orangeEng && axes?.recommendation?.old?.orangeEng}
                      id='rec_old_orange_en'
                      name='rec_old_orange_en'
                      type="textarea"
                      className={`input-text  ${errors.subject_en?.message ? 'invalid-border animated fadeIn': ''}`}
                      {...register('rec_old_orange_en')}

                  />
                  {errors.name_ru?.message && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].nameValid}</p>}
                </div>
                <div className="input-groups b-grey " >
                  <div className="label red">{`${CONSTANTS[lang].recommendedHeaderRed} ${CONSTANTS[lang].for} ${CONSTANTS[lang].young}`}</div>
                  <textarea
                      defaultValue={axes?.recommendation?.young?.redEng && axes?.recommendation?.young?.redEng}
                      id='rec_young_red_en'
                      name='rec_young_red_en'
                      type="textarea"
                      className={`input-text  ${errors.subject_en?.message ? 'invalid-border animated fadeIn': ''}`}
                      {...register('rec_young_red_en')}

                  />
                  {errors.author_en?.message &&  <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].authorValid}</p>}
                  <div className="label red">{`${CONSTANTS[lang].recommendedHeaderRed} ${CONSTANTS[lang].for} ${CONSTANTS[lang].old}`}</div>
                  <textarea
                      defaultValue={axes?.recommendation?.old?.redEng && axes?.recommendation?.old?.redEng}
                      id='rec_old_red_en'
                      name='rec_old_red_en'
                      type="textarea"
                      className={`input-text  ${errors.subject_en?.message ? 'invalid-border animated fadeIn': ''}`}
                      {...register('rec_old_red_en')}

                  />
                  {errors.author_ru?.type === 'required' && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].authorValid}</p>}
                </div>
              </div>
              <div className="btn-confirm m-left">
                <a onClick={(e) => cancel(e)} href="#!" className="btn-confirm__cancel">
                  {CONSTANTS[lang].cancel}
                </a>
                <button
                    type='submit'
                    // onClick={(e) => saveEvent(e)}
                    // href="#!"
                    className="btn-confirm__ok"
                    data-form="#form-add"
                >
                  {CONSTANTS[lang].save}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  glossary: state,
});

const mapDispatchToProps = (dispatch) => ({
  saveGlossary: (payload) => {
    dispatch(t_save_glossary(payload));
  },
  createGlossary: (payload) => {
    dispatch(t_create_glossary(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableAxesEdit);
