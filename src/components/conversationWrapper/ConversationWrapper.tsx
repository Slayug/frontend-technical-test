import {useContext, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchConversationMessageList, postMessage} from "../../api/ConversationApi";
import MessageElement from "../message/MessageElement";

import styles from './ConversationWrapper.module.scss'
import {SendOutlined} from "@ant-design/icons";

export default function ConversationWrapper() {
  const [message, setMessage] = useState("");
  const {currentConversationId, userId} = useContext(UserContext);
  const queryClient = useQueryClient()

  const queryKey = ['conversation', 'messages', currentConversationId];
  const {data: messages, isLoading} = useQuery({
    queryKey,
    queryFn: () => fetchConversationMessageList(currentConversationId),
    enabled: currentConversationId !== undefined,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  const {mutateAsync: sendMessage, isLoading: isLoadingPostMessage} = useMutation({
    mutationKey: queryKey,
    mutationFn: () => postMessage(message, currentConversationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    }
  })

  function onClickSend() {
    sendMessage().then(() => {
      setMessage("")
    });
  }


  return <div className={styles.conversationWrapper}>
    {isLoading && <p>Loading</p>}
    <div className={styles.messages}>
      {messages && messages.map((message) => {
        return <MessageElement key={message.id} message={message}/>
      })}
    </div>
    <div className={styles.input}>
      <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type a message.."/>
      <SendOutlined onClick={onClickSend}/>
    </div>
  </div>
}
