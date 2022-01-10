import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import ImageUpload from "../../common/ImageUpload";

import { t_edit_company, t_load_company } from "../../../redux/tracks";
import TreeSelect from "../../common/TreeSelect";

const { REACT_APP_SERVER } = process.env;

const getDepartmentList = (companies, id) => {
  let companies_list = companies.filter(
    (c) => c.level === 1 && c._id !== Number(id)
  );
  companies_list = companies_list.map((c) => {
    return {
      label: c.name,
      value: c._id,
      children: recursiveSub(c, id),
    };
  });
  companies_list.unshift({
    label: "Отдельная компания",
    value: -1,
  });
  return companies_list;
};

const recursiveSub = (c, id, departments = []) => {
  if (!c.subdivisions || (c.subdivisions && c.subdivisions.length === 0)) {
    return null;
  }
  return c.subdivisions
    .map((s) => {
      return {
        label: s.name,
        value: s._id,
        children: recursiveSub(s, id, departments),
      };
    })
    .filter((el) => {
      // console.log("elelelel", el);
      return el.value !== Number(id);
    });
};

class EditCompany extends PureComponent {
  state = {
    companies_list: [],
    checked_companies: [],
    name: "",
    logo: null,
    company: null,
  };

  async componentDidMount() {
    const { companies } = this.props;

    const company = await t_load_company({ id: this.props.match.params.id });
    this.setState(() => ({
      company,
    }));
    this.changeCheckedCompany();
    const { name } = company;
    const companies_list = getDepartmentList(
      companies,
      this.props.match.params.id
    );
    this.setState({ companies_list, name });
  }

  save = (e) => {
    e.preventDefault();
    const { name, logo, checked_companies } = this.state;
    if (name.length < 2) {
      toast.warn("Введите название");
    } else {
      const { saveCompany, history } = this.props;
      let payload = new FormData();
      payload.append("file", logo);
      payload.append("name", name);
      payload.append("parent", checked_companies);
      payload.append("company_id", this.state.company._id);
      saveCompany(payload, () => {
        history.push(`/companies/edit/${this.state.company._id}`);
      });
    }
  };

  handleImageUpload = (acceptedFiles) => {
    this.setState({ logo: acceptedFiles[0] });
  };

  changeCheckedCompany = () => {
    if (!this.state.checked_companies.length) {
      if (this.state.company) {
        this.setState({
          checked_companies: [String(this.state.company.parent)],
        });
      }
    }
  };

  render() {
    const {
      company,
      name,
      logo,
      checked_companies,
      companies_list,
    } = this.state;
    // console.log("checked_companies", checked_companies);
    const { history } = this.props;
    const img = logo ? URL.createObjectURL(logo) : null;
    return company ? (
      <div className="content">
        <div className="container-fluid">
          <form className="form form-company-role-add" id="form-add">
            {company.level === 1 && (
              <div className="form-photo company-image">
                {company.logo && (
                  <img
                    src={REACT_APP_SERVER + company.logo}
                    id="img-preview"
                    alt="img"
                  />
                )}
                <ImageUpload
                  image={img}
                  local={!!logo}
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
              <div className="label">Наименование</div>
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
          <div className="btn-confirm btn-confirm--reverse">
            <a
              href="#!"
              onClick={(e) => this.save(e)}
              className="btn-confirm__ok"
            >
              Сохранить
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
              href="#!"
              className="btn-confirm__cancel"
            >
              Отменить
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("statestatestatestate", state);
  return {
    companies: state.companies.data,
  };
};
const mapDispatchToProps = (dispatch) => ({
  saveCompany: (payload, onSuccess) => {
    dispatch(t_edit_company(payload, onSuccess));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCompany);
