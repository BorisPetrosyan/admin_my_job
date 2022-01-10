import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUserName } from '../../../utils/helpers'
// import { t_load_companies } from '../../../redux/tracks'

class Companies extends PureComponent {
	_recursiveSub(c, level) {
		if (
			!c.subdivisions ||
			(c.subdivisions && c.subdivisions.length === 0)
		) {
			return null
		}
		// let localSub = sub
		// console.log(c._id, sub, localSub)
		return c.subdivisions.map(s => (
			<Fragment key={s._id}>
				<tr
					className={`tr-sub-${level}`}
					onClick={() => this.editCompany(s)}
				>
					<td> {s.name} </td>
					<td> {s.users.length} </td>
					<td>{s.head ? getUserName(s.head) : '-'}</td>
					<td>{s.admin ? getUserName(s.admin) : '-'}</td>
					<td>{s.manager ? getUserName(s.manager) : '-'}</td>
				</tr>
				{this._recursiveSub(s, s.level)}
			</Fragment>
		))
	}

	editCompany = c => {
		const { history } = this.props
		history.push(`/companies/edit/${c._id}`, { company: c })
	}

	render() {
		const {
			companies: { data }
		} = this.props
		return (
			<div className="content">
				<div className="btn-bottom">
					<Link to="/companies/add" className="add-btn" />
				</div>
				<div className="container-fluid">
					{data && data.length > 0 ? (
						<table className="table table-link-js">
							<thead>
								<tr>
									<th>Наименование</th>
									<th>Сотрудников</th>
									<th>Руководитель</th>
									<th>Администратор</th>
									<th>Менеджер</th>
								</tr>
							</thead>
							<tbody>
								{data.map(
									c =>
										c.level === 1 && (
											<Fragment key={c._id}>
												<tr
													onClick={() =>
														this.editCompany(c)
													}
												>
													<td> {c.name} </td>
													<td>{c.users.length}</td>
													<td>
														{c.head
															? getUserName(
																	c.head
															  )
															: '-'}
													</td>
													<td>
														{c.admin
															? getUserName(
																	c.admin
															  )
															: '-'}
													</td>
													<td>
														{c.manager
															? getUserName(
																	c.manager
															  )
															: '-'}
													</td>
												</tr>
												{this._recursiveSub(c, c.level)}
											</Fragment>
										)
								)}
							</tbody>
						</table>
					) : (
						<div>Нет компаний</div>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.companies
})
const mapDispatchToProps = dispatch => ({
	// loadCompanies: () => {
	// 	dispatch(t_load_companies())
	// }
})

export default connect(mapStateToProps, mapDispatchToProps)(Companies)
