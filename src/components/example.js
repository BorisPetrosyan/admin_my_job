import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

class example extends PureComponent {
	render() {
		return <div className="">Заглушка</div>
	}
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(example)
