import React, { useState, useEffect, useMemo } from "react";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import CONSTANTS from "./constants";

import { t_create_seminars, t_load_users, t_save_seminars } from "../../../redux/tracks";

const SeminarsEdit = (props) => {
  const { history } = props;
  const { _id } = props.location.state.seminars
    ? props.location.state.seminars
    : null;
  const {
    location: { state },
  } = props;
  let newSeminars = {
    author: {_id: 0},
    name_en: "",
    name_ru: "",
    file: "",
  };
  const [seminars, setSeminars] = useState(
    state.seminars.docs ? newSeminars : state.seminars
  );

  const lang = state?.lang || 'ru'
  useEffect(() => {
    props.loadUsers();
  }, []);

  const usersList = useMemo(() => {
    return props.users?.length
    ? props.users?.map(u => ({label: u.first_name, value: u._id})) : []
  }, [props.users]);

  const changeInput = (field, value) => {
    let sem = { ...seminars };
    sem[field] = value;
    setSeminars(sem);
  };

  const cancel = (e) => {
    e.preventDefault();
    history.push("/seminars");
  };

  const formatData  = () => {
    const formData = new FormData();
    for (let key in seminars) {
      if (typeof seminars[key] !== 'undefined') {
        formData.append(key, seminars[key]._id >= 0 ? seminars[key]._id : seminars[key]);
      }
    }
    return formData;
  };

  const saveSeminars = (e) => {
    e.preventDefault();
    history.push("/seminars");
    const { saveSeminars } = props;
    saveSeminars(formatData());
  };

  const createSeminars = (e) => {
    e.preventDefault();
    const { createSeminars } = props;
    const formData = new FormData();
    createSeminars(formatData());
  };
  const saveEvent = !_id ? createSeminars : saveSeminars;

  return (
    <div className="content content-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="form-photo">              
            </div>
            <form className="form" id="form-add">
              <div className="input-group">
                <div className="label">{CONSTANTS[lang].name} {CONSTANTS[lang].inRu}</div>
                <input
                  type="text"
                  className="input-text"
                  value={seminars.name_ru}
                  onChange={(e) => changeInput("name_ru", e.target.value)}
                />
              </div>

              <div className="input-group">
                <div className="label">{CONSTANTS[lang].name} {CONSTANTS[lang].inEn}</div>
                <input
                  type="text"
                  className="input-text"
                  value={seminars.name_en}
                  onChange={(e) => changeInput("name_en", e.target.value)}
                />
              </div>

              <div className="input-group">
                <div className="label">{CONSTANTS[lang].file}</div>
                <input
                  type="text"
                  className="input-text"
                  value={seminars.file}
                  onChange={(e) => changeInput("file", e.target.value)}
                />
                {/* <input 
                  type="file"
                  className="input-text"
                  onChange={(e) => changeInput("file", e.target.files[0])}
                /> */}
              </div>
              <div className="input-group">
                <div className="label">{CONSTANTS[lang].author}</div>
                <select className="input-text" value={seminars.author?._id || seminars.author || 0} onChange={(e) => changeInput("author", e.target.value)}>
                  {usersList.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="btn-confirm">
        <a onClick={(e) => cancel(e)} href="#!" className="btn-confirm__cancel">
          {CONSTANTS[lang].cancel}
        </a>
        <a
          onClick={(e) => saveEvent(e)}
          href="#!"
          className="btn-confirm__ok"
          data-form="#form-add"
        >
          {CONSTANTS[lang].save}
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  seminars: state,
  users: state.users.data,
});

const mapDispatchToProps = (dispatch) => ({
  saveSeminars: (payload) => {
    dispatch(t_save_seminars(payload));
  },
  createSeminars: (payload) => {
    dispatch(t_create_seminars(payload));
  },
  loadUsers: () => {
    dispatch(t_load_users())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SeminarsEdit);
