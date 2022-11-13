import {Conversation} from "../../types/conversation";

import styles from './ConversationElement.module.scss';
import {Avatar} from "antd";

export default function ConversationElement({conversation}: { conversation: Conversation }) {

  function renderLastMessageTimestamp() {
    return new Date(conversation.lastMessageTimestamp * 1000).toLocaleDateString()
  }


  return <a className={styles.conversationElement}>
    <Avatar
      src={`https://joeschmoe.io/api/v1/${conversation.recipientNickname}`}
      shape="circle"
      style={{width: "4.5em", height: "4.5em", backgroundColor: 'white'}}
    />
    <div className={styles.info}>
      <span className={styles.nickname}>{conversation.recipientNickname}</span>
      <span>{renderLastMessageTimestamp()}</span>
    </div>
  </a>

}
