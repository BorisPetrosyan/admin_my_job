import React, { PureComponent } from 'react'

import Modal from '../service/Modal'

class ModalInfo extends PureComponent {
	render() {
		const { title, message, close } = this.props
		return (
			<Modal>
				<div className="modal fade show" tabIndex={-1} role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h3 className="modal-title">{title}</h3>
							</div>
							<div className="modal-body">
								<p>{message}</p>
							</div>
							<div className="modal-footer">
								<button
									className="btn-confirm__ok btn-input-confirm"
									onClick={() => close()}
								>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default ModalInfo
