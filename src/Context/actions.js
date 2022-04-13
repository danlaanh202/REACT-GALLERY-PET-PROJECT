import axios from "axios";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let data;

    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, loginPayload)
      .then((response) => {
        data = response?.data;
      });

    if (data) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    return;
  } catch (error) {
    return error;
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
