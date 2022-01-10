export const getHMFromDate = (str) => {
	let date = new Date(str)
	const h = date.getHours()
	const m = date.getMinutes()
	return `${('0' + h).slice(-2)}:${('0' + m).slice(-2)}`
}

export const getUneadedMessages = (arr, _id) => {
	let count = arr.reduce((sum, cur) => {
		if (cur.sender._id !== _id && !cur.viewers.includes(_id)) {
			return ++sum
		}
		return sum
	}, 0)
	return count
}
export const sms_timer = (name) => {
	let sms_time = localStorage.getItem(name)
	if (sms_time && +sms_time > 0) {
		const timer = setInterval(() => {
			let s = localStorage.getItem(name)
			localStorage.setItem(name, --s)
			if (+s <= 0) {
				localStorage.removeItem(name)
				clearInterval(timer)
			}
		}, 1000)
	}
}

// export const getFullName = ({ first_name, last_name, middle_name }) => {
// 	return `${last_name} ${first_name} ${middle_name}`
// }

export const getUserName = (
	{ first_name, last_name, middle_name, phone_number },
	full = false
) => {
	const full_name = full
		? `${last_name} ${first_name} ${middle_name}`
		: `${first_name} ${last_name}`
	const res = full_name.length > 4 ? full_name : phone_number
	return res
};



///Glossary////////////

export const getGlossaryName = (
	{ first_name, last_name, middle_name, phone_number },
	full = false
) => {
	const full_name = full
		? `${last_name} ${first_name} ${middle_name}`
		: `${first_name} ${last_name}`
	const res = full_name.length > 4 ? full_name : phone_number
	return res
};




///Glossary////////////





//catalog
export const getCatalogName = (
	{ first_name, last_name, middle_name, phone_number },
	full = false
) => {
	const full_name = full
		? `${last_name} ${first_name} ${middle_name}`
		: `${first_name} ${last_name}`
	const res = full_name.length > 4 ? full_name : phone_number
	return res
}





export function isNumeric(number) {
	return !isNaN(parseFloat(number)) && isFinite(number)
}

export const reEscape = (s) => {
	return s.replace(/[.*+?^${}()|[\]\\ ]/gi, '')
}

export function copy(str) {
	let tmp = document.createElement('INPUT')
	let focus = document.activeElement

	tmp.value = str

	document.body.appendChild(tmp)
	tmp.select()
	document.execCommand('copy')
	document.body.removeChild(tmp)
	focus.focus()
}
