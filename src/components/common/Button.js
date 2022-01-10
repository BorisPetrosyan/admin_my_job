import React from 'react'
import LaddaButton, { SLIDE_LEFT } from 'react-ladda'

const Button = React.forwardRef((props, ref) => {
	let { className, label, name, loading, onClick, children, ...rest } = props
	
	return (
		<LaddaButton
			className={ className }
			loading={ loading }
			onClick={ onClick }
			data-style={ SLIDE_LEFT }
			data-spinner-color="#fff"
			data-color="#000"
			title={ name }
			{ ...rest }
			ref={ ref }
		>
			{ label || children }
		</LaddaButton>
	)
})

export default Button
