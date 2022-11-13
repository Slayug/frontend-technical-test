import {Conversation} from "../../types/conversation";

import styles from './ConversationElement.module.scss';

export default function ConversationElement({ conversation }: { conversation: Conversation }) {


  return <div className={styles.conversationElement}>
    { conversation.recipientNickname }
  </div>

}
