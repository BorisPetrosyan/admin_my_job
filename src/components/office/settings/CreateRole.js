import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { t_edit_role, t_create_role } from '../../../redux/tracks'

class CreateRole extends PureComponent {
	state = {
		name: ''
	}

	componentDidMount() {
		const {
			location: {
				state: { edit, item }
			}
		} = this.props
		if (edit) {
			this.setState({ name: item.name })
		}
	}

	createRole = async e => {
		e.preventDefault()
		const { name } = this.state
		if (name.length < 2) {
			toast.warn('Введите название роли')
		} else {
			const {
				createRole,
				editRole,
				location: {
					state: { edit, item }
				},
				history
			} = this.props
			if (edit) {
				await editRole({ name, role_id: item._id })
				history.push('/settings/edit', {
					edit,
					item: { ...item, name }
				})
			} else {
				await createRole({ name })
				history.goBack()
			}
		}
	}

	render() {
		const { name } = this.state
		const {
			history,
			location: {
				state: { edit }
			}
		} = this.props
		return (
			<div className="content">
				<div className="container-fluid">
					<form className="form form-company-role-add" id="form-add">
						<div className="input-group">
							<div className="label">Название роли</div>
							<input
								onChange={e =>
									this.setState({
										name: e.target.value
									})
								}
								type="text"
								className="input-text"
								value={name}
							/>
						</div>
					</form>
					<div className="btn-confirm btn-confirm--reverse">
						<a
							href="#!"
							onClick={e => this.createRole(e)}
							className="btn-confirm__ok"
						>
							{edit ? 'Сохранить' : 'Добавить'}
						</a>
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
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	createRole: payload => {
		dispatch(t_create_role(payload))
	},
	editRole: payload => {
		dispatch(t_edit_role(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateRole)
