import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getUserName } from "../../../utils/helpers";
import { t_edit_company_subdivisions } from "../../../redux/tracks";

class AddSubdivisions extends PureComponent {
  state = {
    companies: [],
    filtered: false,
    filteredCompanies: [],
    selected_subdivisions: [],
  };

  async componentDidMount() {
    const { companies } = this.props;
    const filteredCompanies = companies.filter(
      (c) =>
        !c.private &&
        c._id !== Number(this.props.match.params.id) &&
        c.level === 1
    );
    this.setState({ filteredCompanies });
  }

  addSubdivisions = (e) => {
    e.preventDefault();
    let selected_subdivisions = [...this.state.selected_subdivisions];
    if (selected_subdivisions.length > 0) {
      const {
        history: { push },
        addCompanySubdivisions,
      } = this.props;
      addCompanySubdivisions(
        {
          company_id: this.props.match.params.id,
          subdivisions: selected_subdivisions,
          type: "add",
        },
        (company) => {
          toast.success("Подразделения успешно добавлены");
          push(`/companies/edit/${company._id}`);
        }
      );
    } else {
      toast.warn("Подразделения не выбраны");
    }
  };

  selectSubdivisions = (id) => {
    let selected_subdivisions = [...this.state.selected_subdivisions];
    if (selected_subdivisions.includes(id)) {
      selected_subdivisions = selected_subdivisions.filter((u) => u !== id);
    } else {
      selected_subdivisions.push(id);
    }
    this.setState({ selected_subdivisions });
  };

  _recursiveSub(c, level) {
    if (!c.subdivisions || (c.subdivisions && c.subdivisions.length === 0)) {
      return null;
    }
    return c.subdivisions.map((s) => (
      <Fragment key={s._id}>
        <tr className={`tr-sub-${level}`}>
          <td></td>
          <td> {s.name} </td>
          <td> {s.users.length} </td>
          <td>{s.head ? getUserName(s.head) : "-"}</td>
          <td>{s.admin ? getUserName(s.admin) : "-"}</td>
          <td>{s.manager ? getUserName(s.manager) : "-"}</td>
        </tr>
        {this._recursiveSub(s, s.level)}
      </Fragment>
    ));
  }

  render() {
    const { companies } = this.props;
    const { filteredCompanies, selected_subdivisions } = this.state;

    if (companies) {
      return (
        <div className="content">
          <div className="container-fluid">
            <div className="table-edit-js table-edit-js--edit">
              <div className="row justify-content-between align-items-center">
                <div className="col-6">
                  {companies.length > 0 ? (
                    <table className="table table-choose-js">
                      <thead>
                        <tr>
                          <th />
                          <th>Наименование</th>
                          <th>Сотрудников</th>
                          <th>Руководитель</th>
                          <th>Администратор</th>
                          <th>Менеджер</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCompanies.map((c, id) => (
                          <Fragment key={c._id}>
                            <tr>
                              <td>
                                <div className="table__circle">
                                  <input
                                    type="checkbox"
                                    id={`c${c._id}`}
                                    className="table-check"
                                    checked={selected_subdivisions.includes(
                                      c._id
                                    )}
                                    onChange={() =>
                                      this.selectSubdivisions(c._id)
                                    }
                                  />
                                  <label htmlFor={`c${c._id}`} />
                                </div>
                              </td>
                              <td> {c.name} </td>
                              <td>{c?.users?.length || 0}</td>
                              <td>{c.head ? getUserName(c.head) : "-"}</td>
                              <td>{c.admin ? getUserName(c.admin) : "-"}</td>
                              <td>
                                {c.manager ? getUserName(c.manager) : "-"}
                              </td>
                            </tr>
                            {this._recursiveSub(c, c.level)}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>Нет свободных Компаней</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-confirm btn-confirm--reverse">
            <a
              href="#!"
              onClick={(e) => this.addSubdivisions(e)}
              className="btn-confirm__ok"
              data-form="#form-text"
            >
              Добавить
            </a>
            <Link
              to={`/companies/edit/${this.props.match.params.id}`}
              className="btn-confirm__cancel"
            >
              Отменить
            </Link>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => ({
  companies: state.companies.data,
});

const mapDispatchToProps = (dispatch) => ({
  addCompanySubdivisions: (payload, onSuccess) => {
    dispatch(t_edit_company_subdivisions(payload, onSuccess));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubdivisions);
