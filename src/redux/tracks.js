import { toast } from "react-toastify";
import sendRequest from "../utils/request";
// import { connectToSocket, socket } from '../utils/socket'
import * as paths from "../constants/api";
import * as acts from "./actions";
import history from "../history";
// const getInfo = ({dispatch, load, path, action}) => {
// 	// dispatch(acts.a_setLoading(load))
// 	sendRequest({
// 		r_path: path,
// 		success: (res) => {
// 			dispatch(action(res))
// 			// dispatch(acts.a_setLoading(null))
// 			if (!socket) {
// 				connectToSocket()
// 			}
// 		},
// 		failFunc: (err) => {
// 			// dispatch(acts.a_setLoading(null))
// 		}
// 	})
// }

export const t_login = ({ email, password }) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_login,
      method: "post",
      attr: { email, password },
      success: (res) => {
        resolve(res);
        localStorage.setItem("auth", res.access_token);
        dispatch(acts.a_setProfile(res.data));
        dispatch(acts.a_setAuth(true));
        toast.success(res.msg);
      },
      failFunc: ({ msg }) => {
        if (msg) {
          toast.error(msg);
        }
      },
    });
  });
};

export const t_load_users = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_get_users,
    success: (res) => {
      dispatch(acts.a_setAllUsers(res.users));
    },
  });
};

/////// t_load_Glossary//////////////

export const t_load_glossary = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_get_glossary,
    success: (res) => {
      dispatch(acts.a_setAllGlossary(res.glossary));
    },
  });
};

export const t_load_glossary_from_page = (payload) => (dispatch) => {
  sendRequest({
    r_path: `${paths.p_glossary_from_page}${payload?.limit || 10}/${
      payload?.page || 1
    }`,
    method: "get",
    attr: payload,
    success: (res) => {
      console.log(res, "============");
      dispatch(acts.a_setGlossaryFromPage(res.glossary));
    },
  });
};

export const t_create_glossary = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/v2" + paths.p_glossary + "/create_glossary",
    method: "post",
    attr: { ...payload },
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_glossary_from_page());
      dispatch(acts.a_setSelectedGlossary(res.savedGlossary));
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

export const t_save_glossary = (payload) => (dispatch, getState, api) => {
  console.log("payload from t_save_glossary", payload);
  sendRequest({
    r_path: "/v2" + paths.p_glossary + "/update_glossary/" + payload._id,
    method: "patch",
    attr: { ...payload },
    success: (res) => {
      toast.success(res.msg || "Глоссарий успешно обновлён");
      dispatch(t_load_glossary_from_page());
      dispatch(acts.a_setSelectedGlossary(res.savedGlossary));
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

export const t_delete_glossary = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/v2" + paths.p_glossary + "/delete_glossary/" + payload.id,
    method: "delete",
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_glossary_from_page());
      history.push("/glossary");
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

/////// t_load_Glossary//////////////

/////// t_load_Seminars//////////////

export const t_save_seminars = (payload) => (dispatch) => {
  console.log("payload from t_save_seminars", payload);
  sendRequest({
    r_path: "/v2" + paths.p_seminars + "/update_seminar/" + payload.get("_id"),
    method: "patch",
    attr: payload,
    success: (res) => {
      toast.success(res.msg || "Семинар успешно обновлён");
      dispatch(t_load_seminars());
      dispatch(acts.a_setSelectedSeminars(res.savedSeminars));
    },
    failFunc: (err) => {
      toast.error(err.msg || err);
    },
  });
};

export const t_load_seminars = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_get_seminars,
    success: (res) => {
      dispatch(acts.a_setSelectedSeminars(res.seminars));
    },
  });
};

export const t_load_seminars_from_page = (payload) => (dispatch) => {
  sendRequest({
    r_path: `${paths.p_get_seminars}/${payload?.limit || 10}/${
      payload?.page || 1
    }`,
    method: "get",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setSeminarsFromPage(res.seminar));
    },
  });
};

export const t_create_seminars = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/v2" + paths.p_seminars + "/create_seminar",
    method: "post",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_seminars());
      dispatch(acts.a_setSelectedSeminars(res.savedSeminars));
      history.push("/seminars");
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

export const t_delete_seminar = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/v2" + paths.p_seminars + "/delete_seminar/" + payload?.id,
    method: "delete",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_seminars_from_page());
      history.push("/seminars");
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

/////// t_load_Seminars//////////////

export const t_load_users_from_page = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_users_from_page,
    method: "post",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setUsersFromPage(res));
    },
  });
};
// catalog
export const t_load_catalog = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/v2/catalogue/get_catalogue/10/1",

    success: (res) => {
      dispatch(acts.a_setAllCatalog(res.catalogue));
    },
  });
};
export const t_load_catalog_from_page = (payload) => (dispatch) => {
  sendRequest({
    r_path: `/v2/catalogue/get_catalogue/${payload?.limit || 10}/${
      payload?.page || 1
    }`,
    method: "get",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setCatalogFromPage(res.catalogue));
    },
  });
};
export const t_load_catalog_info = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/v2/catalogue/get_catalogue/" + payload._id,
    success: (res) => {
      payload.success(res);
    },
  });
};
export const t_delete_catalog = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/v2/catalogue/delete_catalogue/" + payload,
    method: "delete",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      dispatch(t_load_catalog_from_page());
      history.push("/catalog");
    },
  });
};
// export const t_save_catalog = (payload) => (dispatch, getState, api) => {
// 	return new Promise(async (resolve, reject) => {
// 		let catalog = { ...payload.catalog }

// 		sendRequest({
// 			r_path: '/v2/catalogue/get_catalogue/10/1' + '/catalog' + payload.id,
// 			method: 'patch',
// 			attr: { catalog },
// 			success: (res) => {
// 				toast.success(res.msg)
// 				dispatch(t_load_catalog())
// 				dispatch(t_load_companies())
// 				dispatch(acts.a_setSelectedUser(res.savedCatalog))
// 			},
// 			failFunc: (err) => {
// 				toast.error(err.msg)
// 			}
// 		})
// 	})
// }
export const t_save_catalog = (payload) => (dispatch) => {
  console.log("payload from track.js t_save_catalog", payload);
  sendRequest({
    r_path: "/v2/catalogue/update_catalogue/" + payload._id,
    method: "patch",
    attr: { ...payload },
    success: (res) => {
      toast.success(res.msg || "Каталог успешно обновлён");
      dispatch(t_load_catalog());
      dispatch(acts.a_setSelectedCatalog(res.savedCatalogue));
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};
export const t_create_catalog = (payload, onSuccess) => (dispatch) => {
  console.log("payload from track.js t_create_catalog", payload);
  sendRequest({
    r_path: "/v2/catalogue/create_catalogue",
    method: "post",
    attr: { ...payload },
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_catalog());
      dispatch(acts.a_setSelectedCatalog(res.savedCatalogue));
      onSuccess(res.catalogue);
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

export const t_upload_catalog_file = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_upload_catalog_file,
    method: "post",
    attr: payload,
    success: ({ msg, newImage }) => {
      toast.success(msg);
      dispatch(t_load_catalog());
      dispatch(acts.a_updateCatalogFile(newImage));
    },
    failFunc: (err) => {
      toast.error(err);
    },
  });
};

export const t_load_news = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_load_news,
    success: (res) => {
      dispatch(acts.a_setAllNews(res));
    },
  });
};
export const t_load_user_info = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_user_info + payload._id,
    success: (res) => {
      payload.success(res);
    },
  });
};
export const t_load_profile = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_profile,
    success: (res) => {
      dispatch(acts.a_setProfile(res.profile));
    },
  });
};
export const t_load_companies = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_get_companies,
    success: (res) => {
      const addSubRows = (c) => {
        if (!c.subdivisions.length) return;
        c.subRows = c.subdivisions;
        for (let company of c.subRows) {
          addSubRows(company);
        }
      };
      for (let company of res.companies.filter((c) => c.level === 1)) {
        addSubRows(company);
      }
      dispatch(acts.a_setAllCompanies(res.companies));
    },
  });
};

export const t_load_company = async (payload) => {
  let company = [];
  await sendRequest({
    r_path: "/admin" + paths.p_get_company + payload.id,
    success: (res) => {
      company = res.company;
    },
  });
  return company;
};

export const t_get_all_groups = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_get_all_groups,
    success: (res) => {
      dispatch(acts.a_setAllGroups(res.groups));
    },
  });
};
export const t_get_all_tasks = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_get_all_tasks,
    success: (res) => {
      dispatch(acts.a_setAllTasks(res.tasks));
    },
  });
};
export const t_load_tags = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_load_tags,
    success: (res) => {
      dispatch(acts.a_setAllTags(res.tags));
    },
  });
};
export const t_load_settings = () => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_load_settings,
    success: ({ positions, roles }) => {
      dispatch(acts.a_setSettings({ positions, roles }));
    },
  });
};
export const t_load_company_users = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_get_company_users,
    method: "post",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setCompanyUsers(res.users));
    },
  });
};

export const t_save_user = (payload, onSuccess) => (dispatch) => {
  let user = { ...payload.user };
  user.role = user.role ? user.role._id : undefined;
  user.position = user.position ? user.position._id : undefined;
  user.tags = user.tags.map((t) => t.value);
  sendRequest({
    r_path: "/admin" + paths.p_user + "/" + payload.id,
    method: "patch",
    attr: { user },
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_users());
      dispatch(t_load_companies());
      dispatch(acts.a_setSelectedUser(res.savedUser));
      onSuccess();
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

///////////Glossary///////////

// export const t_save_glossary = (payload) => (dispatch, getState, api) => {
//   return new Promise(async (resolve, reject) => {
//     let user = { ...payload.user };
//     user.role = user.role ? user.role._id : undefined;
//     user.position = user.position ? user.position._id : undefined;
//     user.tags = user.tags.map((t) => t.value);
//     sendRequest({
//       r_path: "/admin" + paths.p_glossary + "/" + payload.id,
//       method: "patch",
//       attr: { user },
//       success: (res) => {
//         toast.success(res.msg);
//         dispatch(t_load_glossary());
//         dispatch(t_load_glossary_from_page());
//       },
//       failFunc: (err) => {
//         toast.error(err.msg);
//       },
//     });
//   });
// };

///////////Glossary///////////

export const t_upload_avatar = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_upload_avatar,
    method: "post",
    attr: payload,
    success: ({ msg, newImage }) => {
      toast.success(msg);
      dispatch(acts.a_updateUserImage(newImage));
    },
    failFunc: (err) => {
      toast.error(err);
    },
  });
};
export const t_create_user = (payload, onSuccess) => (dispatch) => {
  let user = { ...payload.user };
  user.role = user.role ? user.role._id : undefined;
  user.position = user.position ? user.position._id : undefined;
  user.tags = user.tags.map((t) => t.value);
  sendRequest({
    r_path: "/admin" + paths.p_user,
    method: "post",
    attr: { user },
    success: ({ msg, phone_number, password }) => {
      toast.success(msg);
      dispatch(t_load_users());
      dispatch(t_load_companies());
      onSuccess({ phone_number, password });
    },
    failFunc: ({ msg, description }) => {
      toast.error(msg);
      if (description) {
        toast.warn(description);
      }
    },
  });
};
export const t_create_group = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_create_group,
    method: "post",
    attr: payload,
    success: ({ msg, group }) => {
      toast.success(msg);
      dispatch(t_get_all_groups());
      onSuccess(group);
    },
  });
};
export const t_edit_group = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_edit_group,
      method: "patch",
      attr: payload,
      success: ({ msg, group }) => {
        toast.success(msg);
        dispatch(t_get_all_groups());
        resolve();
      },
    });
  });
};

export const t_add_company = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_company,
      method: "post",
      attr: payload,
      success: (res) => {
        toast.success(res.msg);
        dispatch(t_load_companies());
        resolve();
      },
      failFunc: (err) => {
        console.log(err);
      },
    });
  });
};
export const t_delete_company = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_company + "/" + payload,
      method: "delete",
      success: (res) => {
        toast.success(res.msg);
        dispatch(t_load_companies());
        resolve();
      },
      failFunc: (err) => {
        console.log(err);
      },
    });
  });
};
export const t_add_company_users = ({ payload, success }) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_add_company_users,
    method: "patch",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_companies());
      dispatch(t_load_users());
      success(res.updatedCompany);
    },
    failFunc: (err) => {
      console.log(err);
    },
  });
};
export const t_delete_company_users = ({ payload, success }) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_delete_company_users,
    method: "delete",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_companies());
      dispatch(t_load_users());
      success(res.updatedCompany);
    },
    failFunc: (err) => {
      console.log(err);
    },
  });
};

export const t_set_company_management = (payload) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_set_company_management,
    method: "patch",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_companies());
    },
  });
};
export const t_set_group_management = (payload) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_set_group_management,
    method: "patch",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_get_all_groups());
    },
  });
};
export const t_reset_user_password = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_reset_user_password,
    method: "post",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
    },
  });
};
export const t_delete_user = (payload, onSuccess) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_user + "/" + payload,
    method: "delete",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      dispatch(t_load_users());
      onSuccess();
    },
  });
};
export const t_register = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_register,
    method: "post",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      // dispatch(t_load_users())
    },
  });
};
export const t_get_restore_link = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_get_restore_link,
      method: "post",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        resolve();
        // dispatch(t_load_users())
      },
      failFunc: ({ msg }) => toast.error(msg),
    });
  });
};
export const t_restore_password = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_restore_password,
    method: "post",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      // dispatch(t_load_users())
    },
  });
};
export const t_add_tag = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_add_tag,
    method: "post",
    attr: payload,
    success: ({ msg, newTag }) => {
      toast.success(msg);
      dispatch(acts.a_addOrUpdateTag(newTag));
    },
  });
};
export const t_add_tag_users = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_add_tag_users,
    method: "patch",
    attr: payload,
    success: ({ msg, updatedTag }) => {
      toast.success(msg);
      dispatch(acts.a_addOrUpdateTag(updatedTag));
      dispatch(t_load_tags());
      onSuccess(updatedTag);
    },
  });
};
export const t_add_tag_contacts = (payload, onSuccess) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_add_tag_contacts,
    method: "patch",
    attr: payload,
    success: ({ msg, updatedTag }) => {
      toast.success(msg);
      dispatch(acts.a_addOrUpdateTag(updatedTag));
      dispatch(t_load_tags());
      onSuccess(updatedTag);
    },
  });
};
export const t_delete_tag_users = ({ payload, onSuccess }) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_delete_tag_users,
    method: "delete",
    attr: payload,
    success: ({ msg, updatedTag }) => {
      toast.success(msg);
      dispatch(acts.a_addOrUpdateTag(updatedTag));
      dispatch(t_load_tags());
      onSuccess(updatedTag);
    },
  });
};
export const t_delete_tag_contacts = ({ payload, onSuccess }) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_delete_tag_contacts,
    method: "delete",
    attr: payload,
    success: ({ msg, updatedTag }) => {
      toast.success(msg);
      dispatch(acts.a_addOrUpdateTag(updatedTag));
      dispatch(acts.a_selectTag(updatedTag));
      dispatch(t_load_tags());
      onSuccess(updatedTag);
    },
  });
};
export const t_delete_tag_sources = ({ payload, onSuccess }) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_delete_tag_sources,
    method: "delete",
    attr: payload,
    success: ({ msg, updatedTag }) => {
      toast.success(msg);
      dispatch(acts.a_addOrUpdateTag(updatedTag));
      dispatch(t_load_tags());
      onSuccess(updatedTag);
    },
  });
};
export const t_edit_tag = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_edit_tag,
    method: "patch",
    attr: payload,
    success: ({ msg, updatedTag }) => {
      toast.success(msg);
      dispatch(acts.a_addOrUpdateTag(updatedTag));
      // onSuccess(updatedTag)
    },
  });
};
export const t_delete_tag = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_delete_tag,
      method: "delete",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(acts.a_deleteTag(payload));
        resolve();
      },
    });
  });
};
export const t_delete_news = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_news + payload,
      method: "delete",
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(acts.a_deleteNews(payload));
        dispatch(t_load_news());
        resolve();
      },
    });
  });
};
export const t_delete_comment = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_delete_comment,
      method: "delete",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(acts.a_deleteComment(payload));
        resolve();
      },
    });
  });
};
export const t_edit_news = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_news + payload.news_id,
      method: "patch",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(acts.a_updateNews(payload));
        resolve();
      },
    });
  });
};
export const t_create_source = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_create_source,
    method: "post",
    attr: payload,
    success: ({ msg, source }) => {
      toast.success(msg);
      dispatch(acts.a_addNewsSource(source));
      dispatch(acts.a_addNewsSourceToTag(source));
      onSuccess(source);
    },
  });
};
export const t_edit_source = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_edit_source,
      method: "patch",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(t_load_news());
        onSuccess();
        resolve();
      },
    });
  });
};
export const t_delete_source = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_delete_source,
      method: "delete",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(acts.a_deleteNewsSource(payload));
        resolve();
      },
    });
  });
};
export const t_delete_group = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_delete_group,
      method: "delete",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(t_get_all_groups());
        // dispatch(acts.a_deleteNewsSource(payload))
        resolve();
      },
    });
  });
};
export const t_update_task = (payload) => (dispatch, getState, api) => {
  return new Promise(async (resolve, reject) => {
    sendRequest({
      r_path: "/admin" + paths.p_update_task,
      method: "patch",
      attr: payload,
      success: ({ msg }) => {
        toast.success(msg);
        dispatch(acts.a_updateTask(payload));
        resolve();
      },
    });
  });
};
export const t_create_news = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_create_news,
    method: "post",
    attr: payload,
    success: ({ msg, source, news }) => {
      toast.success(msg);
      dispatch(t_load_news());
      onSuccess(source);
    },
  });
};
export const t_upload_group_image = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_upload_group_image,
    method: "post",
    attr: payload,
    success: ({ msg, image }) => {
      toast.success(msg);
      dispatch(t_get_all_groups());
      onSuccess(image);
    },
  });
};
export const t_upload_source_image = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_upload_source_image,
    method: "post",
    attr: payload,
    success: ({ msg, image }) => {
      toast.success(msg);
      dispatch(t_load_news());
      onSuccess(image);
    },
  });
};
export const t_add_group_participants = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_add_group_participants,
    method: "patch",
    attr: payload,
    success: ({ msg, group }) => {
      toast.success(msg);
      dispatch(t_get_all_groups());
      onSuccess(group);
    },
  });
};
export const t_delete_group_participants = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_delete_group_participants,
    method: "delete",
    attr: payload,
    success: ({ msg, group }) => {
      toast.success(msg);
      dispatch(t_get_all_groups());
      onSuccess(group);
    },
  });
};
export const t_change_rights = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_change_rights,
    method: "patch",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      dispatch(acts.a_changeRights(payload));
      // onSuccess(group)
    },
  });
};
export const t_change_role_tags = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_change_role_tags,
    method: "patch",
    attr: { ...payload, tags: payload.tags.map((t) => t.value) },
    success: ({ msg }) => {
      toast.success(msg);
      dispatch(acts.a_changeRoleTags(payload));
    },
  });
};

export const t_change_access = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_change_access,
    method: "patch",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      dispatch(acts.a_changeAccess(payload));
      // onSuccess(group)
    },
  });
};
export const t_create_role = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_create_role,
    method: "post",
    attr: payload,
    success: ({ msg, role }) => {
      toast.success(msg);
      dispatch(acts.a_addRole(role));
    },
  });
};
export const t_edit_role = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_edit_role,
    method: "patch",
    attr: payload,
    success: ({ msg, role }) => {
      toast.success(msg);
      dispatch(acts.a_addRole(role));
    },
  });
};
export const t_delete_role = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/admin" + paths.p_delete_role,
    method: "delete",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      dispatch(acts.a_deleteRole(payload));
    },
  });
};
export const t_add_role_members = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_add_role_members,
    method: "patch",
    attr: payload,
    success: ({ msg, updatedRole }) => {
      toast.success(msg);
      dispatch(acts.a_addRole(updatedRole));
      onSuccess(updatedRole);
      // dispatch(acts.a_addRole(role))
    },
  });
};
export const t_delete_role_members = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_delete_role_members,
    method: "delete",
    attr: payload,
    success: ({ msg, updatedRole }) => {
      toast.success(msg);
      dispatch(acts.a_addRole(updatedRole));
      onSuccess(updatedRole);
      // dispatch(acts.a_addRole(role))
    },
  });
};

export const t_edit_company = (payload, onSuccess) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_edit_company,
    method: "patch",
    attr: payload,
    success: ({ msg, name, company_id, logo }) => {
      toast.success(msg);
      dispatch(acts.a_updateCompanyName({ name, company_id }));
      onSuccess();
    },
  });
};

export const t_edit_company_subdivisions = (payload, onSuccess) => (
  dispatch,
  getState,
  api
) => {
  sendRequest({
    r_path: "/admin" + paths.p_edit_company_subdivisions,
    method: "patch",
    attr: payload,
    success: (data) => {
      onSuccess(data);
    },
  });
};

export const t_getUsersComplaints = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/admin" + paths.p_complaints_from_page,
    method: "post",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setUsersComplaints(res));
    },
  });
};
export const t_updateComplaintStatus = ({ complaint_id, status }) => (
  dispatch
) => {
  sendRequest({
    r_path: "/admin" + paths.p_complaint_status,
    method: "patch",
    attr: { complaint_id, status },
    success: ({ msg }) => {
      toast.success(msg);
      dispatch(acts.a_updateComplaintStatus({ complaint_id, status }));
    },
  });
};

export const t_create_quiz = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/v2/quiz" + paths.p_create_quiz,
    method: "post",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      // dispatch(acts.a_addRole(role));
    },
  });
};

export const t_save_quiz = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: "/v2/quiz" + paths.p_update_quiz + "/" + payload.quiz._id,
    method: "patch",
    attr: payload?.quiz || {},
    success: ({ msg }) => {
      toast.success(msg);
      history.push(payload?.parentPath || "/");
      // dispatch(acts.a_addRole(role));
    },
  });
};

export const t_load_quiz = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/v2/quiz/get_quiz",
    method: "get",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setQuizes(res.quiz));
    },
  });
};

export const t_load_quiz_from_page = (payload) => (dispatch) => {
  sendRequest({
    r_path: `/v2/quiz/get_quiz/${payload?.limit || 50}/${payload?.page || 1}`,
    method: "get",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setQuizes(res));
    },
  });
};

export const t_load_sections = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/v2/section/get_sections",
    method: "get",
    config: { params: payload },
    success: (res) => {
      dispatch(acts.a_setSections(res.section));
    },
  });
};

export const t_delete_quiz = (payload) => (dispatch) => {
  sendRequest({
    r_path: "/v2/quiz" + paths.p_delete_quiz + "/" + payload.id,
    method: "delete",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_seminars_from_page());
      history.push(payload.parentPath || "/");
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

export const t_load_all_diagnostics = (payload) => (dispatch) => {
  sendRequest({
    r_path: `${paths.p_get_all_diagnostics}/${payload?.limit || 100}/${
      payload?.page || 1
    }`,
    method: "get",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setDiagnostics(res.diagnostics));
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

export const t_save_diagnostic = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: `${paths.p_save_diagnostic}/${payload.diagnostic._id}`,
    method: "patch",
    attr: payload?.diagnostic || {},
    success: ({ msg }) => {
      toast.success(msg);
      history.push(payload?.parentPath || "/");
    },
  });
};

export const t_create_diagnostic = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: `${paths.p_create_diagnostic}`,
    method: "post",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
    },
  });
};

export const t_delete_diagnostics = (payload) => (dispatch) => {
  sendRequest({
    r_path: `${paths.p_delete_diagnostic}/${payload.id}`,
    method: "delete",
    attr: payload,
    success: (res) => {
      toast.success(res.msg);
      dispatch(t_load_all_diagnostics());
    },
    failFunc: (err) => {
      toast.error(err.msg);
    },
  });
};

export const t_load_diagnostics_points_from_page = (payload) => (dispatch) => {
  sendRequest({
    r_path: `${paths.p_get_diagnostics_points}/${payload?.limit || 100}/${
      payload?.page || 1
    }/${payload.diagnostic}`,
    method: "get",
    attr: payload,
    success: (res) => {
      dispatch(acts.a_setPoints(res.diagnostics));
    },
  });
};

export const t_save_points = (payload) => (dispatch, getState, api) => {
  sendRequest({
    r_path: `${paths.p_save_diagnostics_points}/${payload.diagnostic_id}/${payload.quiz_id}`,
    method: "patch",
    attr: payload,
    success: ({ msg }) => {
      toast.success(msg);
      history.push(payload?.parentPath || "/");
    },
  });
};
