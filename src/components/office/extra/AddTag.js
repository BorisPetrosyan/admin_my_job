import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { t_add_tag, t_edit_tag } from '../../../redux/tracks'

class AddTag extends PureComponent {
	state = {
		name: '',
		description: ''
	}

	componentDidMount() {
		const {
			location: { pathname, state }
			// selectUser,
		} = this.props
		if (pathname === '/extra/edit_tag_name') {
			if (state) {
				const { name, description } = state.tag
				this.setState({ name, description })
			}
		}
	}

	addTag = async e => {
		e.preventDefault()
		const { name, description } = this.state
		if (name.length < 2 || description.length < 2) {
			toast.warn('Введите название и описание')
		} else {
			const {
				addTag,
				editTag,
				location: { pathname },
				history
			} = this.props
			if (pathname === '/extra/edit_tag_name') {
				const {
					state: { tag }
				} = this.props
				await editTag({ name, description, tag_id: tag._id })
				history.push('/extra/tag/' + tag._id, {
					tag: { ...tag, name, description }
				})
			} else {
				await addTag({ name, description })
				// this.setState({ name: '', description: '' })
				history.goBack()
			}
		}
	}

	render() {
		const { name, description } = this.state
		const {
			history,
			location: { pathname }
		} = this.props
		const edit = pathname === '/extra/edit_tag_name'
		return (
			<div className="content">
				<div className="container-fluid">
					<form className="form form-company-role-add" id="form-add">
						<div className="input-group">
							<div className="label">Название тега</div>
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
						<div className="input-group">
							<div className="label">Описание тега</div>
							<input
								onChange={e =>
									this.setState({
										description: e.target.value
									})
								}
								type="text"
								className="input-text"
								value={description}
							/>
						</div>
					</form>
					<div className="btn-confirm btn-confirm--reverse">
						<a
							href="#!"
							onClick={e => this.addTag(e)}
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
	addTag: async payload => {
		await dispatch(t_add_tag(payload))
	},
	editTag: async payload => {
		await dispatch(t_edit_tag(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddTag)
