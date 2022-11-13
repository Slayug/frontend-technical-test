import axios from "axios";
import {Conversation} from "../types/conversation";
import {Message} from "../types/message";


export function fetchConversationListByUserId(userId: number) {
  return axios.get<Conversation[]>(`/conversations?senderId=${userId}`)
    .then((response) => response.data)
}

export function fetchConversationById(id: number) {
  return axios.get<Conversation>(`/conversations/${id}`)
    .then((response) => response.data)
}

export function fetchConversationMessageList(conversationId: number) {
  return axios.get<Message[]>(`/messages?conversationId=${conversationId}`)
    .then((response) => response.data)
}
