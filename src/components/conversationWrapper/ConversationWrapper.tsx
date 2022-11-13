import {useContext, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchConversationMessageList, postMessage} from "../../api/ConversationApi";
import MessageElement from "../message/MessageElement";

import styles from './ConversationWrapper.module.scss'
import {SendOutlined} from "@ant-design/icons";
import {Input, Spin} from "antd";

export default function ConversationWrapper({conversationId}: { conversationId: number }) {
  const [message, setMessage] = useState("");
  const {userId} = useContext(UserContext);
  const queryClient = useQueryClient()

  const queryKey = ['conversation', 'messages', conversationId];
  const {data: messages, isLoading, isFetching, isInitialLoading} = useQuery({
    queryKey,
    queryFn: () => fetchConversationMessageList(conversationId),
    enabled: conversationId !== undefined,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  const {mutateAsync: sendMessage} = useMutation({
    mutationKey: queryKey,
    mutationFn: () => postMessage(message, conversationId, userId),
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
    <div className={styles.messages}>
      <div className={styles.loading}>
        {isInitialLoading && isFetching && isLoading && <Spin/>}
      </div>
      {messages && messages.map((message) => {
        return <MessageElement key={message.id} message={message}/>
      })}
    </div>
    <div className={styles.input}>
      <Input
        onPressEnter={onClickSend}
        disabled={!messages}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message.."
      />
      <SendOutlined disabled={!messages} onClick={onClickSend}/>
    </div>
  </div>
}
