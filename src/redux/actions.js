export const a_setAuth = (payload) => ({
	type: 'SET_AUTH',
	payload
})
export const a_setError = (payload) => ({
	type: 'SET_ERROR',
	payload
})
export const a_setLoading = (payload) => ({
	type: 'SET_LOADING',
	payload
})
export const a_setAllUsers = (payload) => ({
	type: 'SET_USERS',
	payload
})




///////////SET_GLOSSARY////////////


export const a_setAllGlossary = (payload) => ({
	type: 'SET_GLOSSARY',
	payload
})

export const a_setGlossaryFromPage = (payload) => ({
	type: 'SET_GLOSSARY_FROM_PAGE',
	payload

})


export const a_setSelectedGlossary = (payload) => ({
	type: 'SET_SELECTED_Glossary',
	payload
})

export const a_setSelectedSeminars = (payload) => ({
	type: 'SET_SELECTED_SEMINARIS',
	payload
})

export const a_setSeminarsFromPage = (payload) => ({
	type: 'SET_SEMINARS_FROM_PAGE',
	payload
})
/////////////////////////////






export const a_setUsersFromPage = (payload) => ({
	type: 'SET_USERS_FROM_PAGE',
	payload
})
export const a_setAllCatalog = (payload) => ({
	type: 'SET_CATALOG',
	payload
})
export const a_setCatalogFromPage = (payload) => ({
	type: 'SET_CATALOG_FROM_PAGE',
	payload
})
export const a_setSelectedCatalog = (payload) => ({
	type: 'SET_SELECTED_CATALOG',
	payload
})
export const a_updateCatalogFile = (payload) => ({
	type: 'SET_CATALOG_FILE',
	payload
})
// export const a_setUserInfo = payload => ({
// 	type: 'SET_USER_INFO',
// 	payload
// })
export const a_setSelectedUser = (payload) => ({
	type: 'SET_SELECTED_USER',
	payload
})
export const a_updateUserImage = (payload) => ({
	type: 'UPDATE_USER_IMAGE',
	payload
})
export const a_setAllCompanies = (payload) => ({
	type: 'SET_COMPANIES',
	payload
})
export const a_setSelectedCompany = (payload) => ({
	type: 'SET_SELECTED_COMPANY',
	payload
})
export const a_setNewCompany = (payload) => ({
	type: 'SET_NEW_COMPANY',
	payload
})
export const a_setCompanyUsers = (payload) => ({
	type: 'SET_COMPANY_USERS',
	payload
})
export const a_setAllGroups = (payload) => ({
	type: 'SET_ALL_GROUPS',
	payload
})
export const a_setSelectedGroup = (payload) => ({
	type: 'SET_SELECTED_GROUP',
	payload
})
export const a_toggleMenu = (payload) => ({
	type: 'TOGGLE_MENU',
	payload
})
// export const a_addCompany = payload => ({
// 	type: 'ADD_NEW_COMPANY',
// 	payload
// })
// export const a_deleteCompany = payload => ({
// 	type: 'DELETE_COMPANY',
// 	payload
// })
// export const a_setRegisterStep = (payload) => ({
// 	type: 'SET_REGISTER_STEP',
// 	payload
// })
export const a_setRestoreStep = (payload) => ({
	type: 'SET_RESTORE_STEP',
	payload
})

export const a_setProfile = (payload) => ({
	type: 'SET_PROFILE',
	payload
})

export const a_setAllTags = (payload) => ({
	type: 'SET_ALL_TAGS',
	payload
})
export const a_addOrUpdateTag = (payload) => ({
	type: 'ADD_TAG',
	payload
})
export const a_deleteTag = (payload) => ({
	type: 'DELETE_TAG',
	payload
})
export const a_selectTag = (payload) => ({
	type: 'SELECT_TAG',
	payload
})

export const a_setAllNews = (payload) => ({
	type: 'SET_ALL_NEWS',
	payload
})
export const a_selectNews = (payload) => ({
	type: 'SELECT_NEWS',
	payload
})
export const a_deleteNews = (payload) => ({
	type: 'DELETE_NEWS',
	payload
})
export const a_deleteComment = (payload) => ({
	type: 'DELETE_COMMENT',
	payload
})
export const a_updateNews = (payload) => ({
	type: 'UPDATE_NEWS',
	payload
})
export const a_setSourceUsers = (payload) => ({
	type: 'SET_SOURCE_USERS',
	payload
})
export const a_setNewsObject = (payload) => ({
	type: 'SET_NEWS_OBJECT',
	payload
})
export const a_deleteNewsSource = (payload) => ({
	type: 'DELETE_NEWS_SOURCE',
	payload
})
export const a_addNewsSource = (payload) => ({
	type: 'ADD_NEWS_SOURCE',
	payload
})
export const a_addNews = (payload) => ({
	type: 'ADD_NEWS',
	payload
})
export const a_addNewsSourceToTag = (payload) => ({
	type: 'ADD_NEWS_SOURCE_TO_TAG',
	payload
})

export const a_setAllTasks = (payload) => ({
	type: 'SET_ALL_TASKS',
	payload
})
export const a_selectTask = (payload) => ({
	type: 'SELECT_TASK',
	payload
})
export const a_updateTask = (payload) => ({
	type: 'UPDATE_TASK',
	payload
})
export const a_setNewGroup = (payload) => ({
	type: 'SET_NEW_GROUP',
	payload
})
export const a_selectNewsSource = (payload) => ({
	type: 'SELECT_NEWS_SOURCE',
	payload
})

export const a_setSettings = (payload) => ({
	type: 'SET_SETTINGS',
	payload
})
export const a_changeAccess = (payload) => ({
	type: 'CHANGE_ACCESS',
	payload
})
export const a_changeRights = (payload) => ({
	type: 'CHANGE_RIGHTS',
	payload
})
export const a_addRole = (payload) => ({
	type: 'ADD_ROLE',
	payload
})
export const a_selectRole = (payload) => ({
	type: 'SELECT_ROLE',
	payload
})
export const a_deleteRole = (payload) => ({
	type: 'DELETE_ROLE',
	payload
})
export const a_updateCompanyName = (payload) => ({
	type: 'UPDATE_COMPANY_NAME',
	payload
})
export const a_changeRoleTags = (payload) => ({
	type: 'CHANGE_ROLE_TAGS',
	payload
})
export const a_setUsersComplaints = (payload) => ({
	type: 'SET_USERS_COMPLAINTS',
	payload
})
export const a_updateComplaintStatus = (payload) => ({
	type: 'UPDATE_COMPLAINT_STATUS',
	payload
})

export const a_setCompanySorted = (payload) => ({
	type: 'SORTED_COMPANY_USERS',
	payload
})

export const a_setQuizes = (payload) => ({
	type: 'SET_QUIZ',
	payload
})

export const a_setSections = (payload) => ({
	type: 'SET_SECTIONS',
	payload
})

export const a_setDiagnostics = (payload) => ({
	type: 'SET_DIAGNOSTICS',
	payload
})

export const a_setPoints = (payload) => ({
	type: 'SET_POINTS',
	payload
})
