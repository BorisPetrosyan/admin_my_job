import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker, { registerLocale } from 'react-datepicker'
import * as ru from 'date-fns/locale/ru'
import { toast } from 'react-toastify'

import { getUserName } from '../../../utils/helpers'
import { t_update_task } from '../../../redux/tracks'
import { taskStatusesArray } from '../../../constants'

import Select from '../../common/Select'

import 'react-datepicker/dist/react-datepicker.css'

const { REACT_APP_SERVER } = process.env
registerLocale('ru', ru)

class TaskEdit extends PureComponent {
	state = {
		description: '',
		status: null,
		deadline: null
	}

	componentDidMount() {
		const {
			location: {
				state: {
					task: { description, status, deadline }
				}
			}
		} = this.props
		this.setState({
			description,
			status: taskStatusesArray.find(s => s.value === status),
			deadline
		})
	}

	save = async e => {
		e.preventDefault()
		const {
			updateTask,
			location: {
				state: { task }
			},
			history
		} = this.props
		const { deadline, description, status } = this.state
		if (description.length > 0) {
			await updateTask({
				task_id: task._id,
				deadline,
				description,
				status: status.value
			})
			history.push('/control/task', {
				task: { ...task, deadline, description, status: status.value }
			})
		} else {
			toast.warn('Заполните необходимые поля')
		}
	}

	render() {
		const {
			location: {
				state: { task }
			},
			history
		} = this.props
		const { description, deadline, status } = this.state
		// console.log(status)
		return (
			<Fragment>
				<div className="content">
					<div className="container-fluid">
						<form className="form" id="task-edit">
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
																task.creator
																	.image
															}
															alt="img"
														/>
													)}
												</div>
												<p>
													{getUserName(task.creator)}
												</p>
											</div>
											<div className="task-item__header-date">
												{moment(task.updated_at).format(
													'D MMMM YYYY, HH:mm'
												)}
											</div>
										</div>
										<div className="task-item__content">
											<textarea
												value={description}
												onChange={e =>
													this.setState({
														description:
															e.target.value
													})
												}
											/>
										</div>
									</div>
									<div className="col-4">
										<div className="task-item__statistic">
											<span>Статус</span>
											<div className="input-group">
												{status && (
													<Select
														options={
															taskStatusesArray
														}
														className="select"
														changeHandler={selectedOption =>
															this.setState({
																status: selectedOption
															})
														}
														value={status}
													/>
												)}
											</div>
											<span>Дедлайн</span>
											<div className="input-group">
												<DatePicker
													selected={
														new Date(deadline)
													}
													onChange={deadline =>
														this.setState({
															deadline
														})
													}
													dateFormat="d MMMM, yyyy"
													minDate={new Date()}
													className="input-text"
													placeholderText="Дата"
													locale="ru"
												/>
											</div>
											<span>Исполнитель</span>
											<div className="d-flex align-items-center">
												<div className="image image--small">
													{task.performers[0]
														.image && (
														<img
															src={
																REACT_APP_SERVER +
																task
																	.performers[0]
																	.image
															}
															alt="img"
														/>
													)}
												</div>
												<p className="p2">
													{getUserName(
														task.performers[0]
													)}
												</p>
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
						onClick={e => {
							e.preventDefault()
							history.goBack()
						}}
						href="#!"
						className="btn-confirm__cancel"
					>
						Отменить
					</a>
					<a
						href="#!"
						className="btn-confirm__ok"
						onClick={e => this.save(e)}
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
	updateTask: async payload => {
		await dispatch(t_update_task(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TaskEdit)
