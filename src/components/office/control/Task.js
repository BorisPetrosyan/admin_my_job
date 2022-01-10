import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { getUserName } from '../../../utils/helpers'
// import { t_delete_news } from '../../../redux/tracks'
import { taskStatuses } from '../../../constants'

import ModalConfirm from '../../common/ModalConfirm'

const { REACT_APP_SERVER } = process.env

class Task extends PureComponent {
	state = {
		openConfirm: false
	}
	deleteTask = id => {
		const { deleteNews, history } = this.props
		deleteNews(id)
		history.push('/news')
	}

	render() {
		const {
			location: {
				state: { task }
			}
		} = this.props
		const { openConfirm } = this.state
		return (
			<div className="content">
				{openConfirm && (
					<ModalConfirm
						title="Удаление задачи"
						message="Вы уверенны что хотите удалить задачу?"
						close={() => this.setState({ openConfirm: false })}
						confirm={() => this.deleteTask(task._id)}
					/>
				)}
				<div className="btn-bottom">
					<Link
						to={{
							pathname: '/control/edit_task',
							state: { task }
						}}
						className="edit-btn"
					>
						{' '}
					</Link>
					<a
						onClick={e => {
							e.preventDefault()
							this.setState({ openConfirm: true })
						}}
						href="#!"
						className="delete-btn"
					>
						{' '}
					</a>
				</div>
				<div className="container-fluid">
					<div className="task-item">
						<div className="row">
							<div className="col-8">
								<div className="task-item__header">
									<div className="task-item__header-naming">
										<div className="image image--small">
											{task.creator.image && (
												<img
													src={
														REACT_APP_SERVER +
														task.creator.image
													}
													alt="img"
												/>
											)}
										</div>
										<p>{getUserName(task.creator)}</p>
									</div>
									<div className="task-item__header-date">
										{moment(task.updated_at).format(
											'D MMMM YYYY, HH:mm'
										)}
									</div>
								</div>
								<div className="task-item__content">
									{task.description}
								</div>
							</div>
							<div className="col-4">
								<div className="task-item__statistic">
									<span>Статус</span>
									<p>{taskStatuses[task.status].name}</p>
									<span>Дедлайн</span>
									<p>{moment(task.deadline).format('LL')}</p>
									<span>Исполнитель</span>
									<div className="d-flex align-items-center">
										<div className="image image--small" />
										<p className="p2">
											{getUserName(task.performers[0])}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Task)
