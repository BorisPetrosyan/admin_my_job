import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import DatePicker, { registerLocale } from "react-datepicker";
import * as ru from "date-fns/locale/ru";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { a_setSelectedUser } from "../../../redux/actions";
import {
  t_save_user,
  t_create_user,
  t_upload_avatar,
  t_reset_user_password,
} from "../../../redux/tracks";
import { copy } from "../../../utils/helpers";

import Select from "../../common/Select";
import TreeSelect from "../../common/TreeSelect";
import ImageUpload from "../../common/ImageUpload";
import ModalConfirm from "../../common/ModalConfirm";
import ModalInfo from "../../common/ModalInfo";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const { REACT_APP_SERVER } = process.env;

const newUser = {
  first_name: "",
  middle_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  date_of_birth: null,
  tags: [],
  role: { _id: -1, name: "Не выбрано" },
  position: "",
  post: "",
  departments: [],
};

const isValidEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email === "" || re.test(String(email).toLowerCase());
};

class Users extends Component {
  state = {
    user: newUser,
    companies_list: [],
    openConfirm: false,
    userCreated: false,
    checked_companies: [],
    password: "",
    phone_number: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== "/users/add") {
      const {
        location: {
          state: {
            user: { tags },
          },
        },
      } = nextProps;
      const { user } = prevState;
      if (user.tags?.length > 0 && user.tags[0].value === undefined) {
        return {
          user: {
            ...user,
            tags: tags.map((t) => {
              return {
                value: t._id,
                label: t.name,
                data: t,
              };
            }),
          },
        };
      }
    }
    return null;
  }

  componentDidMount() {
    const {
      location: { pathname, state },
      selectUser,
      settings: { positions },
    } = this.props;
    if (pathname !== "/users/add") {
      if (state) {
        selectUser(state.user);
        const {
          first_name,
          middle_name,
          last_name,
          phone_number,
          email,
          date_of_birth,
          tags,
          role,
          position,
          post,
          departments,
        } = state.user;
        const user = {
          first_name,
          middle_name,
          last_name,
          phone_number,
          email,
          date_of_birth,
          tags: tags.map((t) => {
            return {
              value: t._id,
              label: t.name,
              data: t,
            };
          }),
          role: role || { _id: -1, name: "Не выбрано" },
          position: position || { _id: -1, name: "Не выбрано" },
          post,
          departments: departments.map((d) => d._id),
        };
        this.setState({ user });
      }
    } else {
      selectUser(null);
      const position = positions.find((p) => p.name === "user");
      this.setState((ps) => ({ user: { ...ps.user, position } }));
    }
    window.scrollTo(0, 0);
    this.getDepartmentList();
  }

  getDepartmentList = () => {
    const {
      location: { pathname, state },
      companies,
    } = this.props;
    const editUser = pathname !== "/users/add";
    let companies_list = companies.filter((c) => c.level === 1);
    let checked_companies = [];
    if (editUser && state) {
      // console.log(state.user)
      let { departments, companies } = state.user;
      departments = departments.map((d) => d._id);
      companies = companies.map((c) => c._id);
      let allIds = [...departments, ...companies];
      companies_list = companies_list.map((c) => {
        if (allIds.length > 0 && editUser && allIds.includes(c._id)) {
          checked_companies.push(c._id);
        }
        return {
          label: c.name,
          value: c._id,
          children: this._recursiveSub(
            c,
            editUser,
            departments,
            checked_companies
          ),
        };
      });
    } else {
      companies_list = companies_list.map((c) => {
        return {
          label: c.name,
          value: c._id,
          children: this._recursiveSub(c, editUser),
        };
      });
    }
    this.setState({ companies_list, checked_companies });
  };

  _recursiveSub = (c, editUser, departments = [], checked_companies) => {
    if (!c.subdivisions || (c.subdivisions && c.subdivisions.length === 0)) {
      return null;
    }
    return c.subdivisions.map((s) => {
      if (departments.length > 0 && editUser && departments.includes(s._id)) {
        checked_companies.push(s._id);
      }
      return {
        label: s.name,
        value: s._id,
        children: this._recursiveSub(
          s,
          editUser,
          departments,
          checked_companies
        ),
      };
    });
  };

  cancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
    // const {
    // 	location: { pathname },
    // 	users: { selectedUser }
    // } = this.props
    // if (pathname === '/users/add') {
    // 	this.setState({ user: newUser })
    // } else {
    // 	this.setState({ user: selectedUser })
    // }
  };

  changeInput = (field, value) => {
    let user = { ...this.state.user };
    user[field] = value;
    this.setState({ user });
  };

  saveUser = (e) => {
    e.preventDefault();
    const {
      location: { pathname },
      saveUser,
      createUser,
      users: { selectedUser },
      history,
    } = this.props;
    const { user, checked_companies } = this.state;
    const add = pathname === "/users/add";
    let err = false;
    if (user.email !== "" && !isValidEmail(user.email)) {
      toast.warn("Введите валидный email");
      err = true;
    }
    if (user.phone_number === "" || checked_companies.length === 0) {
      toast.warn("Заполните номер телефона и выберите компанию");
      err = true;
    }
    if (!err) {
      if (add) {
        // user.tags = user.tags.map(t => t.value)
        user.departments = checked_companies;
        // createUser({ user: { ...user } })
        createUser({ user }, ({ phone_number, password }) => {
          this.props.history.goBack();
          this.setState({
            userCreated: true,
            password,
            phone_number,
          });
        });
      } else {
        history.replace({
          state: {
            user: { ...user, tags: user.tags.map((t) => t.data) },
          },
        });
        user.departments = checked_companies;
        saveUser({ user, id: selectedUser._id }, () => {
          history.push("/users");
        });
      }
    }
  };

  handleImageUpload = (acceptedFiles) => {
    const {
      uploadAvatar,
      users: { selectedUser },
    } = this.props;
    if (selectedUser) {
      let payload = new FormData();
      payload.append("file", acceptedFiles[0]);
      payload.append("user_id", selectedUser._id);
      uploadAvatar(payload);
    } else {
      toast.info("Не реализовано для создания пользователя");
    }
  };

  resetPassword = () => {
    const {
      user: { phone_number },
    } = this.state;
    this.props.resetUserPassword({ phone_number });
    this.setState({ openConfirm: false });
  };

  // changeDepartment = current => {
  // 	const { companies_list, user } = this.state
  // 	if (user.departments.includes(current.value)) {
  // 		user.departments = user.departments.filter(d => d !== current.value)
  // 	} else {
  // 		user.departments.push(current.value)
  // 	}
  // 	makeUpdate(companies_list, current)
  // 	this.setState({ user })
  // }

  render() {
    const {
      location: { pathname },
      users: { selectedUser },
      settings: { roles, positions },
      tags,
    } = this.props;
    const {
      user,
      companies_list,
      openConfirm,
      checked_companies,
      userCreated,
      password,
      phone_number,
    } = this.state;
    const add = pathname === "/users/add";
    // console.log('render', user)
    return (
      <Fragment>
        {openConfirm && (
          <ModalConfirm
            title="Сброс пароля"
            message="Вы уверенны что хотите сбросить пароль пользователя? Новый пароль будет выслан ему в СМС"
            close={() => this.setState({ openConfirm: false })}
            confirm={() => this.resetPassword()}
          />
        )}
        {userCreated && (
          <ModalInfo
            title="Пользователь добавлен успешно"
            message={`Номер телефона: ${phone_number}, пароль: ${password}. При нажатии кнопки данный текст будет скопирован в буфер обмена`}
            close={() => {
              copy(`Номер телефона: ${phone_number}, пароль: ${password}`);
              this.setState({ userCreated: false });
            }}
          />
        )}
        <div className="content content-profile">
          <div className="container-fluid">
            <form className="form" id="form-add">
              <div className="row">
                <div className="col-4">
                  <div className="form-photo">
                    {selectedUser && selectedUser.image && (
                      <img
                        src={REACT_APP_SERVER + selectedUser.image}
                        id="img-preview"
                        alt="img"
                      />
                    )}

                    <ImageUpload onDrop={this.handleImageUpload} />
                  </div>
                  <div className="input-group">
                    <div className="label">Email</div>
                    <input
                      type="text"
                      className="input-text"
                      value={user.email}
                      onChange={(e) =>
                        this.changeInput("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="input-group">
                    <div className="label">Телефон</div>
                    <input
                      type="text"
                      className="input-text"
                      value={user.phone_number}
                      onChange={(e) =>
                        this.changeInput("phone_number", e.target.value)
                      }
                    />
                  </div>
                  {!add && (
                    <div className="input-group">
                      <div className="label">Пароль</div>
                      <button
                        className="btn-confirm__ok btn-input-confirm"
                        onClick={() =>
                          this.setState({
                            openConfirm: true,
                          })
                        }
                        type="button"
                      >
                        Сбросить пароль
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-8">
                  <div className="sub-title">Личные данные</div>
                  <div className="row">
                    <div className="col-6">
                      <div className="input-group">
                        <div className="label">Фамилия</div>
                        <input
                          type="text"
                          className="input-text"
                          value={user.last_name}
                          onChange={(e) =>
                            this.changeInput("last_name", e.target.value)
                          }
                        />
                      </div>
                      <div className="input-group">
                        <div className="label">Имя</div>
                        <input
                          type="text"
                          className="input-text"
                          value={user.first_name}
                          onChange={(e) =>
                            this.changeInput("first_name", e.target.value)
                          }
                        />
                      </div>
                      <div className="input-group">
                        <div className="label">Отчество</div>
                        <input
                          type="text"
                          className="input-text"
                          value={user.middle_name}
                          onChange={(e) =>
                            this.changeInput("middle_name", e.target.value)
                          }
                        />
                      </div>
                      <div className="input-group">
                        <div className="label">Дата рождения</div>
                        <DatePicker
                          selected={
                            user.date_of_birth
                              ? new Date(user.date_of_birth)
                              : null
                          }
                          onChange={(date) =>
                            this.changeInput("date_of_birth", date)
                          }
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={35}
                          dateFormat="d MMMM, yyyy"
                          className="input-text"
                          placeholderText="Дата"
                          // locale="ru"
                        />
                      </div>
                      <div className="input-group">
                        <div className="label">Теги</div>
                        <Select
                          options={tags}
                          changeHandler={(selectedOptions) =>
                            this.changeInput("tags", selectedOptions)
                          }
                          isMulti
                          value={user.tags}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <div className="label">Компании и подразделения</div>
                        <TreeSelect
                          nodes={companies_list}
                          checked={checked_companies.map(String)}
                          onCheck={(checked_companies) =>
                            this.setState({
                              checked_companies,
                            })
                          }
                        />
                        {/*<DropdownTreeSelect
													data={companies_list}
													onChange={(
														current,
														selected
													) =>
														this.changeDepartment(
															current
														)
													}
													className="select"
													texts={{
														placeholder: 'Поиск'
													}}
												/>*/}
                      </div>
                      <div className="input-group">
                        <div className="label">Должность</div>
                        <input
                          type="text"
                          className="input-text"
                          value={user.post}
                          onChange={(e) =>
                            this.changeInput("post", e.target.value)
                          }
                        />
                      </div>
                      <div className="input-group">
                        <div className="label">Позиция</div>
                        <Select
                          options={positions}
                          changeHandler={(selectedOptions) =>
                            this.changeInput("position", selectedOptions)
                          }
                          value={user.position}
                        />
                      </div>
                      <div className="input-group">
                        <div className="label">Роли</div>
                        <Select
                          options={[
                            {
                              _id: -1,
                              name: "Не выбрано",
                            },
                            ...roles,
                          ]}
                          changeHandler={(selectedOptions) =>
                            this.changeInput("role", selectedOptions)
                          }
                          value={user.role}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="btn-confirm">
          <a
            onClick={(e) => this.cancel(e)}
            href="#!"
            className="btn-confirm__cancel"
          >
            Отменить
          </a>
          <a
            onClick={(e) => this.saveUser(e)}
            href="#!"
            className="btn-confirm__ok"
            data-form="#form-add"
          >
            Сохранить изменения
          </a>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  companies: state.companies.data,
  settings: state.settings,
  tags: state.extra.tags,
});
const mapDispatchToProps = (dispatch) => ({
  selectUser: (payload) => {
    dispatch(a_setSelectedUser(payload));
  },
  saveUser: (payload, onSuccess) => {
    dispatch(t_save_user(payload, onSuccess));
  },
  createUser: (payload, onSuccess) => {
    dispatch(t_create_user(payload, onSuccess));
  },
  uploadAvatar: (payload) => {
    dispatch(t_upload_avatar(payload));
  },
  resetUserPassword: (payload) => {
    dispatch(t_reset_user_password(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
