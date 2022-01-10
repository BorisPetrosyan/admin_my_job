import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import skintellectualSolutionLogo from '../../../img/Skintellectual-Solution-Logo.png'
class Dashboard extends PureComponent {
	render() {
		return (
			<div className="content-index logo_content_index">
				<div className="container_fluid">
					<div className="img__logo">
						<img
							src={skintellectualSolutionLogo}
							alt="img"
						/>
					</div>
					{/* <div className="sort">
						<div className="sort__label">Показать за</div>
						<div className="sort__link">
							<a href="#!">день</a> <a href="#!">неделю</a>{' '}
							<a href="#!" className="active">
								месяц
							</a>
						</div>
					</div> */}
					{/* <div className="dashboard">
						<div className="row">
							<div className="col-6">
								<div className="item">
									<div className="dashboard__reg">
										<div className="count">1 568</div>
										<div className="row justify-content-between">
											<div className="col-auto">
												<div className="text">
													Новые регистрации
												</div>
											</div>
											<div className="col-auto">
												<div className="date">
													фев 2019
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="item">
									<div className="dashboard__login">
										<div className="count">5 678</div>
										<div className="row justify-content-between">
											<div className="col-auto">
												<div className="text">
													Входы в приложение
												</div>
											</div>
											<div className="col-auto">
												<div className="date">
													фев 2019
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="item">
									<div className="dashboard__graf">
										<div className="row justify-content-between align-items-center">
											<div className="col-auto">
												<div className="text">
													Среднее время
													<br /> на пользователя
												</div>
											</div>
											<div className="col-auto">
												<div className="count">
													1:30
												</div>
											</div>
										</div>
										<div className="graf">
											<div className="dashboard-1" />
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="item">
									<div className="dashboard__graf">
										<div className="row justify-content-between align-items-center">
											<div className="col-auto">
												<div className="text">
													Среднее колличество
													<br /> сообщений на
													пользователя
												</div>
											</div>
											<div className="col-auto">
												<div className="count">32</div>
											</div>
										</div>
										<div className="graf">
											<div className="dashboard-2" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)
