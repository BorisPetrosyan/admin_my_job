import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { t_save_seminars } from "../../../redux/tracks";
import ModalConfirm from "../../common/ModalConfirm";
import { t_delete_seminar } from "../../../redux/tracks";
import moment from "moment";
import CONSTANTS from "./constants";

const { REACT_APP_SERVER } = process.env;

function SeminarsInfo(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({ info: null, openConfirm: false });
  const { lang, seminars } = props.location.state;

  const { _id, author, created_at, file, name_ru, name_en } = seminars;

  const addHttp = (url) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "https://" + url;
    }
    return url;
  };

  const del = async () => {
    await dispatch(t_delete_seminar({ id: _id }));
    history.push("/seminars");
    setState({ openConfirm: false });
  };

  return (
    <div className="content content-profile">
      {state.openConfirm && (
        <ModalConfirm
          title={CONSTANTS[lang].deleteTitle}
          message={CONSTANTS[lang].deleteText}
          close={() => setState({ openConfirm: false })}
          confirm={del}
        />
      )}
      <div className="container-fluid">
        <div className="btn-bottom">
          <Link
            to={{
              pathname: "/seminars/edit/" + _id,
              state: { seminars, lang },
            }}
            className="edit-btn"
          />
          <button
            onClick={() => setState({ openConfirm: true })}
            className="delete-btn"
          />
        </div>

        <div className="row">
          <div className="col-6">
            <div className="profile-item">
              <div className="sub-title">{CONSTANTS[lang].seminarData}</div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].name} {CONSTANTS[lang].inRu}
                </div>
                <div className="profile-item__list-value">{name_ru || "-"}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].name} {CONSTANTS[lang].inEn}
                </div>
                <div className="profile-item__list-value">{name_en || "-"}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].file}
                </div>
                <div className="profile-item__list-value">
                  {(file && (
                    <a href={addHttp(file)} rel="nofollow" target="_blank">
                      {file}
                    </a>
                  )) ||
                    "-"}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].createdAt}
                </div>
                <div className="profile-item__list-value">
                  {moment(created_at).format("DD-MM-YYYY, HH:mm")}
                </div>
              </div>
            </div>
          </div>

          <div className=" offset-1 col-5">
            <div className="profile-item">
              <div className="sub-title">{CONSTANTS[lang].authorData}</div>
              <div className="profile-item">
                <div className="profile-item__photo">
                  <img src={REACT_APP_SERVER + "/" + author?.image} />
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].name}
                </div>
                <div className="profile-item__list-value">
                  {author?.first_name}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].surname}
                </div>
                <div className="profile-item__list-value">
                  {author?.last_name || "-"}
                </div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">Email</div>
                <div className="profile-item__list-value">{author?.email}</div>
              </div>
              <div className="profile-item__list">
                <div className="profile-item__list-title">
                  {CONSTANTS[lang].tel}
                </div>
                <div className="profile-item__list-value">
                  {author?.phone_number}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  seminars: state.seminars,
});

const mapDispatchToProps = (dispatch) => ({
  saveSeminars: (payload) => {
    dispatch(t_save_seminars(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SeminarsInfo);
