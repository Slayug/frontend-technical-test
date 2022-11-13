import ConversationWrapper from "../../components/conversationWrapper/ConversationWrapper";
import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import {fetchConversationById} from "../../api/ConversationApi";
import {Spin} from "antd";
import {Fragment} from "react";

export default function Conversation() {

  const router = useRouter()
  const {pid} = router.query as { pid: string | undefined }

  const {data: conversation, isLoading} = useQuery({
    queryKey: ['conversation', pid],
    queryFn: () => fetchConversationById(parseInt(pid)),
    enabled: pid !== undefined
  })

  return <Fragment>
    {isLoading && <Spin/>}
    {conversation && conversation[0] ? <ConversationWrapper key={conversation[0].id} conversation={conversation[0]}/> :
      <p>Conversation not found</p>}
  </Fragment>
}
