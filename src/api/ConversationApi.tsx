import axios from "axios";
import {Conversation} from "../types/conversation";


export default function fetchConversationByUserId(userId: number) {
  return axios.get<Conversation[]>(`/conversations?senderId=${userId}`)
    .then((response) => response.data)
}
