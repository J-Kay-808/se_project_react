export const baseUrl = "http://localhost:3001";
import { processServerResponse } from "./utils";


function registerUser({ email, password, name, avatar }) {
  const payload = JSON.stringify({ email, password, name, avatar });
  console.log(payload); // Double check the payload being sent

  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,  // Send the correct payload
  })
    .then((res) => {
      console.log(res); // Log the response to see what's happening
      return processServerResponse(res);
    })
}
function signinUser({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
}


function getUserByToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function updateCurrentUser(user, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: user.name,
      avatar: user.avatar,
    }),
  }).then(processServerResponse);
}


export {
  registerUser,
  signinUser,
  getUserByToken,
  updateCurrentUser,
}
