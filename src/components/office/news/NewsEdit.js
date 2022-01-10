import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'

import { getUserName } from '../../../utils/helpers'
import { t_edit_news, t_delete_comment } from '../../../redux/tracks'

const { REACT_APP_SERVER } = process.env

class NewsEdit extends PureComponent {
	state = {
		text: ''
	}

	componentDidMount() {
		const {
			location: {
				state: {
					news: { text }
				}
			}
		} = this.props
		this.setState({ text })
		window.scrollTo(0, 0)
	}

	deleteComment = (e, comment) => {
		e.preventDefault()
		const {
			deleteComment,
			history,
			location: {
				state: { news }
			}
		} = this.props
		deleteComment({ comment_id: comment._id, news_id: comment.news })
		news.comments = news.comments.filter(c => c._id !== comment._id)
		history.replace({ state: { news } })
	}

	save = e => {
		e.preventDefault()
		const { text } = this.state
		if (text.length > 2) {
			const {
				editNews,
				location: {
					state: { news }
				},
				history
			} = this.props
			editNews({ text, news_id: news._id })
			news.text = text
			history.push('/news/info', { news: { ...news, text } })
		} else {
			toast.warn('Введите текст новости')
		}
	}

	render() {
		const {
			location: {
				state: { news }
			},
			history
		} = this.props
		const { text } = this.state
		const data = news.creator || news.source
		return (
			<Fragment>
				<div className="content">
					<div className="container-fluid">
						<div className="article-item">
							<div className="row">
								<div className="col-8">
									<div className="article-item__header">
										<div className="article-item__header-naming">
											<div className="image image--small">
												{data.image && (
													<img
														src={
															REACT_APP_SERVER +
															data.image
														}
														alt="img"
													/>
												)}
											</div>
											<p>
												{data.name || getUserName(data)}
											</p>
										</div>
										<div className="article-item__header-date">
											{moment(news.updated_at).format(
												'D MMMM YYYY, HH:mm'
											)}
										</div>
									</div>
									<div className="article-item__content">
										<form className="form" id="form-text">
											<textarea
												value={text}
												onChange={e =>
													this.setState({
														text: e.target.value
													})
												}
											/>
										</form>
									</div>
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
							<div
								key={id}
								className="article-comment article-comment--edit"
							>
								<div className="row align-items-end">
									<div className="col-auto">
										<div className="image image--small">
											<img src="" alt="" />
										</div>
									</div>
									<div className="col">
										<div className="article-comment__item">
											<div className="article-comment__content">
												{c.text}
											</div>
											<div className="article-comment__footer">
												<div className="article-comment__footer-date">
													{moment(
														c.created_at
													).format(
														'D MMMM YYYY, HH:mm'
													)}
												</div>
												<div className="article-comment__footer-likes">
													Колличество лайков{' '}
													<span>{c.likes_сount}</span>
												</div>
											</div>
										</div>
										<div className="article-comment__delete">
											<a
												onClick={e =>
													this.deleteComment(e, c)
												}
												href="#!"
												className="delete-btn"
											>
												{' '}
											</a>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="btn-confirm">
					<a
						onClick={e => {
							e.preventDefault()
							history.push('/news/info', { news })
						}}
						href="#!"
						className="btn-confirm__cancel"
					>
						Отменить
					</a>
					<a
						onClick={e => this.save(e)}
						href="#!"
						className="btn-confirm__ok"
					>
						Сохранить изменения
					</a>
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	editNews: payload => dispatch(t_edit_news(payload)),
	deleteComment: payload => dispatch(t_delete_comment(payload))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewsEdit)
