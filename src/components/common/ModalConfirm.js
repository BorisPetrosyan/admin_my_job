import React, { PureComponent } from 'react'
// import { toast } from 'react-toastify'

import Modal from '../service/Modal'

const { PUBLIC_URL } = process.env

class ModalConfirm extends PureComponent {
	render() {
		const { title, message, confirm, close } = this.props
		return (
			<Modal>
				<div className="modal fade show" tabIndex={-1} role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h3 className="modal-title">
									{title || 'Подтверждение действия'}
								</h3>
								<div
									onClick={() => close()}
									className="modal-filter__close"
								>
									<img
										src={PUBLIC_URL + '/img/close.svg'}
										alt="img"
										width={30}
									/>
								</div>
							</div>
							<div className="modal-body">
								<p>
									{message ||
										'Вы хотите подведить это действие?'}
								</p>
							</div>
							<div className="modal-footer">
								<button
									onClick={() => confirm()}
									className="btn-confirm__ok btn-input-confirm"
								>
									Подтвердить
								</button>
								<button
									className="btn-confirm__ok btn-input-confirm"
									onClick={() => close()}
								>
									Отменить
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default ModalConfirm
