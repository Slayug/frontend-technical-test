import axios from "axios";
import {User} from "../types/user";

export function fetchUserInfo(userId: number) {
  return axios.get<User>(`users/${userId}`)
    .then((response) => response.data)
}

export function fetchUserList() {
  return axios.get<User[]>(`users`)
    .then((response) => response.data)
}
