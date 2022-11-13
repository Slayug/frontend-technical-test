import {Conversation} from "../../types/conversation";
import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import ContactElement from "../contactElement/ContactElement";
import {getRemoteUserNickName} from "../../utils/conversationUtils";

export default function ConversationElement({conversation}: { conversation: Conversation }) {
  const {userId} = useContext(UserContext);

  function renderLastMessageTimestamp() {
    return new Date(conversation.lastMessageTimestamp * 1000).toLocaleDateString()
  }

  const currentNickname = getRemoteUserNickName(userId, conversation)

  return <ContactElement nickname={currentNickname} data={<span>{renderLastMessageTimestamp()}</span>}/>
}
