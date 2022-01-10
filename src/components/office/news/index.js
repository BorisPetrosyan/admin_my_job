import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import { a_selectNews } from "../../../redux/actions";

import Search from "../users/Search";

const { REACT_APP_SERVER, PUBLIC_URL } = process.env;

const sortByDate = (a, b) => {
  let dateA = new Date(a.updated_at),
    dateB = new Date(b.updated_at);
  return dateA - dateB;
};

const sortBySource = (a, b) => {
  if (!a.source || !b.source) return 0;
  let depA = a.source.name.toLowerCase(),
    depB = b.source.name.toLowerCase();
  if (depA < depB) return -1;
  if (depA > depB) return 1;
  return 0;
};

class News extends PureComponent {
  state = {
    sourceOpen: true,
    newsOpen: true,
    newsSort: "date",
    filteredSources: [],
    filteredNews: [],
    filtered: false,
    filtered2: false,
  };

  openNews = (news) => {
    const { history } = this.props;
    history.push("/news/info", { news });
  };

  openSource = (source) => {
    const { history } = this.props;
    history.push("/news/source", { source });
  };

  sortNews = (e, newsSort) => {
    e.preventDefault();
    const {
      news: { news },
    } = this.props;
    this.setState({ newsSort });
    switch (newsSort) {
      case "date":
        news.sort(sortByDate);
        break;
      case "source":
        news.sort(sortBySource);
        break;
      default:
        return null;
    }
  };

  render() {
    const {
      sourceOpen,
      newsOpen,
      newsSort,
      filtered,
      filteredSources,
      filtered2,
      filteredNews,
    } = this.state;
    const {
      news: { news, newsSources },
    } = this.props;
    const news_count = news.length;
    const sources_list = filtered ? filteredSources : newsSources;
    const news_list = filtered2 ? filteredNews : news;
    return (
      <Fragment>
        <div className="btn-bottom">
          <Link to="/news/add_source" className="add-btn">
            {" "}
          </Link>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className={`accordion-container ${sourceOpen ? "" : "hide"}`}>
              <div className="accordion-header">
                <div className="accordion-header__title">Источники</div>
                <div
                  onClick={() =>
                    this.setState((prevState) => ({
                      sourceOpen: !prevState.sourceOpen,
                    }))
                  }
                  className={`accordion-header__btn ${
                    sourceOpen ? "" : "hide"
                  }`}
                >
                  {sources_list.image && (
                    <img
                      src={REACT_APP_SERVER + sources_list.image}
                      alt="img"
                      width={24}
                    />
                  )}
                </div>
              </div>
              <Search
                setFilter={(filtered, filteredSources) =>
                  this.setState({
                    filtered,
                    filteredSources,
                  })
                }
                sources
              />
              {sources_list.length > 0 ? (
                <table className="table table-link-js">
                  <thead>
                    <tr>
                      <th />
                      <th>Название</th>
                      <th>Новостей</th>
                      <th>Пользователей</th>
                      <th>Теги</th>
                      <th>Подразделение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources_list.map((s, id) => (
                      <tr key={id} onClick={() => this.openSource(s)}>
                        <td>
                          <div className="table__image">
                            {s.image && (
                              <img src={REACT_APP_SERVER + s.image} alt="img" />
                            )}
                          </div>
                        </td>
                        <td>{s.name}</td>
                        <td>{s.news.length}</td>
                        <td>12 679</td>
                        <td>
                          {s.tags.length > 0
                            ? s.tags.map((t, id) => (
                                <span key={id} className="tag">
                                  {t.name}
                                </span>
                              ))
                            : "-"}
                        </td>
                        <td>
                          {s.departments[0] ? s.departments[0].name : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="my-not-found">
                  {filtered
                    ? "Источники новостей не найдены"
                    : "Источников новостей нет"}
                </div>
              )}
            </div>
            <div className="sections_accordion"></div>
            <div className={`accordion-container ${newsOpen ? "" : "hide"}`}>
              <div className="accordion-header">
                <div className="accordion-header__title">Новости</div>
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
              {news_count > 0 ? (
                <Fragment>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-7">
                      <Search
                        setFilter={(filtered2, filteredNews) =>
                          this.setState({
                            filtered2,
                            filteredNews,
                          })
                        }
                      />
                    </div>
                    <div className="col-auto">
                      <div className="sort">
                        <div className="sort__label">Сортировать по</div>
                        <div className="sort__link">
                          <a
                            onClick={(e) => this.sortNews(e, "date")}
                            href="#!"
                            className={`${newsSort === "date" ? "active" : ""}`}
                          >
                            дате
                          </a>{" "}
                          <a
                            onClick={(e) => this.sortNews(e, "source")}
                            href="#!"
                            className={`${
                              newsSort === "source" ? "active" : ""
                            }`}
                          >
                            источнику
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {news_list.length > 0 ? (
                    <table className="table table-link-js">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Новость</th>
                          <th>Источник</th>
                          <th>Дата</th>
                          <th>Просмотров</th>
                          <th>Лайков</th>
                          <th>Комментариев</th>
                        </tr>
                      </thead>
                      <tbody>
                        {news_list.map((n, id) => (
                          <tr key={id} onClick={() => this.openNews(n)}>
                            <td>
                              <div className="table__image">
                                {n.image && (
                                  <img
                                    src={REACT_APP_SERVER + n.image}
                                    alt="img"
                                  />
                                )}
                              </div>
                            </td>
                            <td>{n.text}</td>
                            <td>{n.source ? n.name : "-"}</td>
                            <td>{moment(n.created_at).format("LL")}</td>
                            <td>-</td>
                            <td>{n.likes_сount}</td>
                            <td>{n.comments.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>Новости не найдены</div>
                  )}
                </Fragment>
              ) : (
                <div>Новостей нет</div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(News);
