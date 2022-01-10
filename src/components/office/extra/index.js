import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const { REACT_APP_SERVER } = process.env

const sortByName = (a, b) => {
	let nameA = a.name.toLowerCase(),
		nameB = b.name.toLowerCase()
	if (nameA < nameB) return -1
	if (nameA > nameB) return 1
	return 0
}

const sortByUsersCount = (a, b) => {
	let l1 = a.users.length,
		l2 = b.users.length
	if (l1 < l2) return 1
	if (l1 > l2) return -1
	return 0
}

class Extra extends PureComponent {
	state = {
		sort: 'name'
	}

	sort = (e, sort) => {
		e.preventDefault()
		let { tags } = this.props
		this.setState({ sort })
		switch (sort) {
			case 'name':
				tags.sort(sortByName)
				break
			case 'users':
				tags.sort(sortByUsersCount)
				break
			default:
				return null
		}
	}

	edit = tag => {
		const { history } = this.props
		history.push('/extra/tag/' + tag._id, { tag })
	}

	render() {
		const { tags } = this.props
		const { sort } = this.state
		return (
			<div className="content">
				<div className="btn-bottom">
					<Link to="/extra/add_tag" className="add-btn">
						{' '}
					</Link>
				</div>
				<div className="container-fluid">
					<div className="sort">
						<div className="sort__label">Сортировать по</div>
						<div className="sort__link">
							<a
								onClick={e => this.sort(e, 'users')}
								className={`${sort === 'users' ? 'active' : ''
									}`}
								href="#!"
							>
								пользователям
							</a>{' '}
							<a
								onClick={e => this.sort(e, 'name')}
								className={`${sort === 'name' ? 'active' : ''}`}
								href="#!"
							>
								названию
							</a>
						</div>
					</div>
					{tags && tags.length > 0 ? (
						<table className="table table-link-js">
							<thead>
								<tr className="table_tag">
									<th>Тег</th>
									<th>Пользователей</th>
									<th>Источник новостей</th>
									<th>Описание</th>
								</tr>
							</thead>
							<tbody>
								{tags.map(t => (
									<tr
										key={t._id}
										onClick={() => this.edit(t)}
									>
										<td>{t.name}</td>
										<td>{t.users.length}</td>
										<td className="d-flex align-items-start justify-content-center flex-column">
											{t.sources.length > 0 ? (
												t.sources.map((s, id) => (
													<div
														className="d-flex align-items-center"
														key={id}
														style={{
															marginTop:
																id === 0 ? 0 : 5
														}}
													>
														<div className="table__image">
															{s.image && (
																<img
																	src={
																		REACT_APP_SERVER +
																		s.image
																	}
																	alt="img"
																/>
															)}
														</div>
														&nbsp;
														<span>{s.name}</span>
													</div>
												))
											) : (
												<div>-</div>
											)}
										</td>
										<td>{t.description}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div>Теги не найдены</div>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	tags: state.extra.tags
})
const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Extra)
