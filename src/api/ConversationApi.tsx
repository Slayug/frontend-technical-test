import axios from "axios";
import {Conversation, ConversationPostDto} from "../types/conversation";
import {Message} from "../types/message";


export function fetchConversationListByUserId(userId: number) {
  return axios.get<Conversation[]>(`/conversations?senderId=${userId}`)
    .then((response) => response.data)
}

export function fetchConversationById(id: number) {
  return axios.get<Conversation[]>(`/conversation/${id}`)
    .then((response) => response.data)
}

export function postConversation(conversation: ConversationPostDto) {
  return axios.post(`conversations`, conversation);
}

export function fetchConversationMessageList(conversationId: number) {
  return axios.get<Message[]>(`/messages?conversationId=${conversationId}`)
    .then((response) => response.data)
}

export function postMessage(message: string, conversationId: number, userId) {
  return axios.post(`/messages/${conversationId}`, {body: message, authorId: userId})
}
