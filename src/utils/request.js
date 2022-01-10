import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../redux/store";
import { a_setAuth, a_setError } from "../redux/actions";

const { REACT_APP_SERVER } = process.env;
console.log(process.env)
export default async function sendRequest({
  method = "get",
  r_path = "/",
  attr = null,
  config = {},
  success = (res) => console.log(res),
  failFunc = null,
  full_res = false,
}) {
  try {
    let response = null;
    let path = REACT_APP_SERVER + r_path;
    if (method !== "get") {
      if (method === "delete") {
        response = await axios.delete(path, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth"),
          },
          data: attr,
        });
      } else {
        console.log("999", path, attr, config, method);
        response = await axios[method](path, attr, {
          ...config,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth"),
          },
        });
      }
    } else {
      response = await axios.get(path, {
        ...config,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
        },
      });
    }
    if (full_res) {
      success(response);
    } else {
      success(response.data);
    }
  } catch (err) {
    console.log(err);
    const { response } = err;
    // console.log(response.data)
    // console.log(response)
    if (!response || response.status === 500) {
      store.dispatch(a_setError(true));
      if (failFunc) {
        failFunc("Server error");
      }
    } else if (response.status === 401) {
      localStorage.removeItem("auth");
      store.dispatch(a_setAuth(null));
      toast.info("Срок токена истек, авторизуйтесь, пожалуйста, заново");
      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    } else {
      if (response.data instanceof Array) {
        toast.info(JSON.stringify(response.data[0], null, 4));
      }
      if (failFunc) {
        failFunc(response.data);
      } else {
        console.log(response);
      }
    }
  }
}
