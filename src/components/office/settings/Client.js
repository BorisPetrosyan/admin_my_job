import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
	positionsNames,
	clientRightsArray,
	clientRights,
	newsWritePermissions
} from '../../../constants'
import { t_change_rights, t_change_role_tags } from '../../../redux/tracks'

import Select from '../../common/Select'

const clientRightsForPositions = clientRightsArray.filter(
	(r) => r.value < 1 || r.value > 2
)

class ClientSettings extends PureComponent {
	state = {
		selectedTags: {
			create_groups: []
		}
	}

	changeRights = (payload) => {
		const { changeRights } = this.props
		changeRights(payload)
	}

	edit = (item) => {
		const { history } = this.props
		history.push('/settings/edit', { item, client: true })
	}

	changeTags = (payload) => {
		const { changeRoleTags } = this.props
		payload.tags = payload.tags || []
		changeRoleTags(payload)
	}

	render() {
		const {
			settings: { positions, roles },
			tags
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
						<table className="table client-table">
							<thead>
								<tr>
									<th>Позиции</th>
									<th>Создание групп</th>
									<th>
										Доступ к просмотру
										<br /> контактов
									</th>
									<th>Постановка задач</th>
									<th>Разрешение писать новости</th>
									<th>Написание новостей</th>
									<th>Запрос геолокации</th>
								</tr>
							</thead>
							<tbody>
								{positions.map((p, id) => (
									<tr key={id} onClick={() => this.edit(p)}>
										<td>
											{p.name}
											{/* {positionsNames[p.name].first}
											<br />
											{positionsNames[p.name].second} */}
										</td>
										<td
											onClick={(e) => e.stopPropagation()}
										>
											<Select
												options={
													clientRightsForPositions
												}
												className="select select-settings"
												changeHandler={(
													selectedOption
												) =>
													this.changeRights({
														_id: p._id,
														field: 'create_groups',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={
													clientRights[
													p.create_groups
													]
												}
												classNamePrefix="my-client-settings"
											/>
										</td>
										<td
											onClick={(e) => e.stopPropagation()}
										>
											<Select
												options={
													clientRightsForPositions
												}
												className="select select-settings"
												changeHandler={(
													selectedOption
												) =>
													this.changeRights({
														_id: p._id,
														field: 'view_contacts',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={
													clientRights[
													p.view_contacts
													]
												}
												classNamePrefix="my-client-settings"
											/>
										</td>
										<td
											onClick={(e) => e.stopPropagation()}
										>
											<Select
												options={
													clientRightsForPositions
												}
												className="select select-settings"
												changeHandler={(
													selectedOption
												) =>
													this.changeRights({
														_id: p._id,
														field:
															'tasks_assignment',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={
													clientRights[
													p.tasks_assignment
													]
												}
												classNamePrefix="my-client-settings"
											/>
										</td>
										<td
											onClick={(e) => e.stopPropagation()}
										>
											<Select
												options={Object.values(
													newsWritePermissions
												)}
												className="select select-settings"
												changeHandler={(
													selectedOption
												) =>
													this.changeRights({
														_id: p._id,
														field:
															'news_write_permission',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={
													newsWritePermissions[
													p.news_write_permission
													]
												}
												classNamePrefix="my-client-settings"
											/>
										</td>
										<td
											onClick={(e) => e.stopPropagation()}
										>
											<Select
												options={
													clientRightsForPositions
												}
												className="select select-settings"
												changeHandler={(
													selectedOption
												) =>
													this.changeRights({
														_id: p._id,
														field: 'create_news',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={
													clientRights[p.create_news]
												}
												classNamePrefix="my-client-settings"
												isDisabled={
													p.news_write_permission ===
													-1
												}
											/>
										</td>
										<td
											onClick={(e) => e.stopPropagation()}
										>
											<Select
												options={
													clientRightsForPositions
												}
												className="select select-settings"
												changeHandler={(
													selectedOption
												) =>
													this.changeRights({
														_id: p._id,
														field: 'request_geo',
														value:
															selectedOption.value,
														type: 'positions'
													})
												}
												value={
													clientRights[p.request_geo]
												}
												classNamePrefix="my-client-settings"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</form>
					{tags && (
						<form className="form form-settings client-table">
							<table className="table">
								<thead>
									<tr>
										<th>Роли</th>
										<th>Создание групп</th>
										<th>
											Доступ к просмотру
											<br /> контактов
										</th>
										<th>Постановка задач</th>
										<th>Разрешение писать новости</th>
										<th>Написание новостей</th>
										<th>Запрос геолокации</th>
									</tr>
								</thead>
								<tbody>
									{roles.map((p, id) => (
										<tr
											key={id}
											onClick={() => this.edit(p)}
										>
											<td>{p.name}</td>
											<td
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={(
														selectedOption
													) =>
														this.changeRights({
															_id: p._id,
															field:
																'create_groups',
															value:
																selectedOption.value,
															type: 'roles'
														})
													}
													value={
														clientRights[
														p.create_groups
														]
													}
													classNamePrefix="my-client-settings"
												/>
												<Select
													options={tags}
													className="select select-settings mt-5"
													changeHandler={(
														selectedOptions
													) =>
														this.changeTags({
															role_id: p._id,
															tags: selectedOptions,
															field:
																'create_groups_tags'
														})
													}
													isMulti
													value={
														p.create_groups_tags &&
														p.create_groups_tags.map(
															(t) => {
																return {
																	value:
																		t._id,
																	label:
																		t.name,
																	data: t
																}
															}
														)
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
											<td
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={(
														selectedOption
													) =>
														this.changeRights({
															_id: p._id,
															field:
																'view_contacts',
															value:
																selectedOption.value,
															type: 'roles'
														})
													}
													value={
														clientRights[
														p.view_contacts
														]
													}
													classNamePrefix="my-client-settings"
												/>
												<Select
													options={tags}
													className="select select-settings mt-5"
													changeHandler={(
														selectedOptions
													) =>
														this.changeTags({
															role_id: p._id,
															tags: selectedOptions,
															field:
																'view_contacts_tags'
														})
													}
													isMulti
													value={
														p.view_contacts_tags &&
														p.view_contacts_tags.map(
															(t) => {
																return {
																	value:
																		t._id,
																	label:
																		t.name,
																	data: t
																}
															}
														)
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
											<td
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={(
														selectedOption
													) =>
														this.changeRights({
															_id: p._id,
															field:
																'tasks_assignment',
															value:
																selectedOption.value,
															type: 'roles'
														})
													}
													value={
														clientRights[
														p.tasks_assignment
														]
													}
													classNamePrefix="my-client-settings"
												/>
												<Select
													options={tags}
													className="select select-settings mt-5"
													changeHandler={(
														selectedOptions
													) =>
														this.changeTags({
															role_id: p._id,
															tags: selectedOptions,
															field:
																'tasks_assignment_tags'
														})
													}
													isMulti
													value={
														p.tasks_assignment_tags &&
														p.tasks_assignment_tags.map(
															(t) => {
																return {
																	value:
																		t._id,
																	label:
																		t.name,
																	data: t
																}
															}
														)
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
											<td
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<Select
													options={Object.values(
														newsWritePermissions
													)}
													className="select select-settings"
													changeHandler={(
														selectedOption
													) =>
														this.changeRights({
															_id: p._id,
															field:
																'news_write_permission',
															value:
																selectedOption.value,
															type: 'roles'
														})
													}
													value={
														newsWritePermissions[
														p
															.news_write_permission
														]
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
											<td
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={(
														selectedOption
													) =>
														this.changeRights({
															_id: p._id,
															field:
																'create_news',
															value:
																selectedOption.value,
															type: 'roles'
														})
													}
													value={
														clientRights[
														p.create_news
														]
													}
													classNamePrefix="my-client-settings"
													isDisabled={
														p.news_write_permission ===
														-1
													}
												/>
												<Select
													options={tags}
													className="select select-settings mt-5"
													changeHandler={(
														selectedOptions
													) =>
														this.changeTags({
															role_id: p._id,
															tags: selectedOptions,
															field:
																'create_news_tags'
														})
													}
													isMulti
													value={
														p.create_news_tags &&
														p.create_news_tags.map(
															(t) => {
																return {
																	value:
																		t._id,
																	label:
																		t.name,
																	data: t
																}
															}
														)
													}
													classNamePrefix="my-client-settings"
													isDisabled={
														p.news_write_permission ===
														-1
													}
												/>
											</td>
											<td
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={(
														selectedOption
													) =>
														this.changeRights({
															_id: p._id,
															field:
																'request_geo',
															value:
																selectedOption.value,
															type: 'roles'
														})
													}
													value={
														clientRights[
														p.request_geo
														]
													}
													classNamePrefix="my-client-settings"
												/>
												<Select
													options={tags}
													className="select select-settings mt-5"
													changeHandler={(
														selectedOptions
													) =>
														this.changeTags({
															role_id: p._id,
															tags: selectedOptions,
															field:
																'request_geo_tags'
														})
													}
													isMulti
													value={
														p.request_geo_tags &&
														p.request_geo_tags.map(
															(t) => {
																return {
																	value:
																		t._id,
																	label:
																		t.name,
																	data: t
																}
															}
														)
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</form>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	settings: state.settings,
	tags: state.extra.tags
})
const mapDispatchToProps = (dispatch) => ({
	changeRights: (payload) => {
		dispatch(t_change_rights(payload))
	},
	changeRoleTags: (payload) => {
		dispatch(t_change_role_tags(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientSettings)
