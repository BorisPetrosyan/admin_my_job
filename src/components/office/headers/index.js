import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { a_toggleMenu } from '../../../redux/actions'
import { getUserName } from '../../../utils/helpers'

const { PUBLIC_URL } = process.env;

class Header extends PureComponent {
	_getTitle = () => {
		const {
			location: { pathname }
		} = this.props;
		switch (true) {
			case /users/.test(pathname):
				return { title: 'Пользователи', path: '/users' };
			case /news/.test(pathname):
				return { title: 'Новости', path: '/news' };
			case /companies/.test(pathname):
				return { title: 'Компании и роли', path: '/companies' };
			case /extra/.test(pathname):
				return { title: 'Дополнительные параметры', path: '/extra' };
			case /settings/.test(pathname):
				return { title: 'Настройки', path: '/settings' };
			case /control/.test(pathname):
				return { title: 'Контроль', path: '/control' };
			case /profile/.test(pathname):
				return { title: 'Мой профиль', path: '/profile' };
			case /complaints/.test(pathname):
				return { title: 'Жалобы', path: '/complaints' };
			default:
				return { title: '', path: '/' }
		}
	}

	_renderSelected = () => {
		const {
			location: { pathname },
			selectedUser,
			selectedCompany,
			selectedTask,
			selectedGroup,
			selectedSource,
			selectedRole
		} = this.props;
		switch (true) {
			case /users\/[info, edit]/.test(pathname):
				return (
					<Link
						to={{
							pathname: selectedUser
								? '/users/info/' + selectedUser._id
								: '/',
							state: { user: selectedUser }
						}}
					>
						{selectedUser ? getUserName(selectedUser, true) : ''}
					</Link>
				);
			case /companies\/edit/.test(pathname):
				return (
					<a href="#!">{selectedCompany && selectedCompany.name}</a>
				)
			case /news\/info/.test(pathname):
			case /news\/source/.test(pathname):
			case /news\/edit_news/.test(pathname):
			case /news\/edit_source/.test(pathname):
				return (
					<Link
						to={{
							pathname: selectedSource ? '/news/source' : '/news',
							state: {
								source: selectedSource
							}
						}}
					>
						Страница источника
					</Link>
				);
			case /control\/task/.test(pathname):
			case /control\/edit_task/.test(pathname):
				return (
					<Link
						to={{
							pathname: selectedTask
								? '/control/task'
								: '/control',
							state: {
								task: selectedTask
							}
						}}
					>
						Задача
					</Link>
				);
			case /control\/group_info/.test(pathname):
			case /control\/edit_group/.test(pathname):
				return (
					<Link
						to={{
							pathname: '/control/group_info',
							state: {
								group: selectedGroup
							}
						}}
					>
						Страница группы
					</Link>
				);
			case /settings\/edit/.test(pathname):
				return (
					<Link
						to={{
							pathname: selectedRole.client
								? '/settings/client'
								: '/settings'
						}}
					>
						{selectedRole.client
							? 'Клиентские приложения'
							: 'Панель управления'}
					</Link>
				);
			default:
				return null
		}
	};

	_renderAction = () => {
		const {
			location: { pathname },
			selectedNews,
			selectedRole
		} = this.props;
		switch (true) {
			case /users\/edit/.test(pathname):
				return <Link to={pathname}>Редактировать пользователя</Link>
			case /users\/add/.test(pathname):
				return <Link to="/users/add">Добавить пользователя</Link>
			case /extra\/add_tag/.test(pathname):
				return <Link to="/extra/add_tag">Добавить тег</Link>
			case /extra\/tag/.test(pathname):
				return <Link to="/extra/tag">Редактировать тег</Link>
			case /extra\/edit_tag_name/.test(pathname):
				return <Link to="/extra/edit_tag_name">Редактировать тег</Link>
			case /news\/info/.test(pathname):
			case /news\/edit_news/.test(pathname):
				return (
					<Link
						to={{
							pathname: selectedNews ? '/news/info' : '/news',
							state: {
								source: selectedNews && selectedNews.source
							}
						}}
					>
						Страница новости
					</Link>
				);
			case /news\/add_source/.test(pathname):
				return <Link to="/news/add_source">Добавить источник</Link>
			case /control\/edit_task/.test(pathname):
				return <Link to="/control/edit_task">Редактировать задачу</Link>
			case /control\/edit_group/.test(pathname):
				return (
					<Link to="/control/edit_group">Редактировать группу</Link>
				);
			case /settings\/edit/.test(pathname):
				return (
					<Link to="/settings">
						{selectedRole.item && selectedRole.item.name}
					</Link>
				);
			default:
				return null
		}
	};

	_renderAction4 = () => {
		const {
			location: { pathname }
		} = this.props
		switch (true) {
			case /news\/edit_source/.test(pathname):
				return <Link to={pathname}>Редактировать источник</Link>
			case /news\/edit_news/.test(pathname):
				return <Link to={pathname}>Редактировать новость</Link>
			default:
				return null
		}
	}

	render() {
		const el = this._getTitle()
		const {
			toggleMenu,
			location: { pathname }
		} = this.props
		const admin = pathname === '/settings'
		const client = pathname === '/settings/client'
		const links = admin || client
		return (
			<header>
				<div className="logo">
					<a href="/">Skintellectual</a>
				</div>
				<div className="header-nav">
					<div onClick={() => toggleMenu()} className="icon-btn">
						<img
							src={PUBLIC_URL + '/img/icon-btn.svg'}
							alt="img"
							width={28}
						/>
					</div>
					<div className="header-breadcrumbs">
						<Link to={el.path}>{el.title}</Link>
						{this._renderSelected()}
						{this._renderAction()}
						{this._renderAction4()}
					</div>
				</div>
				{links && (
					<div className="header-link">
						<Link to="/settings" className={`${admin && 'active'}`}>
							Панель управления
						</Link>
						<Link
							to="/settings/client"
							className={`${client && 'active'}`}
						>
							Клиентские приложения
						</Link>
					</div>
				)}
				<Link to="/profile" className="header-login">
					<img
						src={PUBLIC_URL + '/img/header-login-icon.svg'}
						alt="img"
						width={28}
					/>
				</Link>
			</header>
		)
	}
}

const mapStateToProps = state => ({
	selectedUser: state.users.selectedUser,
	selectedCompany: state.companies.selectedCompany,
	selectedNews: state.news.selectedNews,
	selectedTask: state.control.selectedTask,
	selectedGroup: state.control.selectedGroup,
	selectedSource: state.news.selectedSource,
	selectedRole: state.settings.selectedRole
});
const mapDispatchToProps = dispatch => ({
	toggleMenu: () => {
		dispatch(a_toggleMenu())
	}
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Header)
)
