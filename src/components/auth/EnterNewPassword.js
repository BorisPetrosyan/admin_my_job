import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { a_setRestoreStep } from '../../redux/actions'
import { t_restore_password } from '../../redux/tracks'

class RestoreRouter extends PureComponent {
    componentDidMount() {
        const url = new URL(window.location.href)
        const reset_token = url.searchParams.get('reset_token')
        if (reset_token) {
            this.setState({ reset_token })
        } else {
            this.props.history.push('/')
        }
    }

    state = {
        reset_token: '',
        new_password: '',
        repeat_password: ''
    }

    close = e => {
        e.preventDefault()
        this.props.history.push('/')
    }

    save = async () => {
        const { new_password, repeat_password, reset_token } = this.state
        const { savePassword } = this.props
        let err = false
        if (!new_password || !repeat_password) {
            err = true
            toast.warn('Заполните поля')
        }
        if (new_password !== repeat_password) {
            err = true
            toast.warn('Пароли не совпадают')
        }
        if (!err) {
            await savePassword({ reset_token, new_password, repeat_password })
        }
    }

    render() {
        const { new_password, repeat_password } = this.state
        return (
            <div className="main full main-auth">
                <div className="content">
                    <a
                        onClick={e => this.close(e)}
                        href="#!"
                        className="main-auth-close"
                    >
                        {' '}
                    </a>
                    <form className="form auth-form">
                        <h2>Восстановление пароля</h2>
                        <p>
                            Придумайте новый пароль
                            <br />
                            <br />
                        </p>
                        <div className="input-group">
                            <div className="label">Пароль</div>
                            <input
                                type="password"
                                name="password"
                                className="input-text"
                                value={new_password}
                                onChange={e =>
                                    this.setState({
                                        new_password: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="input-group">
                            <div className="label">Повторите пароль</div>
                            <input
                                type="password"
                                name="password"
                                className="input-text"
                                value={repeat_password}
                                onChange={e =>
                                    this.setState({
                                        repeat_password: e.target.value
                                    })
                                }
                            />
                        </div>
                        <br />
                        <button
                            onClick={() => this.save()}
                            className="btn-confirm__ok"
                        >
                            Сохранить и войти
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    setRestoreStep: payload => {
        dispatch(a_setRestoreStep(payload))
    },
    savePassword: async payload => {
        await dispatch(t_restore_password(payload))
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestoreRouter)
