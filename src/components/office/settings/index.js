import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
	positionsNames,
	accessTypesArray,
	accessTypes
} from '../../../constants'
import { t_change_rights, t_change_access } from '../../../redux/tracks'

import Select from '../../common/Select'

class Settings extends PureComponent {
	toggleAccess = payload => {
		const { changeAccess } = this.props
		changeAccess(payload)
	}

	changeRights = payload => {
		const { changeRights } = this.props
		changeRights(payload)
	}

	edit = item => {

		const { history } = this.props
		history.push('/settings/edit', { item })
	}

	render() {
		const {
			settings: { positions, roles }
		} = this.props
		return (
			<div className="content">
				<div className="btn-bottom">
					<Link
						to={{
							pathname: '/settings/create_role',
							state: { edit: false }
						}}
						className="add-btn"
					>
						{' '}
					</Link>
				</div>
				<div className="container-fluid">
					<form className="form form-settings">
						<table className="table table_position">
							<thead>
								<tr>
									<th>Позиции</th>
									<th>
										Доступ{' '}
										<span className="th-small">
											в панель
											<br /> упрвления
										</span>
									</th>
									<th>Пользователи</th>
									<th>Подразделения</th>
									<th>Группы</th>
									<th>Новости</th>
									<th>История</th>
									<th>
										Доступ{' '}
										<span className="th-small">
											к дочерним
											<br /> подраздлениям
										</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{positions.map((p, id) => (
									<tr key={id} onClick={() => this.edit(p)}>
										<td>
											{/* {positionsNames[p.name].first}
											<br />
											{positionsNames[p.name].second} */}
											{p.name}
										</td>
										<td onClick={e => e.stopPropagation()}>
											<input
												className="settings-check"
												type="checkbox"
												id={`c_${id}`}
												checked={p.admin_access}
												onChange={() =>
													this.toggleAccess({
														_id: p._id,
														field: 'admin_access',
														value: !p.admin_access,
														type: 'positions'
													})
												}
											/>
											<label htmlFor={`c_${id}`} />
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'users',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={accessTypes[p.users]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'departments',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={
													accessTypes[p.departments]
												}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'groups',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={accessTypes[p.groups]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'news',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={accessTypes[p.news]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'history',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={accessTypes[p.history]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<input
												className="settings-check"
												type="checkbox"
												id={`ch_${id}`}
												checked={p.access_child}
												onChange={() =>
													this.toggleAccess({
														_id: p._id,
														field: 'access_child',
														value: !p.access_child,
														type: 'positions'
													})
												}
											/>
											<label htmlFor={`ch_${id}`} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</form>
					<form className="form form-settings">
						<table className="table table_roli">
							<thead>
								<tr>
									<th>Роли</th>
									<th>
										Доступ{' '}
										<span className="th-small">
											в панель
											<br /> упрвления
										</span>
									</th>
									<th>Пользователи</th>
									<th>Подразделение</th>
									<th>Группы</th>
									<th>Новости</th>
									<th>История</th>
									<th>
										Доступ{' '}
										<span className="th-small">
											к дочерним
											<br /> подраздлениям
										</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{roles.map((p, id) => (
									<tr key={id} onClick={() => this.edit(p)}>
										<td>{p.name}</td>
										<td onClick={e => e.stopPropagation()}>
											<input
												className="settings-check"
												type="checkbox"
												id={`rc_${id}`}
												checked={p.admin_access}
												onChange={() =>
													this.toggleAccess({
														_id: p._id,
														field: 'admin_access',
														value: !p.admin_access,
														type: 'roles'
													})
												}
											/>
											<label htmlFor={`rc_${id}`} />
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'users',
														value:
															selectedOption.value,
														type: 'roles'
													})
												}
												value={accessTypes[p.users]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'departments',
														value:
															selectedOption.value,
														type: 'roles'
													})
												}
												value={
													accessTypes[p.departments]
												}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'groups',
														value:
															selectedOption.value,
														type: 'roles'
													})
												}
												value={accessTypes[p.groups]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'news',
														value:
															selectedOption.value,
														type: 'roles'
													})
												}
												value={accessTypes[p.news]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<Select
												options={accessTypesArray}
												className="select select-settings"
												changeHandler={selectedOption =>
													this.changeRights({
														_id: p._id,
														field: 'history',
														value:
															selectedOption.value,
														type: 'roles'
													})
												}
												value={accessTypes[p.history]}
												classNamePrefix="my-settings"
											/>
										</td>
										<td onClick={e => e.stopPropagation()}>
											<input
												className="settings-check"
												type="checkbox"
												id={`rch_${id}`}
												checked={p.access_child}
												onChange={() =>
													this.toggleAccess({
														_id: p._id,
														field: 'access_child',
														value: !p.access_child,
														type: 'roles'
													})
												}
											/>
											<label htmlFor={`rch_${id}`} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	settings: state.settings
})
const mapDispatchToProps = dispatch => ({
	changeRights: payload => {
		dispatch(t_change_rights(payload))
	},
	changeAccess: payload => {
		dispatch(t_change_access(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings)
