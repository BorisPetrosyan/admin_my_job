import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckboxTree from 'react-checkbox-tree'

// let values = []
// let ids = []

// const getNodesIds = nodes => {
// 	for (let node of nodes) {
// 		if (node.children) {
// 			if (!ids.includes(String(node.value))) {
// 				ids.push(String(node.value))
// 			}
// 			getNodesIds(node.children)
// 		}
// 	}
// }

// let currentChecked = null
// let check = null
// const getNodeIds = nodes => {
// 	let ids = []

// 	nodes.forEach(({ value, children }) => {
// 		ids = [...ids, value, ...getNodeIds(children)]
// 	})

// 	return ids
// }

class TreeSelect extends Component {
	state = {
		expanded: []
	}

	onCheck = checked => {
		const { onCheck } = this.props
		onCheck(checked)
		// getNodesIds(nodes)
		// console.log(ids, currentChecked)
		// if (ids.includes(currentChecked)) {
		// 	console.log(1)
		// }
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	const { checked } = this.props
	// 	const nextChecked = nextProps.checked
	// 	let current = null
	// 	if (checked.length !== nextChecked.length) {
	// 		if (checked.length > nextChecked.length) {
	// 			current = checked.filter(i => !nextChecked.includes(i))
	// 			check = false
	// 		} else {
	// 			current = nextChecked.filter(i => !checked.includes(i))
	// 			check = true
	// 		}
	// 	}
	// 	if (current !== null) {
	// 		currentChecked = current[0]
	// 	} else {
	// 		currentChecked = null
	// 	}
	// 	return true
	// }

	// componentDidMount() {
	// 	currentChecked = null
	// }

	render() {
		const { nodes, checked } = this.props
		// const { checked } = this.state
		// console.log(check)
		return (
			<CheckboxTree
				noCascade
				showExpandAll
				showNodeIcon={false}
				nodes={nodes}
				checked={checked}
				expanded={this.state.expanded}
				onCheck={checked => this.onCheck(checked)}
				onExpand={expanded => this.setState({ expanded })}
				icons={{
					check: <span className="rct-icon rct-icon-check" />,
					uncheck: <span className="rct-icon rct-icon-uncheck" />,
					halfCheck: (
						<span className="rct-icon rct-icon-half-check" />
					),
					expandClose: (
						<span className="rct-icon rct-icon-expand-close" />
					),
					expandOpen: (
						<span className="rct-icon rct-icon-expand-open" />
					),
					expandAll: (
						<span className="rct-icon rct-icon-expand-all" />
					),
					collapseAll: (
						<span className="rct-icon rct-icon-collapse-all" />
					),
					parentClose: (
						<span className="rct-icon rct-icon-parent-close" />
					),
					parentOpen: (
						<span className="rct-icon rct-icon-parent-open" />
					),
					leaf: <span className="rct-icon rct-icon-leaf" />
				}}
			/>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TreeSelect)
