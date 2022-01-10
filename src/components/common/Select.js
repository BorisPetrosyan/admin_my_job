import React, { PureComponent } from 'react'
// import Select from 'reactize-selectize'
// import 'selectize/dist/css/selectize.css'
import Select from 'react-select'

// const testdata = ['test1', 'test 2123 123']
// 	className={className}
// 	multiple={multiple}
// 	placeholder={placeholder}
// 	onChange={e => func && func(e.target)}
// >
// 	{this._renderOptions(data)}
const generateOptions = (options, labelField, valueField) => {
	return options.map((o) => {
		return {
			value:
				typeof o === 'object'
					? valueField
						? o[valueField]
						: o._id
					: o,
			label:
				typeof o === 'object'
					? labelField
						? o[labelField]
						: o.name
					: o,
			data: o
		}
	})
}

class MySelect extends PureComponent {
	state = {
		options: []
	}

	componentDidMount() {
		let { options = [], labelField, valueField } = this.props
		this.setState({
			options: generateOptions(options, labelField, valueField)
		})
	}

	static getDerivedStateFromProps (nextProps, prevState) {
		if (nextProps.options) {
		  return {options: generateOptions(nextProps.options, '', '')}
		}
		return {options: []}
	}
	// static getDerivedStateFromProps(nextProps) {
	// 	if (nextProps.data) {
	// 		return {
	// 			data: [...nextProps.data]
	// 		}
	// 	}
	// 	return null
	// }

	// _recursiveOptions(c, ml) {
	// 	if (c.subdivisions && c.subdivisions.length > 0) {
	// 		return c.subdivisions.map(s => (
	// 			<Fragment key={s._id}>
	// 				<option
	// 					className={`my-ml-${ml}`}
	// 					style={{ marginLeft: ml + 'px' }}
	// 					value={s._id ? +s._id : s}
	// 				>
	// 					{s.name || s}
	// 				</option>
	// 				{this._recursiveOptions(s, ml + 10)}
	// 			</Fragment>
	// 		))
	// 	}
	// }

	// _renderOptions = data => {
	// 	return data.map((o, id) => (
	// 		<option key={id} value={o._id ? +o._id : o}>
	// 			{o.name || o}
	// 		</option>
	// 	))
	// }

	// handleChange = selectedOption => {
	// 	const { changeHandler } = this.props
	// 	// this.setState({ selectedOption })
	// 	changeHandler(selectedOption)
	// }
	render() {
		let {
			className = 'select',
			isMulti = false,
			isSearchable = false,
			placeholder = '',
			value,
			changeHandler,
			labelField,
			valueField,
			classNamePrefix,
			isDisabled
		} = this.props
		let { options } = this.state
		// options = options ? [{ _id: -1, name: 'Не выбрано' }, ...options] : []
		// console.log('value', value)

		value = isMulti
			? value
			: generateOptions([value], labelField, valueField)[0]
		// console.log(isMulti, options, value)
		return (
			<Select
				value={value}
				onChange={(selectedOption) =>
					changeHandler(
						isMulti ? selectedOption : selectedOption.data
					)
				}
				options={options}
				className={className}
				isMulti={isMulti}
				isSearchable={isSearchable}
				closeMenuOnSelect={!isMulti}
				placeholder={placeholder}
				classNamePrefix={classNamePrefix}
				isDisabled={isDisabled}
			/>
		)
	}
}
export default MySelect
