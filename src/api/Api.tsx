import axios from "axios";

export function setupApi() {
  axios.defaults.baseURL = 'http://localhost:3005';

}
