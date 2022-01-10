import React, { Component } from 'react'
import { connect } from 'react-redux'
import logoBrand from '../../img/Skintellectual-Solution-Logo.png'

class ServerError extends Component {
	render() {
		return (
			<div className="server-error">
				<img src={logoBrand} alt="server-error-logo" />
				<p>Видимо произошла ошибка :(</p>
				<p>Попробуйте обновить страницу :)</p>
				<button
					className="btn"
					onClick={() => window.location.reload()}
				>
					Обновить
				</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	// language: state.user.language
})

export default connect(mapStateToProps)(ServerError)
