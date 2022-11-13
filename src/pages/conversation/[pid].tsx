import ConversationWrapper from "../../components/conversationWrapper/ConversationWrapper";
import {useRouter} from "next/router";

export default function Conversation() {

  const router = useRouter()
  const {pid} = router.query as { pid: string }

  return <ConversationWrapper conversationId={parseInt(pid)}/>
}
