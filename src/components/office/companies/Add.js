import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import TreeSelect from "../../common/TreeSelect";
import ImageUpload from "../../common/ImageUpload";

import { t_add_company } from "../../../redux/tracks";

const getDepartmentList = (companies) => {
  let companies_list = companies.filter((c) => c.level === 1);
  companies_list = companies_list.map((c) => {
    return {
      label: c.name,
      value: c._id,
      children: recursiveSub(c),
    };
  });
  return companies_list;
};

const recursiveSub = (c, departments = []) => {
  if (!c.subdivisions || (c.subdivisions && c.subdivisions.length === 0)) {
    return null;
  }
  return c.subdivisions.map((s) => {
    return {
      label: s.name,
      value: s._id,
      children: recursiveSub(s, departments),
    };
  });
};

class Companies extends Component {
  state = {
    name: "",
    companies_list: [],
    checked_companies: [],
    companiesCount: 0,
    logo: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { companies } = nextProps;
    if (companies.length !== prevState.companiesCount) {
      const companies_list = getDepartmentList(companies);
      return {
        companies_list,
        companiesCount: companies.length,
      };
    }
    return null;
  }

  addCompany = async (e) => {
    e.preventDefault();
    const { companies, addCompany } = this.props;
    let { name, checked_companies, logo } = this.state;
    if (name.length < 2) {
      toast.warn("Введите корректное название");
    } else {
      let level = 1;
      let parent_id = -1;
      if (checked_companies.length > 0) {
        parent_id = checked_companies[0];
        let company = companies.find((c) => +c._id === +parent_id);
        level = company.level + 1;
        logo = null;
      }
      let payload = new FormData();
      payload.append("file", logo);
      payload.append("name", name);
      payload.append("level", level);
      payload.append("parent_id", parent_id);
      await addCompany(payload);
      this.setState({ name: "", checked_companies: [], logo: null });
    }
  };

  componentDidMount() {
    const { companies } = this.props;
    const companies_list = getDepartmentList(companies);
    this.setState({ companies_list, companiesCount: companies.length });
  }

  handleImageUpload = (acceptedFiles) => {
    this.setState({ logo: acceptedFiles[0] });
  };

  render() {
    const { companies } = this.props;
    const { name, companies_list, checked_companies, logo } = this.state;
    const img = logo ? URL.createObjectURL(logo) : null;
    return (
      <div className="content">
        <div className="container-fluid">
          {companies && (
            <form className="form form-company-role-add" id="form-add">
              {checked_companies.length === 0 && (
                <div className="form-photo company-image">
                  <ImageUpload
                    image={img}
                    local
                    smallImage={40}
                    onDrop={this.handleImageUpload}
                  />
                </div>
              )}

              <div className="input-group">
                <div className="label">Родительское подразделение</div>
                <TreeSelect
                  nodes={companies_list}
                  checked={checked_companies.map(String)}
                  onDelete={"dlete"}
                  onCheck={(checked_companies) =>
                    this.setState((pS) => ({
                      checked_companies: checked_companies.filter(
                        (c) => !pS.checked_companies.includes(c)
                      ),
                    }))
                  }
                />
              </div>
              <div className="input-group">
                <div className="label">Название подразделения</div>
                <input
                  onChange={(e) =>
                    this.setState({
                      name: e.target.value,
                    })
                  }
                  type="text"
                  className="input-text"
                  value={name}
                />
              </div>
            </form>
          )}
          <div className="btn-confirm btn-confirm--reverse">
            <a
              href="#!"
              onClick={(e) => this.addCompany(e)}
              className="btn-confirm__ok"
              data-form="#form-text"
            >
              Добавить
            </a>
            <Link to="/companies" className="btn-confirm__cancel">
              Отменить
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companies: state.companies.data,
});
const mapDispatchToProps = (dispatch) => ({
  addCompany: (payload) => {
    dispatch(t_add_company(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
