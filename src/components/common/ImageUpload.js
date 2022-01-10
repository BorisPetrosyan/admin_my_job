import React, { PureComponent } from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'

// import { newImage } from '../../constants'
const { REACT_APP_SERVER, PUBLIC_URL } = process.env

class ImageUpload extends PureComponent {
	_render = (getRootProps, getInputProps) => {
		let { image, local, smallImage } = this.props
		if (image) {
			image = local ? image : REACT_APP_SERVER + image
		}
		return (
			<label {...getRootProps()} onClick={(e)=>e.stopPropagation()}>
				<input type="file" {...getInputProps()} />
				<img
					src={image || PUBLIC_URL + '/img/add-photo.svg'}
					alt="img"
					width={image ? '100%' : smallImage || 60}
				/>
			</label>
		)
	}

	render() {
		const { onDrop } = this.props
		// const accept = type === 'image' ? newImage.formats : ''
		return (
			<Dropzone
				//maxSize={ newImage.maxSize }
				//accept={ accept }
				multiple={false}
				onDrop={onDrop}
				onDropRejected={() =>
					toast.error('Неверный формат или размер файла')
				}
			>
				{({ getRootProps, getInputProps, isDragActive }) =>
					this._render(getRootProps, getInputProps)
				}
			</Dropzone>
		)
	}
}

export default ImageUpload
