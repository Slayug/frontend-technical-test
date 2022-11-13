import {Fragment, useContext, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchConversationMessageList, postMessage} from "../../api/ConversationApi";
import MessageElement from "../message/MessageElement";

import styles from './ConversationWrapper.module.scss'
import {AliwangwangOutlined, SendOutlined} from "@ant-design/icons";

export default function ConversationWrapper() {
  const [message, setMessage] = useState("");
  const {currentConversationId, userId} = useContext(UserContext);
  const queryClient = useQueryClient()

  const queryKey = ['conversation', 'messages', currentConversationId];
  const {data: messages, isLoading, isFetching} = useQuery({
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
    <div className={styles.transition}>
      {isFetching && isLoading && <p>Loading</p>}
      {!messages && !isFetching && <Fragment><AliwangwangOutlined/><p>Select a conversation ⬅️</p></Fragment>}
    </div>
    <div className={styles.messages}>
      {messages && messages.map((message) => {
        return <MessageElement key={message.id} message={message}/>
      })}
    </div>
    <div className={styles.input}>
      <input disabled={!messages} value={message} onChange={(event) => setMessage(event.target.value)}
             placeholder="Type a message.."/>
      <SendOutlined disabled={!messages} onClick={onClickSend}/>
    </div>
  </div>
}
