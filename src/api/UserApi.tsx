import axios from "axios";
import {User} from "../types/user";

export function fetchUserInfo(userId: number) {
  return axios.get<User>(`users/${userId}`)
    .then((response) => response.data)
}
