import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

// import {t_load_profile, t_load_all_users} from '../../redux/tracks'

import Menu from "./Menu";
import Dashboard from "./dashboard";
import Users from "./users";
import UserInfo from "./users/Info";
import UserEdit from "./users/Edit";
import NewsRouter from "./news/Router";
import Companies from "./companies/Router";
// import AddCompany from './companies/Add'
import ExtraRouter from "./extra/Router";
import SettingsRouter from "./settings/Router";
import Control from "./control/Router";
import Header from "./headers";
import Profile from "./profile";
import Complaints from "./complaints";
import Catalog from "./catalog";
import CatalogInfo from "./catalog/Info";
import CatalogEdit from "./catalog/edit";
import Glossary from "./glossary";
import GlossaryInfo from "./glossary/info";
import GlossaryEdit from "./glossary/edit";
import Seminars from "./seminars";
import SeminarsInfo from "./seminars/info";
import SeminarsEdit from "./seminars/edit";
import Questionnaire from "./diagnostics/diagnostics-table/Questionnaire";
import DiagnosticsTable from "./diagnostics/diagnostics-table/Table";
import DiagnosticsEdit from "./diagnostics/diagnostics-table/DiagnosticsLimitations/edit";
import QuizInfo from "./diagnostics/diagnostics-table/Questionnaire/info";
import QuizEdit from "./diagnostics/diagnostics-table/Questionnaire/edit";
import PointsInfo from "./diagnostics/diagnostics-table/Table/info";
import PointsEdit from "./diagnostics/diagnostics-table/Table/edit";

import DiagnosticsLimitations from "./diagnostics/diagnostics-table/DiagnosticsLimitations";
import Country from "./diagnostics/diagnostics-table/Country/Country";

import Publication from "./publication/index";
import PublicationsEdit from "./publication/edit"
import PublicationsInfo from "./publication/info"


import {
  t_load_users,
  t_load_catalog,
  t_load_glossary,
  t_load_profile,
  t_load_companies,
  t_load_tags,
  t_load_settings,
  t_load_glossary_from_page,
  t_load_all_diagnostics,
  t_load_sections
} from "../../redux/tracks";
import Axes from "./axes";
import TableAxesEdit from "./axes/edit";
import TableAxesEditInfo from "./axes/info";

class Office extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lang: "ru"
    };
  }

  componentDidMount() {
    this.props.loadUsers();
    this.props.loadCatalog();
    this.props.loadProfile();
    this.props.loadGlossary();
    this.props.loadDiagnostics();
    this.props.loadCompanies();
    this.props.loadTags();
    this.props.loadSettings();
    this.props.loadSections();
  }

  render() {
    const {
      hiddenMenu,
      profile,
      companies,
      settings: { positions, roles },
      tags,
    } = this.props;

    const setLang = (lang) => {
      switch (lang) {
        case "en":
          this.setState({
            lang,
          });
          break;
        case "ru":
          this.setState({
            lang,
          });
          break;
        default:
          this.setState({
            lang: "ru",
          });
      }


    }
    return (
      <Fragment>
        <Header />
        <Menu />
        <div className={`main ${hiddenMenu ? "full" : ""}`}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/users" component={Users} />
            {companies && tags && (
              <Route path="/users/add" component={UserEdit} />
            )}
            <Route path="/users/info/:id" component={UserInfo} />
            {companies && tags && (
              <Route path="/users/edit/:id" component={UserEdit} />
            )}
            <Route path="/news" component={NewsRouter} />
            <Route path="/companies" component={Companies} />
            <Route path="/extra" component={ExtraRouter} />
            {positions && roles && (
              <Route path="/settings" component={SettingsRouter} />
            )}
            <Route path="/control" component={Control} />
            <Route path="/complaints" component={Complaints} />
            {profile && <Route path="/profile" component={Profile} />}
            <Route path="/catalog-info/:id" component={CatalogInfo} />
            <Route path="/catalog" render={(props) => (<Catalog {...props} lang={this.state.lang} setLang={setLang} />)} exact />
            <Route path="/catalog/add/" component={CatalogEdit} />
            <Route path="/catalog-edit/:id" component={CatalogEdit} />

            <Route path="/glossary" render={(props) => (<Glossary {...props} lang={this.state.lang} setLang={setLang} />)} exact />
            <Route path="/glossary-info/:id" component={GlossaryInfo} />
            <Route path="/glossary-edit/:id" component={GlossaryEdit} />
            <Route path="/glossary/add" component={GlossaryEdit} />




            {/* <Route path="/diagnostics" component={Diagnostics} /> */}
            <Route path="/quiz/add/:lang" component={QuizEdit} />
            <Route path="/quiz/edit/:id/:lang" component={QuizEdit} />
            <Route path="/quiz/info/:id/:lang" component={QuizInfo} />

            <Route path="/points/edit/:id" render={(props) => (<PointsEdit {...props} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/points/info/:id/:lang" component={PointsInfo} />
            {/* {this.props.diagnostics && this.props.diagnostics.map(diagnostic =>  */}
              <Route path={`/diagnostics-points/:id`} render={(props) => (<DiagnosticsTable {...props} lang={this.state.lang} setLang={setLang} />)} />
            {/* )} */}
            <Route path={`/diagnostics/edit/:id`} render={(props) => (<DiagnosticsEdit {...props} lang={this.state.lang} setLang={setLang} />)} />
            <Route path={`/diagnostics/add`} render={(props) => (<DiagnosticsEdit {...props} lang={this.state.lang} setLang={setLang} />)} />
            
            {/* <Route path="/diagnostics/antioxidant-skin" render={(props) => (<DiagnosticsTable {...props} diagnostics={1} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/photoaging" render={(props) => (<DiagnosticsTable {...props} diagnostics={2} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/moisturizing-barriers" render={(props) => (<DiagnosticsTable {...props} diagnostics={10} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/sagging-skin" render={(props) => (<DiagnosticsTable {...props} diagnostics={3} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/acne-tendency" render={(props) => (<DiagnosticsTable {...props} diagnostics={4} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/leather-texture" render={(props) => (<DiagnosticsTable {...props} diagnostics={6} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/pigmentation" render={(props) => (<DiagnosticsTable {...props} diagnostics={7} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/skin-sensitivity" render={(props) => (<DiagnosticsTable {...props} diagnostics={8} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/problems-eyes" render={(props) => (<DiagnosticsTable {...props} diagnostics={9} lang={this.state.lang} setLang={setLang} />)} />
            <Route path="/diagnostics/seborrhea-eczema" render={(props) => (<DiagnosticsTable {...props} diagnostics={5} lang={this.state.lang} setLang={setLang} />)} /> */}
            <Route
              path="/diagnostics/questionnaire"
              render={(props) => (<Questionnaire {...props} lang={this.state.lang} setLang={setLang} />)}
            />
            <Route path="/diagnostics/country" component={Country} />
            <Route
              path="/diagnostics/diagnostic-limitations"
              render={(props) => (<DiagnosticsLimitations {...props} lang={this.state.lang} setLang={setLang} />)} exact
            />
            <Route path="/seminars" render={(props) => (<Seminars {...props} lang={this.state.lang} setLang={setLang} />)} exact />
            <Route path="/seminars/info/:id" component={SeminarsInfo} />
            <Route path="/seminars/edit/:id" component={SeminarsEdit} />
            <Route path="/seminars/add" component={SeminarsEdit} />

            <Route path="/publications" render={(props) => (<Publication {...props} lang={this.state.lang} setLang={setLang} />)} exact />
            <Route path="/publications/info/:id" component={PublicationsInfo} />
            <Route path="/publications/edit/:id" component={PublicationsEdit} />
            <Route path="/publications/add" component={PublicationsEdit} />


            <Route path="/axes" render={(props) => (<Axes {...props} lang={this.state.lang} setLang={setLang} />)} exact />
            <Route path="/axes/info/:id" component={TableAxesEditInfo} />
            <Route path="/axes/edit/:id" component={TableAxesEdit} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  hiddenMenu: state.service.hiddenMenu,
  dialogs: state.dialogs,
  profile: state.profile.data,
  companies: state.companies.data,
  settings: state.settings,
  tags: state.extra.tags,
  diagnostics: state.diagnostics.data.docs,
});
const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => {
    dispatch(t_load_users());
  },
  loadCatalog: () => {
    dispatch(t_load_catalog());
  },
  loadGlossary: () => {
    dispatch(t_load_glossary_from_page());
  },
  loadDiagnostics: () => {
    dispatch(t_load_all_diagnostics());
  },
  loadProfile: () => {
    dispatch(t_load_profile());
  },
  loadCompanies: () => {
    dispatch(t_load_companies());
  },
  loadSections: (payload) => {
    dispatch(t_load_sections(payload));
  },
  loadTags: () => dispatch(t_load_tags()),
  loadSettings: () => dispatch(t_load_settings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Office);
