import React, { useState } from "react";
import { useFormik } from 'formik';
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {number, object, string} from 'yup';
import { t_create_glossary, t_save_glossary } from "../../../redux/tracks";

import CONSTANTS from "./constants";
import {generateModelForRequest} from "../../../utils/util";

const PublicationsEdit = (props) => {
  const { history } = props;
  const { _id } = props.location.state.publication
    ? props.location.state.publication
    : null;
  const {
    location: {state, state: {publication}},
  } = props;

  const validationSchema = object().shape({
    name_en: string().required('Please enter a Name'),
    name_ru: string().required('Please enter a Name'),
    author_en:string().required('Please enter a Name'),
    author_ru: string().required('Please enter a Name'),
    subject_en:string().required('Please enter a Name'),
    subject_ru: string().required('Please enter a Name'),
  });

  const {
		resetForm,
		handleChange,
		handleSubmit,
		values,
		errors,
		validateForm,
		setErrors,
		setValues,
		setFieldValue,
		touched
	} = useFormik({
		initialValues: publication,
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: ({  name_en,
                     name_ru,
                     author_en,
                     author_ru,
                     subject_en,
                     subject_ru,
                     isActive, }) => createPublication(name_en,
            name_ru,
            author_en,
            author_ru,
            subject_en,
            subject_ru,
            isActive,
		),
		validationSchema,
		validateOnMount: false,
	});

  const lang = state?.lang || 'ru';
  // const changeInput = (field, value) => {
  //   console.log(field, value)
  //   let publicationValues = { ...publication };
  //   publicationValues[field] = value;
  //   setPublication(publicationValues);
  // };
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
  const createPublication = (e) => {
    // let err = false;
    // e.preventDefault();
    alert('done')
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



  const saveEvent = state.publication.docs ? createPublication : savePublication;
    console.log(errors)
  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="container-fluid">
            <div className="form-photo ">
            </div>
            <div className="sub-title">{`${CONSTANTS[lang].header_edit}`}</div>
            <form className="form row " id="form-add" onSubmit={handleSubmit}>
              <div className="col-4">
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inEn}`}</div>
                <input
                    id='name_en'
                    name='name_en'
                  type="text"
                  className="input-text"
                  value={values.name_en}
                  onChange={handleChange}
                />
                {errors.name_en && (
                    <p className="invalid">{errors.name_en}</p>
                )}
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].name} ${CONSTANTS[lang].inRu}`}</div>
                <input
                  id='name_ru'
                  name='name_ru'
                  type="text"
                  className="input-text"
                  value={values.name_ru}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inEn}`}</div>
                <input
                    id='author_en'
                    name='author_en'
                    type="text"
                  className="input-text"
                  value={values.author_en}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].author} ${CONSTANTS[lang].inRu}`}</div>
                <input
                    id='author_ru'
                    name='author_ru'
                    type="text"
                  className="input-text"
                  value={values.author_ru}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="col-4">
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inEn}`}</div>
                <textarea
                    id='subject_en'
                    name='subject_en'
                    type="textarea"
                  className="input-text"
                  value={values.subject_en}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <div className="label">{`${CONSTANTS[lang].subject} ${CONSTANTS[lang].inRu}`}</div>
                <textarea
                    id='subject_ru'
                    name='subject_ru'
                    type="textarea"
                  className="input-text"
                  value={values.subject_ru}
                  onChange={handleChange}
                />
              </div>

              </div>
              <div className="input-group">
                <div className='public-switcher' >

                  <div className="label pl-0">{`${CONSTANTS[lang].turnOnOff} ${CONSTANTS[lang].publication}` }</div>
                  <input
                      className="settings-check"
                      type="checkbox"
                      // defaultChecked={props.location.pathname === "/publications/add" ? true : publication.isActive}
                      // onChange={(e) => changeInput("isActive", !publication.isActive)}
                  />
                  <label/>

                </div>
                {/*<div className="label">{CONSTANTS[lang].literatureLink}</div>*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    className="input-text"*/}
                {/*    value={publication.link}*/}
                {/*    onChange={(e) => changeInput("link", e.target.value)}*/}
                {/*/>*/}
              </div>
              <div className="btn-confirm">
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicationsEdit);
