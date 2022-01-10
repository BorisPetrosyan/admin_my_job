import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { t_edit_group, t_upload_group_image } from '../../../redux/tracks'
import { a_setSelectedGroup } from '../../../redux/actions'

import ImageUpload from '../../common/ImageUpload'

class EditGroup extends PureComponent {
	state = {
		name: '',
		cannot_be_deleted: false
	}

	componentDidMount() {
		const {
			location: {
				state: { group }
			},
			selectGroup
		} = this.props
		selectGroup(group)
		const { name, cannot_be_deleted } = group
		this.setState({ name, cannot_be_deleted })
	}

	handleImageUpload = acceptedFiles => {
		const {
			location: {
				state: { group }
			},
			selectGroup,
			uploadGroupImage,
			history
		} = this.props
		let payload = new FormData()
		payload.append('file', acceptedFiles[0])
		payload.append('group_id', group._id)
		uploadGroupImage(payload, image => {
			selectGroup({ ...group, image })
			history.replace({ state: { group: { ...group, image } } })
		})
	}

	save = async e => {
		e.preventDefault()
		const { name, cannot_be_deleted } = this.state
		if (name.length < 2) {
			toast.warn('Введите корректное название')
		} else {
			const {
				editGroup,
				history,
				location: {
					state: { group }
				}
			} = this.props
			await editGroup({ name, cannot_be_deleted, _id: group._id })
			history.push('/control/group_info', {
				group: { ...group, name, cannot_be_deleted }
			})
		}
	}

	render() {
		let { name, cannot_be_deleted } = this.state
		const {
			history,
			location: {
				state: { group }
			}
		} = this.props
		return (
			<div className="content">
				<div className="container-fluid">
					<form className="form form-control-group-add" id="form-add">
						<div className="form-photo">
							<ImageUpload
								type="image"
								image={group.image}
								onDrop={this.handleImageUpload}
							/>
						</div>
						<div className="input-group">
							<div className="label">Название группы</div>
							<input
								type="text"
								className="input-text"
								placeholder="Название группы"
								value={name}
								onChange={e =>
									this.setState({ name: e.target.value })
								}
							/>
						</div>
						<div className="input-group">
							<div className="label">Удалямость группы</div>
							<input
								className="settings-check"
								type="checkbox"
								id="с1"
								checked={cannot_be_deleted}
								onChange={() =>
									this.setState(prevState => ({
										cannot_be_deleted: !prevState.cannot_be_deleted
									}))
								}
							/>
							<label htmlFor="с1" className="checkbox-label">
								Нельзя удалить
							</label>
						</div>
					</form>
					<div className="btn-confirm btn-confirm--reverse">
						<a
							href="#!"
							className="btn-confirm__ok"
							onClick={e => this.save(e)}
						>
							Сохранить
						</a>
						<a
							onClick={e => {
								e.preventDefault()
								history.goBack()
							}}
							className="btn-confirm__cancel"
							href="#!"
						>
							Отменить
						</a>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.companies,
	newGroup: state.control.newGroup
})
const mapDispatchToProps = dispatch => ({
	editGroup: async payload => {
		await dispatch(t_edit_group(payload))
	},
	uploadGroupImage: (payload, onSuccess) => {
		dispatch(t_upload_group_image(payload, onSuccess))
	},
	selectGroup: payload => {
		dispatch(a_setSelectedGroup(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditGroup)
