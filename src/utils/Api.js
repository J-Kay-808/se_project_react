import { processServerResponse } from "../utils/utils";
const baseUrl = "http://localhost:3000/se_project_react";

function getItems() {
  return fetch(`${baseUrl}/items`).then(processServerResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(processServerResponse);
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({   name: name,
      imageUrl: imageUrl,
      weather: weather, }),
  }).then(processServerResponse);
}

export { getItems, deleteItem, addItem };
