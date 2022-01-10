import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// import moment from 'moment'

import { a_selectTask } from '../../../redux/actions'
import { getUserName } from '../../../utils/helpers'
// import { taskStatuses } from '../../../constants'

import Search from '../users/Search'

const { PUBLIC_URL } = process.env

const sortByName = (a, b) => {
    let nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
}
const sortByStatus = (a, b) => {
    let nameA = a.status.toLowerCase(),
        nameB = b.status.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
}

const sortByDate = (a, b) => {
    let dateA = new Date(a.updated_at),
        dateB = new Date(b.updated_at)
    return dateA - dateB
}

const sortByUsersCount = (a, b) => {
    let l1 = a.participants.length,
        l2 = b.participants.length
    if (l1 < l2) return 1
    if (l1 > l2) return -1
    return 0
}

class Control extends PureComponent {
    state = {
        openGroups: true,
        openMap: false,
        openTasks: true,
        editGroups: false,
        selectedGroups: [],
        tasksSort: 'name',
        groupsSort: 'name'
    }

    sortTasks = (e, tasksSort) => {
        e.preventDefault()
        let {
            control: { tasks }
        } = this.props
        this.setState({ tasksSort })
        switch (tasksSort) {
            case 'name':
                tasks.sort(sortByName)
                break
            case 'date':
                tasks.sort(sortByDate)
                break
            case 'status':
                tasks.sort(sortByStatus)
                break
            default:
                return null
        }
    }
    sortGroups = (e, groupsSort) => {
        e.preventDefault()
        let {
            control: { groups }
        } = this.props
        this.setState({ groupsSort })
        switch (groupsSort) {
            case 'name':
                groups.sort(sortByName)
                break
            case 'users_count':
                groups.sort(sortByUsersCount)
                break
            default:
                return null
        }
    }

    // componentDidMount() {
    //     this.props.loadAllGroups()
    // }

    editGroups = e => {
        e.preventDefault()
        this.setState(prevState => ({ editGroups: !prevState.editGroups }))
    }

    deleteGroups = e => {
        e.preventDefault()
        let selectedGroups = [...this.state.selectedGroups]
        if (selectedGroups.length > 0) {
            toast.info('Не реализовано')
            // const {
            //     location: {
            //         state: { company }
            //     },
            //     history: { replace },
            //     deleteCompanyUsers
            // } = this.props
            // deleteCompanyUsers({
            //     payload: { company_id: company._id, users: selectedGroups },
            //     success: company => {
            //         replace({ state: { company } })
            //     }
            // })
        } else {
            toast.warn('Группы не выбраны')
        }
    }

    selectGroup = id => {
        let selectedGroups = [...this.state.selectedGroups]
        if (selectedGroups.includes(id)) {
            selectedGroups = selectedGroups.filter(u => u !== id)
        } else {
            selectedGroups.push(id)
        }
        this.setState({ selectedGroups })
    }

    render() {
        const {
            openGroups,
            editGroups,
            openMap,
            selectedGroups,
            // tasksSort,
            groupsSort,
            // openTasks
        } = this.state
        const {
            control: { groups },
            users,
            history,
            // selectTask
        } = this.props
        return (
            <div className="content">
                <div
                    className={`accordion-container table-edit-js ${openMap ? '' : 'hide'
                        }`}
                >
                    <div className="accordion-header">
                        <div className="accordion-header__title">
                            Пользователи
                        </div>
                        <div
                            onClick={() =>
                                this.setState(prevState => ({
                                    openMap: !prevState.openMap
                                }))
                            }
                            className={`accordion-header__btn ${openMap ? '' : 'hide'
                                }`}
                        >
                            <img
                                src={PUBLIC_URL + '/img/accordion.svg'}
                                alt="img"
                                width={24}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col">
                            <Search />
                        </div>
                        <div className="col-auto">
                            <h6>{users.length} пользователей</h6>
                        </div>
                    </div>
                    <div id="map" />
                </div>
                <div
                    className={`accordion-container table-edit-js ${openGroups ? '' : 'hide'
                        } ${editGroups ? 'table-edit-js--edit' : ''}`}
                >
                    <div className="accordion-header">
                        <div className="accordion-header__title">
                            Групповые диалоги
                        </div>
                        <div
                            onClick={() =>
                                this.setState(prevState => ({
                                    openGroups: !prevState.openGroups
                                }))
                            }
                            className={`accordion-header__btn ${openGroups ? '' : 'hide'
                                }`}
                        >
                            <img
                                src={PUBLIC_URL + '/img/accordion.svg'}
                                alt="img"
                                width={24}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <div className="sort">
                                <div className="sort__label">
                                    Сортировать по
                                </div>
                                <div className="sort__link">
                                    <a
                                        className={`${groupsSort === 'users_count'
                                            ? 'active'
                                            : ''
                                            }`}
                                        onClick={e =>
                                            this.sortGroups(e, 'users_count')
                                        }
                                        href="#!"
                                    >
                                        колличеству пользователей
                                    </a>{' '}
                                    <a
                                        className={`${groupsSort === 'name'
                                            ? 'active'
                                            : ''
                                            }`}
                                        onClick={e =>
                                            this.sortGroups(e, 'name')
                                        }
                                        href="#!"
                                    >
                                        названию
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="btns btns--small">
                                {editGroups && (
                                    <a
                                        href="#!"
                                        className="cancel-btn"
                                        onClick={e => this.editGroups(e)}
                                    >
                                        {' '}
                                    </a>
                                )}
                                <a
                                    href="#!"
                                    className={`${editGroups ? 'delete' : 'edit'
                                        }-btn`}
                                    onClick={
                                        editGroups
                                            ? e => this.deleteGroups(e)
                                            : e => this.editGroups(e)
                                    }
                                >
                                    {' '}
                                </a>
                                <Link
                                    to={{
                                        pathname: '/control/create_group'
                                    }}
                                    className="add-btn"
                                >
                                    {' '}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {groups && groups.length > 0 ? (
                        <table className="table table-choose-js table-link-js">
                            <thead>
                                <tr>
                                    <th />
                                    <th>Название группы</th>
                                    <th>Пользователей</th>
                                    <th>Руководитель</th>
                                    <th>Администратор</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((g, id) => (
                                    <tr
                                        key={id}
                                        onClick={() =>
                                            history.push(
                                                '/control/group_info',
                                                { group: g }
                                            )
                                        }
                                    >
                                        <td>
                                            <div className="table__circle">
                                                <input
                                                    type="checkbox"
                                                    id={`c${id}`}
                                                    className="table-check"
                                                    checked={selectedGroups.includes(
                                                        g._id
                                                    )}
                                                    onChange={() =>
                                                        this.selectGroup(g._id)
                                                    }
                                                />
                                                <label htmlFor={`c${id}`} />
                                            </div>
                                        </td>
                                        <td> {g.name} </td>
                                        <td> {g.participants.length + 1} </td>
                                        <td>{getUserName(g.creator, true)}</td>
                                        <td> - </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>Групповых диалогов нет</div>
                    )}
                </div>
                {/* <div
                    className={`accordion-container ${openTasks ? '' : 'hide'}`}
                >
                    <div className="accordion-header">
                        <div className="accordion-header__title">Задачи</div>
                        <div
                            onClick={() =>
                                this.setState(prevState => ({
                                    openTasks: !prevState.openTasks
                                }))
                            }
                            className={`accordion-header__btn ${
                                openTasks ? '' : 'hide'
                            }`}
                        >
                            <img
                                src={PUBLIC_URL + '/img/accordion.svg'}
                                alt="img"
                                width={24}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <div className="sort">
                                <div className="sort__label">
                                    Сортировать по
                                </div>
                                <div className="sort__link">
                                    <a
                                        className={`${
                                            tasksSort === 'status'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={e =>
                                            this.sortTasks(e, 'status')
                                        }
                                        href="#!"
                                    >
                                        статусу
                                    </a>{' '}
                                    <a
                                        className={`${
                                            tasksSort === 'date' ? 'active' : ''
                                        }`}
                                        onClick={e => this.sortTasks(e, 'date')}
                                        href="#!"
                                    >
                                        дате
                                    </a>{' '}
                                    <a
                                        className={`${
                                            tasksSort === 'name' ? 'active' : ''
                                        }`}
                                        onClick={e => this.sortTasks(e, 'name')}
                                        href="#!"
                                    >
                                        задаче
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tasks.length > 0 ? (
                        <table className="table table-link-js">
                            <thead>
                                <tr>
                                    <th>Задача</th>
                                    <th>Кто поставил</th>
                                    <th>Кому поставаили</th>
                                    <th>Дата</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((t, id) => (
                                    <tr
                                        key={id}
                                        onClick={() => {
                                            selectTask(t)
                                            history.push('/control/task', {
                                                task: t
                                            })
                                        }}
                                    >
                                        <td>{t.name}</td>
                                        <td>{getUserName(t.creator)}</td>
                                        <td>{getUserName(t.performers[0])}</td>
                                        <td>
                                            {moment(t.updated_at).format('LL')}
                                        </td>
                                        <td>{taskStatuses[t.status].name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>Задач нет</div>
                    )}
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    control: state.control,
    users: state.users.data
})
const mapDispatchToProps = dispatch => ({
    selectTask: payload => {
        dispatch(a_selectTask(payload))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Control)
