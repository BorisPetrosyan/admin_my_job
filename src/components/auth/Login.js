import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { t_login } from '../../redux/tracks'

import Button from '../common/Button'

class Login extends PureComponent {
	state = {
		email: '',
		password: '',
		loading: false
	}

	singIn = async e => {
		e.preventDefault()
		const { login } = this.props
		const { email, password } = this.state
		if (email && password) {
			try {
				this.setState({ loading: true })
				await login({
					email,
					password
				})
			} catch (err) {
				this.setState({ loading: false })
			}
			// console.log(r)
			// .then(res => console.log(1, res))
			// .catch(err => console.log(2, err))
			// login({
			// 	payload: {
			// 		email,
			// 		password
			// 	}
			// fail: res => {
			// 	const { msg, errors, phone_email, password } = res
			// 	if (msg) {
			// 		toast.error(msg)
			// 	} else if (errors) {
			// 		toast.error(errors[0].msg)
			// 	} else if (phone_email || password) {
			// 		this.setState({
			// 			invalid_phone: phone_email,
			// 			invalid_password: password
			// 		})
			// 	}
			// }
			// })
		} else {
			toast.warn('Заполните все поля')
		}
	}

	onChangeCode = value => {
		if (value.length !== 0) {
			this.setState({ code: value, invalid_phone: null })
		}
	}

	render() {
		let { email, password, loading } = this.state
		return (
			<div className="main full main-auth">
				<div className="content">
					<form className="form auth-form">
						<h2>Авторизация</h2>
						{/* <p>Если у вас нет аккаунта, пройдите</p>
						<Link to="/registration" className="link-reg">
							регистрацию
						</Link> */}
						<div className="input-group">
							<div className="label">Email</div>
							<input
								type="text"
								name="email"
								className="input-text"
								value={email}
								onChange={e =>
									this.setState({ email: e.target.value })
								}
							/>
						</div>
						<div className="input-group">
							<div className="label">Пароль</div>
							<input
								type="password"
								name="password"
								className="input-text"
								value={password}
								onChange={e =>
									this.setState({ password: e.target.value })
								}
							/>
						</div>
						{/* <Link to="/restore_pass" className="link-pass">
							Забыли пароль?
						</Link> */}
						<Button
							className="btn-confirm__ok"
							onClick={e => this.singIn(e)}
							loading={loading === 'login'}
							label="Войти"
						/>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.service.loading
})
const mapDispatchToProps = dispatch => ({
	login: payload => dispatch(t_login(payload))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
