import {Conversation} from "../../types/conversation";

import styles from './ConversationElement.module.scss';
import {Avatar} from "antd";
import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";

export default function ConversationElement({conversation}: { conversation: Conversation }) {
  const {userId} = useContext(UserContext);

  function renderLastMessageTimestamp() {
    return new Date(conversation.lastMessageTimestamp * 1000).toLocaleDateString()
  }

  const currentNickname = userId === conversation.senderId ? conversation.recipientNickname : conversation.senderNickname


  return <a className={styles.conversationElement}>
    <Avatar
      src={`https://joeschmoe.io/api/v1/${currentNickname}`}
      shape="circle"
      style={{width: "4.5em", height: "4.5em", backgroundColor: 'white'}}
    />
    <div className={styles.info}>
      <span className={styles.nickname}>{currentNickname}</span>
      <span>{renderLastMessageTimestamp()}</span>
    </div>
  </a>

}
