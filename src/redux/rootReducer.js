import { combineReducers } from 'redux'

import auth from './reducers/auth'
import error from './reducers/error'
import service from './reducers/service'
import profile from './reducers/profile'
import users from './reducers/users'
import catalog from './reducers/catalog'
import companies from './reducers/companies'
import control from './reducers/control'
import news from './reducers/news'
import extra from './reducers/extra'
import settings from './reducers/settings'
import glossary from './reducers/glossary'
import seminars from './reducers/seminar'
import quizes from './reducers/quizes'
import sections from './reducers/sections'
import diagnostics from './reducers/diagnostics'
import diagnosticsPoints from './reducers/diagnosticsPoints'

// import error from './Error/reducer'
export default combineReducers({
	auth,
	error,
	service,
	profile,
	users,
	catalog,
	companies,
	control,
	extra,
	news,
	settings,
	glossary,
	seminars,
	quizes,
	sections,
	diagnostics,
	diagnosticsPoints
})
