import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import asmoLogo from "../../../img/app-store.png";
import {
  a_setSelectedCompany,
  a_setCompanySorted,
} from "../../../redux/actions";
import {
  // t_load_company_users,
  t_edit_company_subdivisions,
  t_load_company,
  t_delete_company,
  t_set_company_management,
  t_delete_company_users,
} from "../../../redux/tracks";
import { getUserName } from "../../../utils/helpers";

const { PUBLIC_URL } = process.env;
const { REACT_APP_SERVER } = process.env;

class Companies extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      openSubdivisions: true,
      edit_users: false,
      edit_subdivisions: false,
      selected_subdivisions: [],
      management: [null, null, null],
      selected_users: [],
      selected_company: null,
    };
  }

  async componentDidMount() {
    const { setSelectedCompany } = this.props;
    const company = await t_load_company({ id: this.props.match.params.id });
    this.setState(() => ({
      selected_company: company,
    }));
    // loadCompanyUsers({ company_id: company._id })
    let management = [];
    if (company.head) {
      management[0] = company.head._id;
    }
    if (company.admin) {
      management[1] = company.admin._id;
    }
    if (company.manager) {
      management[2] = company.manager._id;
    }
    this.setState({ management });
    setSelectedCompany(company);
  }

  deleteCompany = async (e) => {
    e.preventDefault();
    const {
      deleteCompany,
      location: {
        state: { company },
      },
      history,
    } = this.props;
    await deleteCompany(company._id);
    history.goBack();
  };

  remuveSubdivisions = async (e) => {
    e.preventDefault();
    const {
      deleteCompany,
      location: {
        state: { company },
      },
      history,
    } = this.props;
    await deleteCompany(company._id);
    history.goBack();
  };

  editUsers = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ edit_users: !prevState.edit_users }));
  };

  editSubdivisions = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      edit_subdivisions: !prevState.edit_subdivisions,
    }));
  };

  deleteSubdivisions = (e) => {
    e.preventDefault();
    let selected_subdivisions = [...this.state.selected_subdivisions];
    if (selected_subdivisions.length > 0) {
      const {
        // location: {
        //   state: { company },
        // },
        history: { replace },
        deleteCompanySubdivisions,
      } = this.props;
      deleteCompanySubdivisions(
        {
          company_id: this.props.match.params.id,
          subdivisions: selected_subdivisions,
          type: "delete",
        },
        (company) => {
          // console.log("companycompany", company);
          this.setState(() => ({
            selected_company: company,
          }));
        }
      );
    } else {
      toast.warn("Подразделения не выбраны");
    }
  };

  deleteUsers = (e) => {
    e.preventDefault();
    let selected_users = [...this.state.selected_users];
    if (selected_users.length > 0) {
      const {
        location: {
          state: { company },
        },
        history: { replace },
        deleteCompanyUsers,
      } = this.props;
      deleteCompanyUsers({
        payload: { company_id: company._id, users: selected_users },
        success: (company) => {
          replace({ state: { company } });
        },
      });
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

  selectSubdivisions = (id) => {
    let selected_subdivisions = [...this.state.selected_subdivisions];
    if (selected_subdivisions.includes(id)) {
      selected_subdivisions = selected_subdivisions.filter((u) => u !== id);
    } else {
      selected_subdivisions.push(id);
    }
    this.setState({ selected_subdivisions });
  };

  changeHead = (id, pos) => {
    let management = [...this.state.management];
    const {
      setCompanyManagement,
      location: {
        state: { company },
      },
    } = this.props;
    const ind = management.indexOf(id);
    if (ind !== -1) {
      management[ind] = null;
    }
    management[pos] = id;
    this.setState({
      management,
    });
    setCompanyManagement({
      company_id: company._id,
      admin: management[1],
      manager: management[2],
      head: management[0],
    });
  };
  handleSort = (e, field, id) => {
    e.preventDefault();
    //this.props.setCompanySorted({ field, id })
  };

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const { setSelectedCompany } = this.props;
      const company = await t_load_company({ id: this.props.match.params.id });
      this.setState(() => ({
        selected_company: company,
      }));
      let management = [];
      if (company.head) {
        management[0] = company.head._id;
      }
      if (company.admin) {
        management[1] = company.admin._id;
      }
      if (company.manager) {
        management[2] = company.manager._id;
      }
      this.setState({ management });
      setSelectedCompany(company);
    }
  }

  editCompany = async (c) => {
    const { history } = this.props;
    history.push(`/companies/edit/${c._id}`, { company: c });
  };

  _recursiveSub(c, level) {
    if (!c.subdivisions || (c.subdivisions && c.subdivisions.length === 0)) {
      return null;
    }
    return c.subdivisions.map((s) => (
      <Fragment key={s._id}>
        <tr className={`tr-sub-${level}`} onClick={() => this.editCompany(s)}>
          <td></td>
          <td> {s.name} </td>
          <td> {s.users.length} </td>
          <td>{s.head ? getUserName(s.head) : "-"}</td>
          <td>{s.admin ? getUserName(s.admin) : "-"}</td>
          <td>{s.manager ? getUserName(s.manager) : "-"}</td>
        </tr>
        {this._recursiveSub(s, s.level)}
      </Fragment>
    ));
  }

  render() {
    const {
      open,
      openSubdivisions,
      edit_users,
      edit_subdivisions,
      management,
      selected_users,
      selected_company,
      selected_subdivisions,
    } = this.state;
    const company = selected_company;

    const users =
      company && (company.level === 1 ? company.users : company.users_this);
    const count_users = company && users.length;
    return company ? (
      <div className="content">
        <div className="container-fluid">
          <div className="subvision-header">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <div className="subvision-header__title form d-flex align-items-center">
                  {company.level === 1 && company.logo && (
                    <span className="form-photo company-image">
                      <img src={company.logo ? REACT_APP_SERVER + company.logo : asmoLogo} id="img-preview" alt="img" />
                    </span>
                  )}
                  <span>{company.name}</span>
                </div>
              </div>
              <div className="col-auto">
                <div className="btns btns--small">
                  <Link
                    to={`/companies/edit_company/${company._id}`}
                    className="edit-btn"
                  ></Link>
                  {!company.private && (
                    <a
                      href="#!"
                      onClick={(e) => this.deleteCompany(e)}
                      className="delete-btn"
                    >
                      {" "}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ display: "block" }}
            className={`accordion-container table-edit-js ${
              openSubdivisions ? "" : "hide"
            } ${edit_subdivisions ? "table-edit-js--edit" : ""}`}
          >
            <div className="accordion-header" style={{ paddingBottom: "30px" }}>
              <div
                className="accordion-header__title"
                data-tr-count-1="Подразделений Подразделение Подразделения"
              >
                {company?.subdivisions?.length} Подразделений
              </div>
              <div
                onClick={() =>
                  this.setState((prevState) => ({
                    openSubdivisions: !prevState.openSubdivisions,
                  }))
                }
                className={`accordion-header__btn ${
                  openSubdivisions ? "" : "hide"
                }`}
              >
                <img
                  src={PUBLIC_URL + "/img/accordion.svg"}
                  alt="img"
                  width={24}
                />
              </div>
            </div>
            <div className="row justify-content-between align-items-center">
              <div className="col-auto"></div>
              <div className="col-auto col__edit_comp">
                <div className="btns btns--small">
                  {edit_subdivisions && (
                    <a
                      href="#!"
                      className="cancel-btn"
                      onClick={(e) => this.editSubdivisions(e)}
                    >
                      {" "}
                    </a>
                  )}
                  <a
                    href="#!"
                    className={`${edit_subdivisions ? "delete" : "edit"}-btn`}
                    onClick={
                      edit_subdivisions
                        ? (e) => this.deleteSubdivisions(e)
                        : (e) => this.editSubdivisions(e)
                    }
                  >
                    {" "}
                  </a>
                  <Link
                    to={`/companies/add_subdivisions/${company._id}`}
                    className="add-btn"
                  ></Link>
                </div>
              </div>
            </div>
            <div className="accordion-header">
              {company?.subdivisions?.length ? (
                <table className="table table-link-js table-choose-js">
                  <thead>
                    <tr>
                      <th />
                      <th>Наименование</th>
                      <th>Сотрудников</th>
                      <th>Руководитель</th>
                      <th>Администратор</th>
                      <th>Менеджер</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.subdivisions.map((c) => (
                      <Fragment key={c._id}>
                        <tr
                          onClick={(e) =>
                            !edit_subdivisions && this.editCompany(c)
                          }
                        >
                          <td>
                            <div className="table__circle">
                              <input
                                type="checkbox"
                                id={`c${c._id}`}
                                className="table-check"
                                checked={selected_subdivisions.includes(c._id)}
                                onChange={() => this.selectSubdivisions(c._id)}
                              />
                              <label htmlFor={`c${c._id}`} />
                            </div>
                          </td>
                          <td> {c.name} </td>
                          <td>{c?.users?.length || 0}</td>
                          <td>{c.head ? getUserName(c.head) : "-"}</td>
                          <td>{c.admin ? getUserName(c.admin) : "-"}</td>
                          <td>{c.manager ? getUserName(c.manager) : "-"}</td>
                        </tr>
                        {this._recursiveSub(c, c.level)}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>В компании нет подразделенией</div>
              )}
            </div>
          </div>
          <div
            style={{ display: "block" }}
            className={`accordion-container table-edit-js ${
              open ? "" : "hide"
            } ${edit_users ? "table-edit-js--edit" : ""}`}
          >
            <div className="accordion-header">
              <div
                className="accordion-header__title"
                data-tr-count-1="Пользователей Пользователь Пользователя"
              >
                {count_users} пользователей
              </div>
              <div
                onClick={() =>
                  this.setState((prevState) => ({
                    open: !prevState.open,
                  }))
                }
                className={`accordion-header__btn ${open ? "" : "hide"}`}
              >
                <img
                  src={PUBLIC_URL + "/img/accordion.svg"}
                  alt="img"
                  width={24}
                />
              </div>
            </div>
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                {/* <div className="sort">
									<div className="sort__label">
										Сортировать по
									</div>
									<div className="sort__link">
										<a href="javascript:void(0);" onClick={(e) => this.handleSort(e, "email", company._id)}>подразделению</a>{' '}
										<a href="javascript:void(0);">тегу</a>{' '}
										<a href="javascript:void(0);" onClick={(e) => this.handleSort(e, "first_name", company._id)} className="active">
											имени
										</a>
									</div>
								</div> */}
              </div>
              <div className="col-auto col__edit_comp">
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
                      pathname: "/companies/add_users",
                      state: { company },
                    }}
                    className="add-btn"
                  >
                    {" "}
                  </Link>
                </div>
              </div>
            </div>
            {count_users > 0 ? (
              <table className="table table-choose-js">
                <thead>
                  <tr className="company__table_title">
                    <th />
                    <th>ФИО</th>
                    <th>Должность</th>
                    <th>Роли</th>
                    <th>Контакты</th>
                    <th>Руководитель</th>
                    <th>Администратор</th>
                    <th>Менеджер</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, id) => (
                    <tr key={id}>
                      <td>
                        <div className="table__circle">
                          <input
                            type="checkbox"
                            id={`c${id}`}
                            className="table-check"
                            checked={selected_users.includes(u._id)}
                            onChange={() => this.selectUser(u._id)}
                          />
                          <label htmlFor={`c${id}`} />
                        </div>
                      </td>
                      <td>{getUserName(u, true)}</td>
                      <td>{u.post || "-"}</td>
                      <td>{u.role ? u.role.name : "-"}</td>
                      <td>
                        <div>{u.phone_number}</div>
                        <div>{u.email}</div>
                      </td>
                      <td>
                        <div className="table-radio">
                          <input
                            type="radio"
                            id={`r${id}-1`}
                            className="input-radio"
                            checked={management[0] === u._id}
                            onChange={() => this.changeHead(u._id, 0)}
                          />
                          <label htmlFor={`r${id}-1`} />
                        </div>
                      </td>
                      <td>
                        <div className="table-radio">
                          <input
                            type="radio"
                            id={`r${id}-2`}
                            className="input-radio"
                            checked={management[1] === u._id}
                            onChange={() => this.changeHead(u._id, 1)}
                          />
                          <label htmlFor={`r${id}-2`} />
                        </div>
                      </td>
                      <td>
                        <div className="table-radio">
                          <input
                            type="radio"
                            id={`r${id}-3`}
                            className="input-radio"
                            checked={management[2] === u._id}
                            onChange={() => this.changeHead(u._id, 2)}
                          />
                          <label htmlFor={`r${id}-3`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>В компании нет пользователей</div>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state) => ({
  companies: state.companies,
});
const mapDispatchToProps = (dispatch) => ({
  // loadCompanyUsers: payload => {
  // 	dispatch(t_load_company_users(payload))
  // },
  deleteCompanySubdivisions: (payload, onSuccess) => {
    dispatch(t_edit_company_subdivisions(payload, onSuccess));
  },
  setSelectedCompany: (payload) => {
    dispatch(a_setSelectedCompany(payload));
  },
  deleteCompany: (payload) => {
    dispatch(t_delete_company(payload));
  },
  setCompanyManagement: (payload) => {
    dispatch(t_set_company_management(payload));
  },
  deleteCompanyUsers: (payload) => {
    dispatch(t_delete_company_users(payload));
  },
  setCompanySorted: (payload) => {
    dispatch(a_setCompanySorted(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
