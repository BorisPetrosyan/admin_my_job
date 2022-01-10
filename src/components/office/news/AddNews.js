import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { t_create_news } from '../../../redux/tracks'
import ImageUpload from '../../common/ImageUpload'

class AddNews extends PureComponent {
	state = {
		image: null,
		text: ''
	}

	addNews = async e => {
		e.preventDefault()
		const { text, image } = this.state
		if (text.length < 2) {
			toast.warn('Введите текст новости')
		} else {
			const {
				createNews,
				history,
				location: {
					state: { source }
				}
			} = this.props
			const payload = new FormData()
			payload.append('text', text);
			payload.append('source', source._id);
			if (image) {
				payload.append('file', image)
			}
			await createNews(payload, source => {
				history.push('/news/source', { source })
			})
		}
	}

	handleImageUpload = acceptedFiles => {
		if (acceptedFiles[0]) {
			this.setState({
				image: acceptedFiles[0]
			})
		}
	}

	render() {
		const {
			history,
			// sources,
			location: {
				state: { source }
			}
		} = this.props
		const { text, image } = this.state
		const img = image
		? URL.createObjectURL(image)
		: null
		return (
			<div className="content">
				<div className="container-fluid">
					<form className="form form-news-new" id="form-add">
						<div className="row">
							<div className="col-7">
								<div className="input-group">
									<div className="label">Источник</div>
									{/*<Select
										options={sources}
										className="select"
										placeholder="Источник"
										changeHandler={selectedOption => {
											this.setState({
												source: selectedOption
											})
										}}
										value={source}
									/>*/}
									<input
										type="text"
										className="input-text"
										defaultValue={source.name}
										disabled
									/>
								</div>
							</div>
						</div>
						<div className="form-photo">
							{img && (
								<img
									src={img}
									id="img-preview"
									alt="img"
								/>
							)}
							<ImageUpload
								onDrop={this.handleImageUpload}
							/>
						</div>
						<div className="input-group">
							<div className="label">Текст новости</div>
							<textarea
								onChange={e =>
									this.setState({
										text: e.target.value
									})
								}
								type="text"
								value={text}
							/>
						</div>
					</form>
					<div className="btn-confirm btn-confirm--reverse">
						<a
							href="#!"
							className="btn-confirm__ok"
							onClick={e => this.addNews(e)}
						>
							Отправить
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

const mapStateToProps = state => ({
	// sources: state.news.newsSources
})
const mapDispatchToProps = dispatch => ({
	createNews: async (payload, onSuccess) => {
		await dispatch(t_create_news(payload, onSuccess))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddNews)
