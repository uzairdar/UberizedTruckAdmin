import axios from "axios";
import { baseUrl } from "../Assets/serverdetails";

export async function AdminloginRequest(data) {
  try {
    const url = baseUrl + "/admin/login";
    return await axios.post(url, data);
  } catch (e) {
    return e;
  }
}
export async function getUser() {
  try {
    const url = baseUrl + "/user";
    return await axios.get(url);
  } catch (e) {
    return e;
  }
}
export async function getRooms() {
  try {
    const url = baseUrl + "/room";
    return await axios.get(url);
  } catch (e) {
    return e;
  }
}
export async function deleteRide(rid) {
  try {
    const url = baseUrl + `/ride/remove/${rid}`;
    return await axios.delete(url);
  } catch (e) {
    return e;
  }
}
export async function getRides() {
  try {
    const url = baseUrl + "/ride";
    return await axios.get(url);
  } catch (e) {
    return e;
  }
}
export async function getEachUser(uid) {
  try {
    const url = baseUrl + `/user/single/${uid}`;
    return await axios.get(url);
  } catch (e) {
    return e;
  }
}
export async function UpdateUser(uid, data) {
  try {
    const url = baseUrl + `/user/update-user/${uid}`;
    return await axios.post(url, data);
  } catch (e) {
    return e;
  }
}
export async function DeleteUser(uid) {
  try {
    const url = baseUrl + `/user/remove/${uid}`;
    return await axios.delete(url);
  } catch (e) {
    return e;
  }
}
export async function AdminWithdrawlRequest() {
  try {
    const url = baseUrl + "/admin/withdraw-requests";
    return await axios.get(url);
  } catch (e) {
    return e;
  }
}
export async function AdminWithdrawlCompleteRequest(uid, wid, amount) {
  try {
    const url = baseUrl + `/user/withdraw/${uid}/${wid}`;
    return await axios.post(url, amount);
  } catch (e) {
    return e;
  }
}
