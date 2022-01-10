import React, { PureComponent } from 'react'

import Modal from './Modal'

class Confirm extends PureComponent {
	render() {
		return (
			<Modal>
				<div className="modal fade show" id="myModal">
					<div className="modal-dialog">
						<div className="modal-content">
							{/* Modal Header */}
							<div className="modal-header">
								<h4 className="modal-title">Modal Heading</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
								>
									×
								</button>
							</div>
							{/* Modal body */}
							<div className="modal-body">Modal body..</div>
							{/* Modal footer */}
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}

export default Confirm
