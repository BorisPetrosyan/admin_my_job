export const next_sms_time = 300
export const languages = [
	{ name: 'English', value: 'en' },
	{ name: 'Русский', value: 'ru' }
]
// export const months = [
// 	'Январь', 'Февраль', 'Март',
// 	'Апрель', 'Май', 'Июнь',
// 	'Июль', 'Август', 'Сентябрь',
// 	'Октябрь', 'Ноябрь', 'Декабрь'
// ]

export const terms_links = {
	confidentiality: 'http://agreement.univ.center/confidentiality/',
	terms: 'http://agreement.univ.center/terms-of-use/',
	agreement: 'http://agreement.univ.center/agreement/'
}

export const taskStatuses = {
	set: { name: 'Поставлена', num: 1 },
	accepted: { name: 'Принята', num: 2 },
	in_work: { name: 'В работе', num: 3 },
	canceled: { name: 'Отклонена', num: 0 },
	completed: { name: 'Выполнена', num: 4 },
	done: { name: 'Сдана', num: 5 }
}

export const positionsNames = {
	gen_admin: {
		name: 'Главный администратор Системы',
		first: 'Главный администратор',
		second: 'Системы'
	},
	department_admin: {
		name: 'Администратор подразделения',
		first: 'Администратор',
		second: 'подразделения'
	},
	department_head: {
		name: 'Руководитель подразделения',
		first: 'Руководитель',
		second: 'подразделения'
	},
	user: {
		name: 'Пользователь подразделения',
		first: 'Пользователь',
		second: 'подразделения'
	},
	department_manager: {
		name: 'Менеджер подразделения',
		first: 'Менеджер',
		second: 'подразделения'
	},
	group_head: {
		name: 'Руководитель группы'
	},
	group_admin: {
		name: 'Администратор группы'
	}
}

export const accessTypes = {
	no_access: {
		name: 'Нет доступа',
		value: 'no_access',
		_id: 0
	},
	view: {
		name: 'Просмотр',
		value: 'view',
		_id: 1
	},
	control: {
		name: 'Управление',
		value: 'control',
		_id: 2
	}
}

export const accessTypesArray = [
	{ name: 'Нет доступа', value: 'no_access', _id: 0 },
	{ name: 'Просмотр', value: 'view', _id: 1 },
	{ name: 'Управление', value: 'control', _id: 2 }
]

export const taskStatusesArray = [
	{ value: 'set', name: 'Поставлена', _id: 1 },
	{ value: 'accepted', name: 'В работе', _id: 2 },
	{ value: 'canceled', name: 'Отменена', _id: 0 },
	{ value: 'completed', name: 'Выполнена', _id: 3 },
	{ value: 'done', name: 'Сдана', _id: 4 }
]
// export const clientRights = {
// 	0: { name: 'в своем подразделении', _id: 0 },
// 	1: { name: 'на уровень выше', _id: 1 },
// 	2: {
// 		name: 'для руководителей подразделений своего уровня',
// 		_id: 2
// 	},
// 	3: {
// 		name: 'для всех руководителей подразделений',
// 		_id: 3
// 	},
// 	4: { name: 'для всех', _id: 4 }
// }

// export const clientRightsArray = [
// 	{ value: 0, name: 'в своем подразделении', _id: 0 },
// 	{ value: 1, name: 'на уровень выше', _id: 1 },
// 	{
// 		value: 2,
// 		name: 'для руководителей подразделений своего уровня',
// 		_id: 2
// 	},
// 	{
// 		value: 3,
// 		name: 'для всех руководителей подразделений',
// 		_id: 3
// 	},
// 	{ value: 4, name: 'для всех', _id: 4 }
// ]
export const clientRights = {
	0: { name: 'Ни с кем. Никого не видит', _id: 0 },
	1: { name: 'Только по указанному тегу', _id: 1 },
	2: {
		name: 'В своем подразделении и по указанному тегу (вносится тег)',
		_id: 2
	},
	3: {
		name: 'В своем подразделении и со всеми админами уровня ниже',
		_id: 3
	},
	4: { name: 'В своем подразделении и со всеми админами', _id: 4 },
	5: {
		name: 'В своем подразделении и со всеми менеджерами уровня ниже',
		_id: 5
	},
	6: {
		name:
			'В своем подразделении и со всеми менеджерами других подразделений',
		_id: 6
	},
	7: {
		name: 'В своем подразделении и со всеми руководителями подразделений',
		_id: 7
	},
	8: {
		name:
			'В своем подразделении и с руководителями подразделений своего уровня',
		_id: 8
	},
	9: { name: 'В своем подразделении и всеми уровнями ниже', _id: 9 },
	10: { name: 'В своем подразделении', _id: 10 },
	11: { name: 'В фирме в целом', _id: 11 }
}

export const clientRightsArray = [
	{ value: 0, name: 'Ни с кем. Никого не видит', _id: 0 },
	{ value: 1, name: 'Только по указанному тегу', _id: 1 },
	{
		value: 2,
		name: 'В своем подразделении и по указанному тегу (вносится тег)',
		_id: 2
	},
	{
		value: 3,
		name: 'В своем подразделении и со всеми админами уровня ниже',
		_id: 3
	},
	{ value: 4, name: 'В своем подразделении и со всеми админами', _id: 4 },
	{
		value: 5,
		name: 'В своем подразделении и со всеми менеджерами уровня ниже',
		_id: 5
	},
	{
		value: 6,
		name:
			'В своем подразделении и со всеми менеджерами других подразделений',
		_id: 6
	},
	{
		value: 7,
		name: 'В своем подразделении и со всеми руководителями подразделений',
		_id: 7
	},
	{
		value: 8,
		name:
			'В своем подразделении и с руководителями подразделений своего уровня',
		_id: 8
	},
	{ value: 9, name: 'В своем подразделении и всеми уровнями ниже', _id: 9 },
	{ value: 10, name: 'В своем подразделении', _id: 10 },
	{ value: 11, name: 'В фирме в целом', _id: 11 }
]

export const newsWritePermissions = {
	'-1': { name: 'Запрещено', value: -1, _id: 0 },
	'0': { name: 'Обычные', value: 0, _id: 1 },
	'1': { name: 'Важные', value: 1, _id: 2 },
	'2': { name: 'Очень важные', value: 2, _id: 3 }
}
