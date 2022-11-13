import {Conversation} from "../types/conversation";

export default function ConversationElement({ conversation }: { conversation: Conversation }) {


  return <div>
    { conversation.recipientNickname }
  </div>

}
