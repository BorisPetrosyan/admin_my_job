import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { t_get_restore_link } from '../../redux/tracks'

class Restore extends PureComponent {
	state = {
		email: '',
		confirm: false
	}
	close = e => {
		e.preventDefault()
		this.props.history.push('/')
	}
	restore = async () => {
		const { email } = this.state
		const { getLink } = this.props
		try {
			await getLink({ email })
			this.setState({ confirm: true })
		} catch (err) {}
	}
	render() {
		const { email, confirm } = this.state
		return (
			<div className="main full main-auth">
				<div className="content">
					<a
						onClick={e => this.close(e)}
						href="#!"
						className="main-auth-close"
					>
						{' '}
					</a>
					<form className="form auth-form">
						<h2>Восстановление пароля</h2>
						{!confirm ? (
							<Fragment>
								<p>
									Введите email, который вы использовали при
									регистрации
									<br />
									<br />
								</p>
								{/* <a href="#" class="link-reg">регистрацию</a> */}
								<div className="input-group">
									<div className="label">Email</div>
									<input
										type="text"
										name="email"
										className="input-text"
										value={email}
										onChange={e =>
											this.setState({
												email: e.target.value
											})
										}
									/>
								</div>
								<br />
								<button
									onClick={() => this.restore()}
									type="button"
									className="btn-confirm__ok"
								>
									Восстановить пароль
								</button>
							</Fragment>
						) : (
							<Fragment>
								<br />
								<br />
								<p>
									На ваш email была отправлена ссылка для
									изменения пароля
								</p>
							</Fragment>
						)}
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	getLink: async payload => await dispatch(t_get_restore_link(payload))
})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Restore)
)
