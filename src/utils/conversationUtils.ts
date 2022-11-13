import {Conversation} from "../types/conversation";

export function getRemoteUserNickName(currentUserId: number, conversation: Conversation) {
  return currentUserId === conversation.senderId ? conversation.recipientNickname : conversation.senderNickname
}
