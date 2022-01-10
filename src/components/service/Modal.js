import React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.el = document.createElement('div')
        this.body = document.querySelector('body')
        this.el.classList.add('modal-window')
        // this.el.classList.add('pt-5')
        this.body.classList.add('modal-open')
    }

    componentDidMount() {
        modalRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el)
        this.body.classList.remove('modal-open')
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

export default Modal
