import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { t_create_group, t_upload_group_image } from '../../../redux/tracks'
// import { a_setNewGroup } from '../../../redux/actions'

import ImageUpload from '../../common/ImageUpload'

class CreateGroup extends PureComponent {
	state = {
		name: '',
		cannot_be_deleted: false,
		img: null
	}

	handleImageUpload = acceptedFiles => {
		this.setState({ img: acceptedFiles[0] })
		// const { newGroup, setNewGroup } = this.props
		// setNewGroup({ ...newGroup, img: acceptedFiles[0] })
	}

	createGroup = async e => {
		e.preventDefault()
		const { name, cannot_be_deleted, img } = this.state
		if (name.length < 2) {
			toast.warn('Введите корректное название')
		} else {
			const { createGroup, history, uploadGroupImage } = this.props
			await createGroup({ name, cannot_be_deleted }, group => {
				if (img) {
					let payload = new FormData()
					payload.append('file', img)
					payload.append('group_id', group._id)
					uploadGroupImage(payload, () => null)
				}
				history.goBack()
			})
		}
	}

	render() {
		let { name, img, cannot_be_deleted } = this.state
		img = img ? URL.createObjectURL(img) : null
		return (
			<div className="content">
				<div className="container-fluid">
					<form className="form form-control-group-add" id="form-add">
						<div className="form-photo">
							<ImageUpload
								type="image"
								image={img}
								local
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
							onClick={e => this.createGroup(e)}
						>
							Добавить
						</a>
						<Link to="/control" className="btn-confirm__cancel">
							Отменить
						</Link>
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
	createGroup: async (payload, onSuccess) => {
		await dispatch(t_create_group(payload, onSuccess))
	},
	uploadGroupImage: payload => {
		dispatch(t_upload_group_image(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateGroup)
