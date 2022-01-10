import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import DropdownTreeSelect from 'react-dropdown-tree-select'

import { getUserName } from "../../../utils/helpers";
import { a_setSourceUsers, a_setNewsObject } from "../../../redux/actions";
import { t_edit_source, t_upload_source_image } from "../../../redux/tracks";

import Select from "../../common/Select";
import ImageUpload from "../../common/ImageUpload";
import TreeSelect from "../../common/TreeSelect";

const { REACT_APP_SERVER } = process.env;

class EditSource extends PureComponent {
  state = {
    edit_users: false,
    selected_users: [],
    checked_companies: [],
  };

  componentDidMount() {
    const {
      // newsObject,
      location: {
        state: {
          source: { authors, departments },
        },
      },
      setSourceUsers,
      // setNewsObject
    } = this.props;
    // setNewsObject({
    // 	...newsObject,
    // 	name,
    // 	department: departments[0],
    // 	tags,
    // 	image
    // })
    setSourceUsers(authors);
    this.getDepartmentList(departments[0]._id);
  }

  getDepartmentList = (selected) => {
    const {
      companies,
      setNewsObject,
      newsObject,
      location: {
        state: {
          source: { name, image, tags },
        },
      },
    } = this.props;
    let companies_list = companies.filter((c) => c.level === 1);
    let notSelected = {
      label: "Не выбрано",
      value: -1,
      checked: selected === -1 ? true : false,
    };
    companies_list = companies_list.map((c) => {
      return {
        label: c.name,
        value: c._id,
        children: this._recursiveSub(c, selected),
        checked: c._id === selected,
        expanded: true,
      };
    });
    companies_list.push(notSelected);
    setNewsObject({
      ...newsObject,
      companies_list,
      department: selected,
      name,
      tags: tags.map((t) => {
        return {
          value: t._id,
          label: t.name,
          data: t,
        };
      }),
      image,
    });
  };

  _recursiveSub = (c, selected) => {
    if (!c.subdivisions || (c.subdivisions && c.subdivisions.length === 0)) {
      return null;
    }
    return c.subdivisions.map((s) => {
      return {
        label: s.name,
        value: s._id,
        children: this._recursiveSub(s, selected),
        checked: s._id === selected,
        expanded: true,
      };
    });
  };

  editUsers = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ edit_users: !prevState.edit_users }));
  };

  deleteUsers = (e) => {
    e.preventDefault();
    let selected_users = [...this.state.selected_users];
    if (selected_users.length > 0) {
      const { setSourceUsers, sourceUsers } = this.props;
      const newSourceUsers = sourceUsers.filter(
        (u) => !selected_users.includes(u._id)
      );
      setSourceUsers(newSourceUsers);
    } else {
      toast.warn("Пользователи не выбраны");
    }
  };

  selectUser = (id) => {
    let selected_users = [...this.state.selected_users];
    if (selected_users.includes(id)) {
      selected_users = selected_users.filter((u) => u !== id);
    } else {
      selected_users.push(id);
    }
    this.setState({ selected_users });
  };

  save = async (e) => {
    e.preventDefault();
    const {
      editSource,
      history,
      newsObject,
      sourceUsers,
      location: {
        state: { source },
      },
    } = this.props;
    const { tags, department, name } = newsObject;
    if (
      name.length > 2 &&
      tags.length > 0 &&
      sourceUsers.length > 0 &&
      department !== -1
    ) {
      const tags_ids = tags.map((t) => t.value);
      const authors = sourceUsers.map((u) => u._id);
      await editSource(
        {
          name,
          tags: tags_ids,
          departments: [department],
          authors,
          source_id: source._id,
        },
        () => history.push("/news")
      );
    } else {
      toast.warn("Заполните необходимые поля");
    }
  };

  changeDepartment = (department) => {
    this.getDepartmentList(department);
  };

  handleImageUpload = (acceptedFiles) => {
    // if (acceptedFiles[0]) {
    const {
      updateSourceImage,
      location: {
        state: { source },
      },
    } = this.props;
    let payload = new FormData();
    payload.append("file", acceptedFiles[0]);
    payload.append("source_id", source._id);
    updateSourceImage(payload);
  };

  render() {
    const { edit_users, selected_users, checked_companies } = this.state;
    const {
      sourceUsers,
      tags,
      newsObject,
      setNewsObject,
      location: {
        state: { source },
      },
    } = this.props;
    // const img = newsObject.image
    // 	? URL.createObjectURL(newsObject.image)
    // 	: null
    // console.log(newsObject)
    return (
      <Fragment>
        <div
          className={`content content--bg-white table-edit-js ${
            edit_users ? "table-edit-js--edit" : ""
          }`}
        >
          <div className="container-fluid">
            <form className="form form--padding" id="form-edit">
              <div className="row">
                <div className="col-4">
                  <div className="form-photo">
                    {newsObject.image && (
                      <img
                        src={REACT_APP_SERVER + newsObject.image}
                        id="img-preview"
                        alt="img"
                      />
                    )}
                    <ImageUpload onDrop={this.handleImageUpload} />
                  </div>
                  <div className="input-group">
                    <div className="label">Название источника</div>
                    <input
                      type="text"
                      className="input-text"
                      value={newsObject.name}
                      onChange={(e) =>
                        setNewsObject({
                          ...newsObject,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="sub-title">Подразделения</div>
                  <div className="input-group">
                    <div className="label">Подразделение</div>
                    <TreeSelect
                      nodes={newsObject.companies_list}
                      checked={checked_companies.map(String)}
                      onCheck={(checked_companies) =>
                        this.setState({
                          checked_companies,
                        })
                      }
                    />
                    {/*<DropdownTreeSelect
											data={newsObject.companies_list}
											onChange={current =>
												this.changeDepartment(
													current.value
												)
											}
											className="select"
											texts={{
												placeholder: 'Поиск'
											}}
											mode="radioSelect"
										/>*/}
                  </div>
                </div>
                <div className="col-4">
                  <div className="sub-title">Теги</div>
                  <div className="input-group">
                    <div className="label">Теги</div>
                    <Select
                      options={tags}
                      className="select-tag"
                      placeholder="Поиск тегов"
                      changeHandler={(selectedOptions) =>
                        setNewsObject({
                          ...newsObject,
                          tags: selectedOptions,
                        })
                      }
                      isMulti
                      value={newsObject.tags}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <h4>Авторы</h4>
              </div>
              <div className="col-auto">
                <div className="btns btns--small">
                  {edit_users && (
                    <a
                      href="#!"
                      className="cancel-btn"
                      onClick={(e) => this.editUsers(e)}
                    >
                      {" "}
                    </a>
                  )}
                  <a
                    href="#!"
                    className={`${edit_users ? "delete" : "edit"}-btn`}
                    onClick={
                      edit_users
                        ? (e) => this.deleteUsers(e)
                        : (e) => this.editUsers(e)
                    }
                  >
                    {" "}
                  </a>
                  <Link
                    to={{
                      pathname: "/news/edit_authors",
                      state: { source },
                    }}
                    className="add-btn"
                  >
                    {" "}
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            {sourceUsers.length > 0 ? (
              <table className="table source-table table-choose-js">
                <tbody>
                  {sourceUsers.map((u, id) => (
                    <tr key={id}>
                      <td>
                        <div className="table__circle">
                          <input
                            type="checkbox"
                            id={`c${id}`}
                            className="table-check"
                            checked={selected_users.includes(u._id)}
                            onChange={() => {
                              this.selectUser(u._id);
                            }}
                          />
                          <label htmlFor={`c${id}`} />
                        </div>
                      </td>
                      <td>{getUserName(u)}</td>
                      <td>{u.department ? u.department.name : "-"}</td>
                      <td>{u.post || "-"}</td>
                      <td>
                        {u.tags.length > 0
                          ? u.tags.map((t, id) => (
                              <span key={id} className="tag">
                                {t.name}
                              </span>
                            ))
                          : "-"}
                      </td>
                      <td>{u.position ? u.position.name : "-"}</td>
                      <td>{u.role ? u.role.name : "-"}</td>
                      <td>
                        <div>{u.phone_number}</div>
                        <div>{u.email}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Авторы не выбраны</div>
            )}
          </div>
        </div>
        <div className="btn-confirm">
          <Link
            to={{ pathname: "/news/source", state: { source } }}
            className="btn-confirm__cancel"
          >
            Отменить
          </Link>
          <a
            onClick={(e) => this.save(e)}
            href="#!"
            className="btn-confirm__ok"
            data-form="#form-edit"
          >
            Сохранить изменения
          </a>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  sourceUsers: state.news.sourceUsers,
  newsObject: state.news.newsObject,
  companies: state.companies.data,
  tags: state.extra.tags,
});
const mapDispatchToProps = (dispatch) => ({
  editSource: async (payload, onSuccess) => {
    await dispatch(t_edit_source(payload, onSuccess));
  },
  setSourceUsers: (payload) => {
    dispatch(a_setSourceUsers(payload));
  },
  setNewsObject: (payload) => {
    dispatch(a_setNewsObject(payload));
  },
  updateSourceImage: (payload, onSuccess) => {
    dispatch(t_upload_source_image(payload, onSuccess));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSource);
