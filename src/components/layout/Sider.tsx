import {useQuery} from "@tanstack/react-query";
import {UserContext} from "../../contexts/UserContext";
import {useContext} from "react";
import fetchConversationByUserId from "../../api/ConversationApi";
import ConversationElement from "../ConversationElement";

export default function Sider() {

  const { userId } = useContext(UserContext);

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: ({ queryKey }) => fetchConversationByUserId(userId)
  })

  return <aside>
    {
      conversations && conversations.map((conversation) =>
        <ConversationElement key={conversation.id} conversation={conversation} />
      )
    }
  </aside>
}
