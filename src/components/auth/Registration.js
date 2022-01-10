import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { t_register } from '../../redux/tracks'

class Registration extends PureComponent {
	state = {
		email: '',
		company: '',
		password: '',
		repeat_password: '',
		first_name: '',
		last_name: '',
		middle_name: '',
		phone_number: ''
	}

	close = e => {
		e.preventDefault()
		this.props.history.push('/')
	}

	register = async e => {
		e.preventDefault()
		const {
			email,
			company,
			password,
			repeat_password,
			first_name,
			last_name,
			middle_name,
			phone_number
		} = this.state
		const { registration, history } = this.props
		let err = false
		if (
			!phone_number ||
			!email ||
			!first_name ||
			!last_name ||
			!password ||
			!repeat_password
		) {
			err = true
			toast.warn('Заполните необходимые поля')
		}
		if (password !== repeat_password) {
			err = true
			toast.warn('Пароли не совпадают')
		}
		if (!err) {
			await registration({
				email,
				company,
				password,
				repeat_password,
				first_name,
				last_name,
				middle_name,
				phone_number
			})
			history.push('/')
		}
	}

	render() {
		const {
			email,
			company,
			password,
			repeat_password,
			first_name,
			last_name,
			middle_name,
			phone_number
		} = this.state
		return (
			<div className="main full main-auth main-auth--reg">
				<div className="content">
					<a
						onClick={e => this.close(e)}
						href="#!"
						className="main-auth-close"
					>
						{' '}
					</a>
					<form className="form auth-form">
						<h2>Регистрация</h2>
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-6">
									<div className="input-group">
										<div className="label">Email</div>
										<input
											type="email"
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
									<div className="input-group">
										<div className="label">
											Номер телефона
										</div>
										<input
											type="phone"
											className="input-text"
											value={phone_number}
											onChange={e =>
												this.setState({
													phone_number: e.target.value
												})
											}
										/>
									</div>
									<div className="input-group">
										<div className="label">Компания</div>
										<input
											type="text"
											name="company"
											className="input-text"
											value={company}
											onChange={e =>
												this.setState({
													company: e.target.value
												})
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
												this.setState({
													password: e.target.value
												})
											}
										/>
									</div>
									<div className="input-group">
										<div className="label">
											Повторите пароль
										</div>
										<input
											type="password"
											name="password"
											className="input-text"
											value={repeat_password}
											onChange={e =>
												this.setState({
													repeat_password:
														e.target.value
												})
											}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="input-group">
										<div className="label">Имя</div>
										<input
											type="text"
											name="name"
											className="input-text"
											value={first_name}
											onChange={e =>
												this.setState({
													first_name: e.target.value
												})
											}
										/>
									</div>
									<div className="input-group">
										<div className="label">Фамилия</div>
										<input
											type="text"
											name="surname"
											className="input-text"
											value={last_name}
											onChange={e =>
												this.setState({
													last_name: e.target.value
												})
											}
										/>
									</div>
									<div className="input-group">
										<div className="label">Отчество</div>
										<input
											type="text"
											name="patronymic"
											className="input-text"
											value={middle_name}
											onChange={e =>
												this.setState({
													middle_name: e.target.value
												})
											}
										/>
									</div>
								</div>
							</div>
						</div>
						<a
							href="#!"
							className="btn-confirm__ok"
							onClick={e => this.register(e)}
						>
							Зарегистрироваться
						</a>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	registration: async payload => await dispatch(t_register(payload))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Registration)
