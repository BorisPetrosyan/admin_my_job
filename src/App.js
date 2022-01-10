import React, { Component, lazy, Suspense, Fragment } from 'react'
import { Router, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import 'react-table/react-table.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import history from './history';
import Loader from './components/service/Loader'
import PrivateRoute from './components/service/PrivateRoute'
import ServerError from './components/service/ServerError'
// import AuthHeader from './components/auth/Header'
import Login from './components/auth/Login'
import Restore from './components/auth/Restore'
import EnterNewPassword from './components/auth/EnterNewPassword'
import Registration from './components/auth/Registration'
// import TermsRouter from './components/auth/TermsRouter'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap-theme.min.css'
// import 'ladda/dist/ladda.min.css'
// import './styles/all_pages.css'
// import 'react-dropdown-tree-select/dist/styles.css'
import './css/main.min.css'

const Office = lazy(() => import('./components/office'))
const NotFound = lazy(() => import('./components/service/NotFound'))

const { REACT_APP_BASENAME } = process.env

class App extends Component {
    // componentDidCatch(error, errorInfo) {

    // }

    // setLanguage = (language) => {
    //     i18next.init({
    //         lng: language.value.toLowerCase(),
    //         resources: require(`./languages/${ language.value.toLowerCase() }.json`)
    //     })
    // }

    // componentDidMount() {
    // const { language } = this.props
    // this.setLanguage(language)
    // }

    render() {
        const { auth, error } = this.props

        return (
            <Fragment>
                <ToastContainer />
                {error ? (
                    <ServerError />
                ) : (
                    <Router history={history} basename={REACT_APP_BASENAME}>
                        <Suspense fallback={<Loader />}>
                            {!auth ? (
                                <Fragment>
                                    <header className="header-auth">
                                        <div className="logo">
                                            <Link to="/">Skintellectual</Link>
                                        </div>
                                    </header>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/"
                                            component={Login}
                                        />
                                        <Route
                                            path="/restore_pass"
                                            component={Restore}
                                        />
                                        <Route
                                            path="/enter_new_password"
                                            component={EnterNewPassword}
                                        />
                                        <Route
                                            path="/registration"
                                            component={Registration}
                                        />
                                        <Route component={NotFound} />
                                    </Switch>
                                </Fragment>
                            ) : (
                                <Switch>
                                    <PrivateRoute
                                        auth={true}
                                        path="/"
                                        component={Office}
                                    />
                                    <Route render={() => <NotFound />} />
                                </Switch>
                            )}
                        </Suspense>
                    </Router>
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})
export default connect(mapStateToProps)(App)
