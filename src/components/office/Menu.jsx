import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Menu extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			toggleDiagnosticMenu: false
		}
	}
	handleToggleDiagnostics = () => this.setState(prevState => ({ ...prevState, toggleDiagnosticMenu: !prevState.toggleDiagnosticMenu }))

	render() {
		const { hiddenMenu } = this.props
		return (
			<nav className={hiddenMenu ? 'hidden' : ''}>
				<ul data-active={1}>
					{/* <li>
						<NavLink exact to="/" activeClassName="active">
							Дашборд
						</NavLink>
					</li> */}
					<li>
						<NavLink to="/users" activeClassName="active">
							Пользователи
						</NavLink>
					</li>
					<li>
						<NavLink to="/news" activeClassName="active">
							Новости
						</NavLink>
					</li>
					<li>
						<NavLink to="/publications" activeClassName="active">
							Публикация
						</NavLink>
					</li>
					<li>
						<NavLink to="/companies" activeClassName="active">
							Компании
						</NavLink>
					</li>
					<li>
						<NavLink to="/extra" activeClassName="active">
							Теги
						</NavLink>
					</li>
					<li>
						<NavLink to="/settings" activeClassName="active">
							Позиции и роли
						</NavLink>
					</li>
					<li>
						<NavLink to="/control" activeClassName="active">
							Контроль
						</NavLink>
					</li>
					<li>
						<NavLink to="/complaints" activeClassName="active">
							Жалобы
						</NavLink>
					</li>
					<li>
						<NavLink to="/catalog" activeClassName="active">
							Каталог
						</NavLink>
					</li>
					<li>
						<NavLink to="/glossary" activeClassName="active">
							Глоссарий
						</NavLink>
					</li>
					<li>
						<NavLink to="/axes" activeClassName="active">
							Таблица Осей
						</NavLink>
					</li>
					<li className="diagnostic_item">
						<div className="diagnostic_link" onClick={this.handleToggleDiagnostics} >
							Диагностика
						</div>
					</li>
					{this.state.toggleDiagnosticMenu &&
						<div className="diagnostic_menu">
 							{this.props.diagnostics && this.props.diagnostics.map(diagnostic => 
								<li  key={diagnostic._id}>
									<NavLink to={`/diagnostics-points/${diagnostic._id}`} activeClassName="active">
										{diagnostic.name_ru}
									</NavLink>
								</li>
							)}
							<div className="diagnostics_footer">
								<li>
									<NavLink to="/diagnostics/questionnaire" activeClassName="active">
										Опросник
									</NavLink>
								</li>
								<li>
									<NavLink to="/diagnostics/country" activeClassName="active">
										Страна и УФИ
									</NavLink>
								</li>
							</div>
							<li>
								<NavLink to="/diagnostics/diagnostic-limitations" activeClassName="active">
									Ограничения диагностики
								</NavLink>
							</li>
						</div>
					}
					<li>
						<NavLink to="/seminars" activeClassName="active">
							Семинары
						</NavLink>
					</li>

				</ul>
			</nav>
		)
	}
}

const mapStateToProps = (state) => ({
	hiddenMenu: state.service.hiddenMenu,
	diagnostics: state.diagnostics.data.docs,
});
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
