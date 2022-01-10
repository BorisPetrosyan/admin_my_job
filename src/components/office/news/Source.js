import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

import { getUserName } from "../../../utils/helpers";
import { t_delete_source } from "../../../redux/tracks";
import { a_selectNewsSource } from "../../../redux/actions";

import ModalConfirm from "../../common/ModalConfirm";

const { REACT_APP_SERVER, PUBLIC_URL } = process.env;

class Source extends PureComponent {
  state = {
    openConfirm: false,
    editUsers: false,
    usersSort: "name",
    newsSort: "date",
    newsOpen: true,
    usersOpen: true,
    selected_users: [],
  };

  sortUsers = (e, usersSort) => {
    e.preventDefault();
    this.setState({ usersSort });
  };

  sortNews = (e, newsSort) => {
    e.preventDefault();
    this.setState({ newsSort });
  };

  editUsers = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ editUsers: !prevState.editUsers }));
  };

  deleteUsers = (e) => {
    e.preventDefault();
    const { selected_users } = this.state;
    if (selected_users.length > 0) {
      // const {
      // 	location: {
      // 		state: { tag }
      // 	},
      // 	history: { replace },
      // 	deleteTagUsers
      // } = this.props
      // deleteTagUsers({
      // 	payload: { tag_id: tag._id, users: selected_users },
      // 	onSuccess: tag => {
      // 		replace({ state: { tag } })
      // 		this.setState({ tag, selected_users: [] })
      // 	}
      // })
    } else {
      toast.warn("Пользователи не выбраны");
    }
  };

  deleteSource = async (id) => {
    const { deleteSource, history } = this.props;
    await deleteSource({ source_id: id });
    history.push("/news");
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

  componentDidMount() {
    const {
      selectNewsSource,
      location: {
        state: { source },
      },
    } = this.props;
    selectNewsSource(source);
  }

  openNews = (news) => {
    const { history } = this.props;
    history.push("/news/info", { news });
  };

  render() {
    const {
      location: {
        state: { source },
      },
    } = this.props;
    const {
      openConfirm,
      editUsers,
      usersSort,
      newsSort,
      newsOpen,
      usersOpen,
      selected_users,
    } = this.state;
    const news_count = source.news.length;
    const users_count = source.users.length;
    return (
      <div className="content">
        {openConfirm && (
          <ModalConfirm
            title="Удаление источника"
            message="Вы уверенны что хотите удалить источник новостей? Все новости и данные будут удалены"
            close={() => this.setState({ openConfirm: false })}
            confirm={() => this.deleteSource(source._id)}
          />
        )}
        <div className="container-fluid">
          <div className="source-container">
            <div className="source-header justify-content-between">
              <div className="naming-block">
                <div className="naming-block__img">
                  {source.image && (
                    <img src={REACT_APP_SERVER + source.image} alt="img" />
                  )}
                </div>
                <p>{source.name}</p>
              </div>
              <div className="btns btns--small">
                <Link
                  to={{
                    pathname: "/news/edit_source",
                    state: { source },
                  }}
                  className="edit-btn"
                >
                  {" "}
                </Link>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ openConfirm: true });
                  }}
                  href="#!"
                  className="delete-btn"
                >
                  {" "}
                </a>
              </div>
            </div>
            <div className="sub-title">Авторы</div>
            <table className="table source-table">
              <tbody>
                {source.authors.map((a, id) => (
                  <tr key={id}>
                    <td>
                      <div className="table__image">
                        {a.image && (
                          <img src={REACT_APP_SERVER + a.image} alt="img" />
                        )}{" "}
                      </div>
                    </td>
                    <td>{getUserName(a)}</td>
                    <td>{a.department ? a.department.name : "-"}</td>
                    <td>{a.post || "-"}</td>
                    <td>
                      {a.tags.length > 0
                        ? a.tags.map((t, id) => (
                            <span key={id} className="tag">
                              {t.name}
                            </span>
                          ))
                        : "-"}
                    </td>
                    <td>{a.position ? a.position.name : "-"}</td>
                    <td>{a.role ? a.role.name : "-"}</td>
                    <td>
                      <div>{a.phone_number}</div>
                      <div>{a.email}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sections_accordion"></div>
          <div className={`accordion-container ${newsOpen ? "" : "hide"}`}>
            <div className="accordion-header">
              <div className="accordion-header__title">
                {news_count} новостей
              </div>
              <div
                onClick={() =>
                  this.setState((prevState) => ({
                    newsOpen: !prevState.newsOpen,
                  }))
                }
                className={`accordion-header__btn ${newsOpen ? "" : "hide"}`}
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
                <div className="sort">
                  <div className="sort__label">Сортировать по</div>
                  <div className="sort__link">
                    <a
                      className={`${newsSort === "comments" ? "active" : ""}`}
                      onClick={(e) => this.sortNews(e, "comments")}
                      href="#!"
                    >
                      комментариям
                    </a>{" "}
                    <a
                      className={`${newsSort === "likes" ? "active" : ""}`}
                      onClick={(e) => this.sortNews(e, "likes")}
                      href="#!"
                    >
                      лайкам
                    </a>{" "}
                    <a
                      className={`${newsSort === "views" ? "active" : ""}`}
                      onClick={(e) => this.sortNews(e, "views")}
                      href="#!"
                    >
                      просмотрам
                    </a>{" "}
                    <a
                      className={`${newsSort === "date" ? "active" : ""}`}
                      onClick={(e) => this.sortNews(e, "date")}
                      href="#!"
                    >
                      дате
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="btns btns--small">
                  <Link
                    to={{
                      pathname: "/news/add",
                      state: { source },
                    }}
                    className="add-btn"
                  ></Link>
                </div>
              </div>
            </div>
            {news_count > 0 ? (
              <table className="table table-link-js">
                <thead>
                  <tr>
                    <th>Обложка</th>
                    <th>Новость</th>
                    <th>Источник</th>
                    <th>Дата</th>
                    <th>Просмотров</th>
                    <th>Лайков</th>
                    <th>Комментариев</th>
                  </tr>
                </thead>
                <tbody>
                  {source.news.map((n, id) => (
                    <tr key={id} onClick={() => this.openNews(n)}>
                      <td>
                        <div className="table__image">
                          {n.image && (
                            <img src={REACT_APP_SERVER + n.image} alt="img" />
                          )}
                        </div>
                      </td>
                      <td>{n.text}</td>
                      <td>{n.name}</td>
                      <td>{moment(n.updated_at).format("LL")}</td>
                      <td>12</td>
                      <td>{n.likes_count}</td>
                      <td>{n.comments.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Новостей нет</div>
            )}
          </div>
          <div className="sections_accordion"></div>
          {/* TODO readers */}
          {/* <div
						className={`accordion-container table-edit-js ${usersOpen ? '' : 'hide'
							} ${editUsers ? 'table-edit-js--edit' : ''}`}
					>
						<div className="accordion-header">
							<div
								className="accordion-header__title"
								data-tr-count-1="Пользователей Пользователь Пользователя"
							>
								{users_count} пользователей
							</div>
							<div
								onClick={() =>
									this.setState(prevState => ({
										usersOpen: !prevState.usersOpen
									}))
								}
								className={`accordion-header__btn ${usersOpen ? '' : 'hide'
									}`}
							>
								<img
									src={PUBLIC_URL + '/img/accordion.svg'}
									alt=""
									width={24}
								/>
							</div>
						</div>
						<div className="row justify-content-between align-items-center">
							<div className="col-auto">
								<div className="sort">
									<div className="sort__label">
										Сортировать по
									</div>
									<div className="sort__link">
										<a
											className={`${usersSort === 'department'
												? 'active'
												: ''
												}`}
											onClick={e =>
												this.sortUsers(e, 'department')
											}
											href="#!"
										>
											подразделению
										</a>{' '}
										<a
											className={`${usersSort === 'tag'
												? 'active'
												: ''
												}`}
											onClick={e =>
												this.sortUsers(e, 'tag')
											}
											href="#!"
										>
											тегу
										</a>{' '}
										<a
											className={`${usersSort === 'name'
												? 'active'
												: ''
												}`}
											onClick={e =>
												this.sortUsers(e, 'name')
											}
											href="#!"
										>
											имени
										</a>
									</div>
								</div>
							</div>
							<div className="col-auto">
								<div className="btns btns--small">
									{editUsers && (
										<a
											href="#!"
											className="cancel-btn"
											onClick={e => this.editUsers(e)}
										>
											{' '}
										</a>
									)}
									<a
										href="#!"
										className={`${editUsers ? 'delete' : 'edit'
											}-btn`}
										onClick={
											editUsers
												? e => this.deleteUsers(e)
												: e => this.editUsers(e)
										}
									>
										{' '}
									</a>
									<Link
										to={{
											pathname: '/news/add_authors'
										}}
										className="add-btn"
									>
										{' '}
									</Link>
								</div>
							</div>
						</div>
						{users_count > 0 ? (
							<table className="table table-choose-js">
								<thead>
									<tr>
										<th />
										<th>ФИО</th>
										<th>Подразделение</th>
										<th>Должность</th>
										<th>Теги</th>
										<th>Позиция</th>
										<th>Роли</th>
										<th>Контакты</th>
									</tr>
								</thead>
								<tbody>
									{source.users.map((u, id) => (
										<tr key={id}>
											<td>
												<div className="table__circle">
													<input
														type="checkbox"
														id={`c${id}`}
														className="table-check"
														checked={selected_users.includes(
															u._id
														)}
														onChange={() => {
															this.selectUser(
																u._id
															)
														}}
													/>
													<label htmlFor={`c${id}`} />
												</div>
											</td>
											<td>{getUserName(u, true)}</td>
											<td>
												{u.department
													? u.department.name
													: '-'}
											</td>
											<td>{u.post || '-'}</td>
											<td>
												{u.tags.length > 0
													? u.tags.map((t, id) => (
														<span
															key={id}
															className="tag"
														>
															{t.name}
														</span>
													))
													: '-'}
											</td>
											<td>
												{u.position
													? u.position.name
													: '-'}
											</td>
											<td>
												{u.role ? u.role.name : '-'}
											</td>
											<td>
												<div>{u.phone_number}</div>
												<div>{u.email}</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div>Пользователей нет</div>
						)}
					</div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  deleteSource: async (payload) => await dispatch(t_delete_source(payload)),
  selectNewsSource: (payload) => dispatch(a_selectNewsSource(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Source);
