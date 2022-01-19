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


const TableAxesEdit = (props) => {
  const { history } = props;
  const { _id } = props.location.state.publication
    ? props.location.state.publication
    : null;
  const {
    location: {state, state: {publication }} ,
  } = props;

  const lang = state?.lang || 'ru';

  const cancel = (e) => {
    e.preventDefault();
    history.push("/publications");
  };
  const savePublication = (e) => {
    e.preventDefault();
    history.push("/publications");
    // const { saveGlossary } = props;
    // saveGlossary(glossar);
  };




  const schema = yup.object({
      name_en: yup.string().required(`${CONSTANTS[lang].nameValid}`),
      name_ru: yup.string().required(`${CONSTANTS[lang].nameValid}`),
      author_en:yup.string().required(`${CONSTANTS[lang].authorValid}`),
      author_ru: yup.string().required(`${CONSTANTS[lang].authorValid}`),
      subject_en:yup.string().required(`${CONSTANTS[lang].subjectValid}`),
      subject_ru: yup.string().required(`${CONSTANTS[lang].subjectValid}`),
      file: yup.mixed()
        .test('required', CONSTANTS[lang].fileValid, (value) =>{
          return value && value.length
        } )
        .test("fileSize", CONSTANTS[lang].fileMaxSizeValid, (value, context) => {
          return value && value[0] && value[0].size <= 5000000;
        })
        .test("type", "We only support pdf", function (value) {
          return value && value[0] && value[0].type === "application/pdf";
        }),
  });
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    // let err = false;
    // e.preventDefault();
    let payload = {...data}
    payload.file = data.file[0]
    console.log(payload)
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

  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="container-fluid">
            <div className="form-photo ">
            </div>
            <div className="sub-title">{`${CONSTANTS[lang].header_edit}`}</div>
            <form className="form row " id="form-add" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-4">
              <div className="input-groups">
                <div className="label">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inEn}`}</div>
                <input
                  defaultValue={publication?.name_en && publication?.name_en}
                  name='name_en'
                  type="text"
                   className={`input-text  ${errors.name_en?.message  ? 'invalid-border animated fadeIn': ''}`}
                  {...register('name_en')}
                />
                {errors.name_en?.message && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].nameValid}</p>}
              </div>
              <div className="input-groups">
                <div className="label">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inRu}`}</div>
                <input
                  defaultValue={publication?.name_ru && publication?.name_ru}
                  name='name_ru'
                  type="text"
                  className={`input-text  ${errors.name_ru?.message ? 'invalid-border animated fadeIn': ''}`}
                  {...register('name_ru')}
                />
                {errors.name_ru?.message && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].nameValid}</p>}
              </div>
              <div className="input-groups">
                <div className="label">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inEn}`}</div>
                <input
                    defaultValue={publication?.author_en && publication?.author_en}
                    id='author_en'
                    name='author_en'
                    type="text"
                    className={`input-text  ${errors.author_en?.message   ? 'invalid-border animated fadeIn': ''}`}

                    {...register('author_en')}
                />
                {errors.author_en?.message &&  <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].authorValid}</p>}
              </div>
              <div className="input-groups">
                <div className="label">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inRu}`}</div>
                <input
                    defaultValue={publication?.author_ru && publication?.author_ru}
                    id='author_ru'
                    name='author_ru'
                    type="text"
                    className={`input-text  ${errors.author_ru?.message ? 'invalid-border animated fadeIn': ''}`}
                    {...register('author_ru')}
                />
                {errors.author_ru?.type === 'required' && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].authorValid}</p>}
              </div>
              </div>
              <div className="col-4">
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inEn}`}</div>
                <textarea
                    defaultValue={publication?.subject_en && publication?.subject_en}
                    id='subject_en'
                    name='subject_en'
                    type="textarea"
                    className={`input-text  ${errors.subject_en?.message ? 'invalid-border animated fadeIn': ''}`}
                   {...register('subject_en')}

                />
                {errors.subject_en?.type === 'required' && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].subjectValid}</p>}
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inRu}`}</div>
                <textarea
                    defaultValue={publication?.subject_ru && publication?.subject_ru}

                    name='subject_ru'
                    type="textarea"
                    className={`input-text  ${errors.subject_ru?.message ? 'invalid-border animated fadeIn': ''}`}
                    {...register('subject_ru')}

                />
                {errors.subject_ru?.type === 'required' && <p className="invalid-text animated fadeInDown">{CONSTANTS[lang].subjectValid}</p>}
              </div>

              </div>
              <div className=" col-4">
                <div className='public-switcher' >
                  <div className="label pl-0">{`${CONSTANTS[lang].turnOnOff} ${CONSTANTS[lang].publication}` }</div>
                  <input
                      name='isActive'
                      className="settings-check"
                      type="checkbox"
                      defaultChecked={props.location.pathname === "/publications/add" ? true : publication.isActive}
                      {...register('isActive')}
                  />
                  <label/>
                </div>
                <div className="label pl-0 pt-3">{CONSTANTS[lang].literatureLink}</div>
                <input
                    name='file'
                    type="file"
                    className="input-text"
                    accept='.pdf'
                    {...register('file')}

                />
                {errors.file?.type === 'required' && <p className="invalid-text animated fadeInDown">{errors.file?.message}</p>}
                {errors.file?.type === 'fileSize' && <p className="invalid-text animated fadeInDown">{errors.file?.message}</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableAxes);
