import {useContext, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchConversationMessageList, postMessage} from "../../api/ConversationApi";
import MessageElement from "../message/MessageElement";

import styles from './ConversationWrapper.module.scss'
import {SendOutlined} from "@ant-design/icons";
import {Avatar, Input, Spin} from "antd";
import {Conversation} from "../../types/conversation";
import {getRemoteUserNickName} from "../../utils/conversationUtils";

export default function ConversationWrapper({conversation}: { conversation: Conversation }) {
  const [message, setMessage] = useState("");
  const {userId} = useContext(UserContext);
  const queryClient = useQueryClient()

  const queryKey = ['conversation', 'messages', conversation.id];
  const {data: messages, isLoading, isFetching, isInitialLoading} = useQuery({
    queryKey,
    queryFn: () => fetchConversationMessageList(conversation.id),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  const {mutateAsync: sendMessage} = useMutation({
    mutationKey: queryKey,
    mutationFn: () => postMessage(message, conversation.id, userId),
    onSuccess: () => queryClient.invalidateQueries(queryKey)
  })

  function onClickSend() {
    sendMessage().then(() => {
      setMessage("")
    });
  }

  const remoteNickname = getRemoteUserNickName(userId, conversation);

  return <div className={styles.conversationWrapper}>
    <div className={styles.header}>
      <Avatar
        src={`https://joeschmoe.io/api/v1/${remoteNickname}`}
        shape="circle"
        style={{width: "2.5em", height: "2.5em", backgroundColor: 'white'}}
      />
      <p>{remoteNickname}</p>
    </div>
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
