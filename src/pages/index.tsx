import type { FC } from 'react'
import styles from '../styles/Home.module.css'
import {UserContext} from "../contexts/UserContext";
import {useContext, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchConversationMessageList} from "../api/ConversationApi";
import MessageElement from "../components/message/MessageElement";

const Home: FC = () => {

  const { currentConversationId } = useContext(UserContext);

  const { data: messages, isLoading } = useQuery({
    queryKey: ['conversation', 'messages', currentConversationId],
    queryFn: () => fetchConversationMessageList(currentConversationId)
  });

  return (
    <div className={styles.container}>
      <div>
        {isLoading && <p>Loading</p>}
        {messages && messages.map((message) => {
          return <MessageElement key={message.id} message={message} />
        })}
      </div>
    </div>
  )
}

export default Home
