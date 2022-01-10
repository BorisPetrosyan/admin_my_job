import React from 'react'

const Loader = ({ className, style }) => {
	return (
		<div className="loader">
			<i
				className={`loader fa fa-spinner fa-pulse ${className || ''}`}
				style={style}
			/>
		</div>
	)
}

export default Loader
