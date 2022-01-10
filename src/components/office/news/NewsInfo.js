import React, { PureComponent } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import { getUserName } from "../../../utils/helpers";
import { t_delete_news } from "../../../redux/tracks";
import { a_selectNews, a_selectNewsSource } from "../../../redux/actions";

import ModalConfirm from "../../common/ModalConfirm";

const { REACT_APP_SERVER } = process.env;

class NewsInfo extends PureComponent {
  state = {
    openConfirm: false,
  };
  deleteNews = (id) => {
    const { deleteNews, history } = this.props;
    deleteNews(id);
    history.push("/news");
  };

  componentDidMount() {
    const {
      selectNews,
      location: {
        state: { news },
      },
      selectNewsSource,
      newsSources,
    } = this.props;
    selectNews(news);
    // if (news.source) {
    // 	const source = newsSources.find(s => s._id === news.source._id)
    // 	selectNewsSource(source)
    // }
  }

  render() {
    const {
      location: {
        state: { news },
      },
    } = this.props;
    const data = news.source;
    const { openConfirm } = this.state;
    return (
      <div className="content">
        {openConfirm && (
          <ModalConfirm
            title="Удаление новости"
            message="Вы уверенны что хотите удалить новость? Все коментарии будут также удалены"
            close={() => this.setState({ openConfirm: false })}
            confirm={() => this.deleteNews(news._id)}
          />
        )}
        <div className="btn-bottom">
          <Link
            to={{
              pathname: "/news/edit_news",
              state: { news },
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
        <div className="container-fluid">
          <div className="article-item">
            <div className="row">
              <div className="col-8">
                <div className="article-item__header">
                  <div className="article-item__header-naming">
                    <div className="image image--small table__image">
                      {news.image && (
                        <img src={REACT_APP_SERVER + news.image} alt="img" />
                      )}
                    </div>
                    <p>{data.name || getUserName(data)}</p>
                  </div>
                  <div className="article-item__header-date">
                    {moment(news.updated_at).format("D MMMM YYYY, HH:mm")}
                  </div>
                </div>
                <div className="article-item__content">{news.text}</div>
              </div>
              <div className="col-4">
                <div className="article-item__statistic">
                  <span>Колличество просмотров</span>
                  <p>172</p>
                  <span>Колличество лайков</span>
                  <p>{news.likes_сount}</p>
                  <span>Колличество комментариев</span>
                  <p>{news.comments.length}</p>
                </div>
              </div>
            </div>
          </div>
          {news.comments.map((c, id) => (
            <div key={id} className="article-comment">
              <div className="row align-items-end">
                <div className="col-auto">
                  <div className="image image--small">
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="col">
                  <div className="article-comment__item">
                    <div className="article-comment__content">{c.text}</div>
                    <div className="article-comment__footer">
                      <div className="article-comment__footer-date">
                        {moment(c.created_at).format("D MMMM YYYY, HH:mm")}
                      </div>
                      <div className="article-comment__footer-likes">
                        Колличество лайков <span>{c.likes_сount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newsSources: state.news.newsSources,
});
const mapDispatchToProps = (dispatch) => ({
  deleteNews: (payload) => dispatch(t_delete_news(payload)),
  selectNews: (payload) => dispatch(a_selectNews(payload)),
  selectNewsSource: (payload) => dispatch(a_selectNewsSource(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsInfo);
